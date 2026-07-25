import { useState } from 'react';
import { useStore } from '../stores/appStore';

const EXAMPLES = {
  'synchronized': {
    code: `public class Main {
    static int counter = 0;
    static final Object lock = new Object();

    public static void main(String[] args) throws Exception {
        var t1 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                synchronized (lock) { counter++; }
            }
        });
        var t2 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                synchronized (lock) { counter++; }
            }
        });
        t1.start(); t2.start();
        t1.join(); t2.join();
        System.out.println("Counter: " + counter + " (expected: 2000)");
    }
}`,
    description: 'synchronized ensures mutual exclusion. Each thread acquires the lock before accessing counter, preventing race conditions.'
  },
  'volatile': {
    code: `public class Main {
    static volatile boolean running = true;

    public static void main(String[] args) throws Exception {
        var worker = new Thread(() -> {
            while (running) {
                // busy wait
            }
            System.out.println("Worker stopped");
        });
        worker.start();
        Thread.sleep(500);
        running = false;  // volatile ensures visibility across threads
        System.out.println("Flag set to false");
        worker.join();
    }
}`,
    description: 'volatile guarantees visibility of changes across threads. Without it, the worker might cache running=true forever.'
  },
  'ReentrantLock': {
    code: `import java.util.concurrent.locks.*;
public class Main {
    static int counter = 0;
    static final Lock lock = new ReentrantLock();

    public static void main(String[] args) throws Exception {
        var t1 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                lock.lock();
                try { counter++; }
                finally { lock.unlock(); }
            }
        });
        var t2 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                lock.lock();
                try { counter++; }
                finally { lock.unlock(); }
            }
        });
        t1.start(); t2.start();
        t1.join(); t2.join();
        System.out.println("Counter: " + counter);
    }
}`,
    description: 'ReentrantLock provides the same mutual exclusion as synchronized but with more flexibility (tryLock, fairness, etc.).'
  },
  'deadlock': {
    code: `public class Main {
    static final Object a = new Object();
    static final Object b = new Object();

    public static void main(String[] args) throws Exception {
        var t1 = new Thread(() -> {
            synchronized (a) {
                System.out.println("T1: locked A");
                sleep(100);
                synchronized (b) { System.out.println("T1: locked B"); }
            }
        });
        var t2 = new Thread(() -> {
            synchronized (b) {
                System.out.println("T2: locked B");
                sleep(100);
                synchronized (a) { System.out.println("T2: locked A"); }
            }
        });
        t1.start(); t2.start();
        t1.join(2000); t2.join(2000);
        System.out.println("Deadlock likely occurred - threads blocked");
    }
    static void sleep(long ms) { try { Thread.sleep(ms); } catch (Exception e) {} }
}`,
    description: 'Deadlock: two threads each hold a lock the other needs. T1 has A and wants B, T2 has B and wants A — neither can proceed.'
  }
};

export function SyncLab() {
  const [activeExample, setActiveExample] = useState('synchronized');
  const setCode = useStore((s) => s.setCode);
  const ex = EXAMPLES[activeExample as keyof typeof EXAMPLES];

  const loadExample = () => {
    setCode(ex?.code ?? '');
  };

  return (
    <div className="sync-lab">
      <h3>Synchronization Laboratory</h3>
      <p className="lab-subtitle">Interactive examples of Java concurrency primitives</p>

      <div className="example-list">
        {Object.keys(EXAMPLES).map((key) => (
          <button
            key={key}
            className={`example-btn ${activeExample === key ? 'active' : ''}`}
            onClick={() => setActiveExample(key)}
          >
            {key}
          </button>
        ))}
      </div>

      {ex && (
        <div className="example-detail">
          <p className="example-desc">{ex.description}</p>
          <pre className="example-code">{ex.code}</pre>
          <button className="load-btn" onClick={loadExample}>Load into Editor & Run</button>
        </div>
      )}
    </div>
  );
}
