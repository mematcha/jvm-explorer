import { useCallback } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { useStore } from '../stores/appStore';
import { api } from '../services/api';

const TEMPLATES: Record<string, string> = {
  'Hello World': `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, JVM Explorer!");
    }
}`,
  'HashMap Demo': `import java.util.*;
public class Main {
    public static void main(String[] args) {
        var map = new HashMap<String, Integer>();
        map.put("one", 1);
        map.put("two", 2);
        map.put("three", 3);
        System.out.println("HashMap: " + map);
        System.out.println("Collisions: bucket count may vary");
    }
}`,
  'Thread Demo': `public class Main {
    public static void main(String[] args) throws Exception {
        var t1 = new Thread(() -> {
            for (int i = 0; i < 5; i++) {
                System.out.println("Thread 1: " + i);
            }
        });
        var t2 = new Thread(() -> {
            for (int i = 0; i < 5; i++) {
                System.out.println("Thread 2: " + i);
            }
        });
        t1.start(); t2.start();
        t1.join(); t2.join();
        System.out.println("Done");
    }
}`,
  'GC Demo': `import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        var list = new ArrayList<byte[]>();
        for (int i = 0; i < 10; i++) {
            list.add(new byte[10_000_000]);
            System.out.println("Allocated 10MB...");
            Thread.sleep(200);
        }
        list.clear();
        System.gc();
        System.out.println("GC triggered");
        Thread.sleep(1000);
    }
}`,
};

export function CodeEditor() {
  const code = useStore((s) => s.code);
  const setCode = useStore((s) => s.setCode);
  const setCompilationResult = useStore((s) => s.setCompilationResult);
  const setExecutionResult = useStore((s) => s.setExecutionResult);

  const className = extractClassName(code) || 'Main';

  const handleRun = useCallback(async () => {
    const compileResult = await api.compile(className, code);
    setCompilationResult({ ...compileResult, classBytes: {} });

    if (compileResult.success) {
      const execResult = await api.execute(className, code);
      setExecutionResult({ ...execResult, errors: execResult.stderr ? [execResult.stderr] : [] });
    }
  }, [code, className, setCompilationResult, setExecutionResult]);

  return (
    <div className="code-editor-panel">
      <div className="editor-toolbar">
        <select onChange={(e) => {
          const template = TEMPLATES[e.target.value];
          if (template) setCode(template);
        }}>
          <option value="">Templates</option>
          {Object.keys(TEMPLATES).map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
        <button className="run-btn" onClick={handleRun}>▶ Run</button>
      </div>
      <div className="editor-container">
        <MonacoEditor
          height="100%"
          language="java"
          theme="vs-dark"
          value={code}
          onChange={(val) => setCode(val ?? '')}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
}

function extractClassName(code: string): string | null {
  const match = code.match(/public\s+(?:class|record)\s+(\w+)/);
  return match ? match[1] : null;
}
