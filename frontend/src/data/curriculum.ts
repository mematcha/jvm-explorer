export interface Lesson {
  id: string;
  title: string;
  description: string;
  code: string;
  concepts: string[];
  checkpoint?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface Module {
  id: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  title: string;
  description: string;
  lessons: Lesson[];
}

export const curriculum: Module[] = [
  {
    id: 'beginner-variables',
    level: 'Beginner',
    title: 'Variables & Types',
    description: 'Learn how Java stores data in variables and the primitive type system.',
    lessons: [
      {
        id: 'variables',
        title: 'Variables',
        description: 'Variables are named memory locations that store values. Java is statically typed — every variable must declare its type.',
        code: `public class Main {
    public static void main(String[] args) {
        int age = 25;
        double price = 19.99;
        String name = "JVM Explorer";
        boolean isFun = true;

        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Price: " + price);
        System.out.println("Is fun? " + isFun);
    }
}`,
        concepts: ['Variable declaration', 'Primitive types', 'Type inference (var)'],
        checkpoint: {
          question: 'Which of these is a valid Java variable declaration?',
          options: ['int 1number = 5;', 'int number = 5;', 'number = 5;', 'var 5 = number;'],
          correctIndex: 1,
          explanation: 'Java variable declarations must have a type followed by a name. Option B is correct.'
        }
      },
      {
        id: 'primitives',
        title: 'Primitive Types',
        description: 'Java has 8 primitive types: byte, short, int, long, float, double, char, boolean.',
        code: `public class Main {
    public static void main(String[] args) {
        byte b = 127;
        short s = 32767;
        int i = 2_147_483_647;
        long l = 9_223_372_036_854_775_807L;
        float f = 3.14f;
        double d = 3.14159265359;
        char c = 'A';
        boolean bool = true;

        System.out.println("byte: " + b);
        System.out.println("int: " + i);
        System.out.println("double: " + d);
        System.out.println("char: " + c);
    }
}`,
        concepts: ['8 primitive types', 'Type ranges', 'Underscores in numbers'],
      },
      {
        id: 'references',
        title: 'Object References',
        description: 'Objects are stored on the heap. Variables hold references (memory addresses) to objects, not the objects themselves.',
        code: `public class Main {
    public static void main(String[] args) {
        String a = "Hello";
        String b = a;  // b references the same object

        System.out.println("a: " + a);
        System.out.println("b: " + b);

        a = "World";  // a now references a new object
        System.out.println("After change:");
        System.out.println("a: " + a);
        System.out.println("b: " + b + " (unchanged)");
    }
}`,
        concepts: ['Reference variables', 'Heap allocation', 'String immutability'],
      }
    ]
  },
  {
    id: 'beginner-methods',
    level: 'Beginner',
    title: 'Methods & Classes',
    description: 'Understand method calls, parameters, return values, and how classes define behavior.',
    lessons: [
      {
        id: 'methods',
        title: 'Methods',
        description: 'Methods define behavior. When called, a new stack frame is created with local variables and the operand stack.',
        code: `public class Main {
    public static void main(String[] args) {
        int result = add(5, 3);
        System.out.println("5 + 3 = " + result);
        greet("JVM");
    }

    static int add(int a, int b) {
        return a + b;  // stack frame created here
    }

    static void greet(String name) {
        System.out.println("Hello, " + name + "!");
    }
}`,
        concepts: ['Method declaration', 'Parameters', 'Return types', 'Stack frames'],
        checkpoint: {
          question: 'What happens when a method is called?',
          options: [
            'A new heap object is created',
            'A new stack frame is pushed onto the call stack',
            'The method bytecode is JIT compiled',
            'All variables are copied to the heap'
          ],
          correctIndex: 1,
          explanation: 'Each method call creates a new stack frame containing local variables and the operand stack.'
        }
      },
      {
        id: 'classes',
        title: 'Classes & Objects',
        description: 'A class is a blueprint. When you use "new", the JVM allocates memory on the heap and calls the constructor.',
        code: `public class Main {
    public static void main(String[] args) {
        var p1 = new Person("Alice", 30);
        var p2 = new Person("Bob", 25);

        p1.introduce();
        p2.introduce();

        System.out.println("Total people: " + Person.count);
    }
}

class Person {
    String name;
    int age;
    static int count = 0;

    Person(String name, int age) {
        this.name = name;
        this.age = age;
        count++;
    }

    void introduce() {
        System.out.println("Hi, I'm " + name + " and I'm " + age);
    }
}`,
        concepts: ['Class declaration', 'Constructor', 'Static vs instance', 'Heap allocation'],
      }
    ]
  },
  {
    id: 'intermediate-collections',
    level: 'Intermediate',
    title: 'Collections Framework',
    description: 'Explore how HashMap, ArrayList, and other collections work under the hood.',
    lessons: [
      {
        id: 'arraylist',
        title: 'ArrayList Internals',
        description: 'ArrayList is a resizable array. When full, it creates a new array (50% larger) and copies elements.',
        code: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        var list = new ArrayList<String>();
        list.add("A"); list.add("B"); list.add("C");
        System.out.println("Size: " + list.size());
        System.out.println("Get[1]: " + list.get(1));
        list.remove(0);
        System.out.println("After remove: " + list);
    }
}`,
        concepts: ['Dynamic array', 'Resize strategy', 'Random access O(1)'],
      },
      {
        id: 'hashmap',
        title: 'HashMap Internals',
        description: 'HashMap uses buckets indexed by hashCode. Collisions are handled with linked lists or trees.',
        code: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        var map = new HashMap<Integer, String>();
        map.put(1, "one");
        map.put(2, "two");
        map.put(3, "three");
        System.out.println("Map: " + map);
        System.out.println("Get 2: " + map.get(2));
        System.out.println("Contains 4: " + map.containsKey(4));
    }
}`,
        concepts: ['Hashing', 'Buckets', 'Collision resolution', 'Load factor'],
      }
    ]
  },
  {
    id: 'intermediate-threads',
    level: 'Intermediate',
    title: 'Threads & Concurrency',
    description: 'Learn how threads execute, how the JVM schedules them, and how to coordinate between them.',
    lessons: [
      {
        id: 'creating-threads',
        title: 'Creating Threads',
        description: 'Threads are lightweight processes. Each thread has its own stack but shares the heap with other threads.',
        code: `public class Main {
    public static void main(String[] args) {
        Thread t = new Thread(() -> {
            for (int i = 0; i < 3; i++) {
                System.out.println("Thread: " + i);
                try { Thread.sleep(100); } catch (Exception e) {}
            }
        });
        t.start();
        System.out.println("Main thread continues...");
        try { t.join(); } catch (Exception e) {}
        System.out.println("Done");
    }
}`,
        concepts: ['Thread creation', 'Stack per thread', 'Shared heap', 'join()'],
        checkpoint: {
          question: 'What do threads share in the JVM?',
          options: ['Only their stack', 'The heap (objects)', 'Nothing', 'Only local variables'],
          correctIndex: 1,
          explanation: 'Threads have their own stack (method calls, locals) but share the heap (objects, static fields).'
        }
      }
    ]
  },
  {
    id: 'advanced-jvm',
    level: 'Advanced',
    title: 'JVM Internals',
    description: 'Deep dive into JVM architecture: bytecode, class loading, memory model, and garbage collection.',
    lessons: [
      {
        id: 'bytecode-basics',
        title: 'Reading Bytecode',
        description: 'Java source is compiled to bytecode. Use the Bytecode tab to see the instructions the JVM actually executes.',
        code: `public class Main {
    public static void main(String[] args) {
        int a = 10;
        int b = 20;
        int sum = a + b;
        System.out.println(sum);
    }
}`,
        concepts: ['Compilation to .class', 'JVM instructions', 'Operand stack'],
      },
      {
        id: 'class-loading',
        title: 'Class Loading',
        description: 'Classes are loaded lazily. The ClassLoader chain: Bootstrap → Platform → Application.',
        code: `public class Main {
    public static void main(String[] args) {
        // Class is loaded when first referenced
        System.out.println("Accessing MyClass...");
        MyClass.hello();
    }
}

class MyClass {
    static {
        System.out.println("MyClass loaded!");
    }
    static void hello() {
        System.out.println("Hello");
    }
}`,
        concepts: ['Lazy loading', 'Static initializer', 'ClassLoader hierarchy'],
      },
      {
        id: 'gc-basics',
        title: 'Garbage Collection',
        description: 'Objects with no references are eligible for GC. The JVM uses generational collection (Young → Old).',
        code: `public class Main {
    public static void main(String[] args) throws Exception {
        var list = new java.util.ArrayList<byte[]>();
        for (int i = 0; i < 5; i++) {
            list.add(new byte[5_000_000]);
            System.out.println("Allocated 5MB (" + (i + 1) + "/5)");
            Thread.sleep(300);
        }
        list.clear();
        System.gc();
        Thread.sleep(1000);
        System.out.println("GC complete");
    }
}`,
        concepts: ['Reachability', 'Generational GC', 'Young/Old generation', 'System.gc()'],
      }
    ]
  }
];

export function getLesson(moduleId: string, lessonId: string): { module: Module; lesson: Lesson } | null {
  for (const module of curriculum) {
    if (module.id === moduleId) {
      const lesson = module.lessons.find(l => l.id === lessonId);
      if (lesson) return { module, lesson };
    }
  }
  return null;
}
