import { useState } from 'react';
import { useStore } from '../stores/appStore';

const EXAMPLES = {
  'HashMap Internals': {
    code: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        var map = new HashMap<String, Integer>();
        // Keys with same hash collide in the same bucket
        map.put("Aa", 1);  // hash = 2112
        map.put("BB", 2);  // hash = 2112 (collision!)
        map.put("C", 3);
        map.put("D", 4);
        map.put("E", 5);

        System.out.println("Map size: " + map.size());
        System.out.println("Get 'Aa': " + map.get("Aa"));
        System.out.println("Get 'BB': " + map.get("BB"));

        // Trigger resize
        for (int i = 0; i < 100; i++) {
            map.put("key-" + i, i);
        }
        System.out.println("After resize - size: " + map.size());
        System.out.println("Capacity grows to ~256, buckets rehashed");
    }
}`,
    description: 'HashMap stores keys in buckets based on hashCode. Collisions occur when two keys share the same bucket (separate chaining). When load factor exceeds 0.75, the table resizes (2x) and rehashes all entries.'
  },
  'ArrayList vs LinkedList': {
    code: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        var arrayList = new ArrayList<Integer>();
        var linkedList = new LinkedList<Integer>();

        long start = System.nanoTime();
        for (int i = 0; i < 10000; i++) arrayList.add(i);
        long arrayEnd = System.nanoTime() - start;

        start = System.nanoTime();
        for (int i = 0; i < 10000; i++) linkedList.add(i);
        long linkedEnd = System.nanoTime() - start;

        System.out.println("ArrayList add:  " + arrayEnd / 1e6 + " ms");
        System.out.println("LinkedList add: " + linkedEnd / 1e6 + " ms");

        // Random access
        start = System.nanoTime();
        for (int i = 0; i < 10000; i++) arrayList.get(i);
        arrayEnd = System.nanoTime() - start;

        start = System.nanoTime();
        for (int i = 0; i < 10000; i++) linkedList.get(i);
        linkedEnd = System.nanoTime() - start;

        System.out.println("ArrayList get:  " + arrayEnd / 1e6 + " ms");
        System.out.println("LinkedList get: " + linkedEnd / 1e6 + " ms");
    }
}`,
    description: 'ArrayList: O(1) random access, O(n) insert/delete in middle. LinkedList: O(n) random access, O(1) insert/delete at ends. The performance difference grows with size.'
  },
  'TreeMap Ordering': {
    code: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        var treeMap = new TreeMap<Integer, String>();
        treeMap.put(5, "five");
        treeMap.put(1, "one");
        treeMap.put(10, "ten");
        treeMap.put(3, "three");
        treeMap.put(7, "seven");

        System.out.println("TreeMap (sorted): " + treeMap);
        System.out.println("First key: " + treeMap.firstKey());
        System.out.println("Last key: " + treeMap.lastKey());
        System.out.println("SubMap [3,7]: " + treeMap.subMap(3, 8));
    }
}`,
    description: 'TreeMap is a Red-Black tree implementation. Keys are stored in sorted order. Operations are O(log n). It supports range queries like subMap, headMap, tailMap.'
  }
};

export function CollectionsExplorer() {
  const [activeExample, setActiveExample] = useState('HashMap Internals');
  const setCode = useStore((s) => s.setCode);

  const ex = EXAMPLES[activeExample as keyof typeof EXAMPLES];

  return (
    <div className="collections-explorer">
      <h3>Collections Explorer</h3>
      <p className="lab-subtitle">Visualize how Java collections work internally</p>

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
