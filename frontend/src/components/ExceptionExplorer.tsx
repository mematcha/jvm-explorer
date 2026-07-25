import { useState } from 'react';
import { useStore } from '../stores/appStore';

const EXAMPLES = {
  'Basic Try-Catch': {
    code: `public class Main {
    public static void main(String[] args) {
        try {
            System.out.println("Trying risky operation...");
            int result = 10 / 0;
            System.out.println("This won't print");
        } catch (ArithmeticException e) {
            System.out.println("Caught: " + e);
        }
        System.out.println("Program continues after exception");
    }
}`,
    description: 'When an exception occurs, the JVM unwinds the stack looking for a matching catch block. The stack trace shows the call chain.'
  },
  'Finally Block': {
    code: `public class Main {
    public static void main(String[] args) {
        try {
            System.out.println("In try block");
            return;  // even with return, finally runs!
        } finally {
            System.out.println("Finally always executes");
        }
    }
}`,
    description: 'The finally block always executes, even if the try block has a return statement. Used for cleanup (close files, release locks).'
  },
  'Multiple Catch': {
    code: `import java.io.*;
public class Main {
    public static void main(String[] args) {
        try {
            String s = null;
            System.out.println(s.length());  // NullPointerException
        } catch (NullPointerException e) {
            System.out.println("NPE: " + e);
        } catch (RuntimeException e) {
            System.out.println("Runtime: " + e);
        } catch (Exception e) {
            System.out.println("Generic: " + e);
        }
    }
}`,
    description: 'Catch blocks are checked in order. The first matching catch handles the exception. More specific exceptions must come before general ones.'
  },
  'Stack Unwinding': {
    code: `public class Main {
    public static void main(String[] args) {
        try {
            level1();
        } catch (Exception e) {
            System.out.println("Caught in main:");
            for (var ste : e.getStackTrace()) {
                System.out.println("  " + ste);
            }
        }
    }
    static void level1() { level2(); }
    static void level2() { level3(); }
    static void level3() { throw new RuntimeException("Boom!"); }
}`,
    description: 'The exception propagates up through the call stack: level3 → level2 → level1 → main. Each frame is unwound until a matching catch is found.'
  }
};

export function ExceptionExplorer() {
  const [activeExample, setActiveExample] = useState('Basic Try-Catch');
  const setCode = useStore((s) => s.setCode);

  const ex = EXAMPLES[activeExample as keyof typeof EXAMPLES];

  return (
    <div className="exception-explorer">
      <h3>Exception Explorer</h3>
      <p className="lab-subtitle">Understand how exceptions flow through the JVM</p>

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
          <button className="load-btn" onClick={() => setCode(ex.code)}>Load into Editor & Run</button>
        </div>
      )}
    </div>
  );
}
