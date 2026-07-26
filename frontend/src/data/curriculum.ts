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
    description: 'How Java stores data in variables and the primitive type system.',
    lessons: [
      {
        id: 'variables',
        title: 'Variables',
        description: 'Variables are named memory locations. Java is statically typed — every variable must declare its type.',
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
          explanation: 'Java variable declarations must have a type followed by a name.'
        }
      },
      {
        id: 'primitives',
        title: 'Primitive Types',
        description: 'Java has 8 primitive types: byte, short, int, long, float, double, char, boolean.',
        code: `public class Main {
    public static void main(String[] args) {
        byte b = 127; short s = 32767;
        int i = 2_147_483_647; long l = 9_223_372_036_854_775_807L;
        float f = 3.14f; double d = 3.14159265359;
        char c = 'A'; boolean bool = true;
        System.out.println("byte: " + b + " int: " + i);
        System.out.println("double: " + d + " char: " + c);
    }
}`,
        concepts: ['8 primitive types', 'Type ranges', 'Underscores in numbers'],
      },
      {
        id: 'references',
        title: 'Object References',
        description: 'Objects live on the heap. Variables hold references (memory addresses) to objects.',
        code: `public class Main {
    public static void main(String[] args) {
        String a = "Hello";
        String b = a;
        System.out.println("a: " + a + " b: " + b);
        a = "World";
        System.out.println("After change:");
        System.out.println("a: " + a + " b: " + b + " (unchanged)");
    }
}`,
        concepts: ['Reference variables', 'Heap allocation', 'String immutability'],
      }
    ]
  },
  {
    id: 'beginner-operators',
    level: 'Beginner',
    title: 'Operators & Expressions',
    description: 'Arithmetic, comparison, logical, and bitwise operators in Java.',
    lessons: [
      {
        id: 'arithmetic',
        title: 'Arithmetic & Comparison',
        description: 'Standard math operators (+, -, *, /, %) and comparison operators (==, !=, <, >).',
        code: `public class Main {
    public static void main(String[] args) {
        int a = 10, b = 3;
        System.out.println("Sum: " + (a + b));
        System.out.println("Difference: " + (a - b));
        System.out.println("Product: " + (a * b));
        System.out.println("Quotient: " + (a / b));
        System.out.println("Remainder: " + (a % b));
        System.out.println("a > b: " + (a > b));
        System.out.println("a == b: " + (a == b));
    }
}`,
        concepts: ['Arithmetic operators', 'Integer division', 'Modulo', 'Comparison'],
      },
      {
        id: 'logical',
        title: 'Logical & Bitwise',
        description: 'Boolean logic (&&, ||, !) and bitwise operations (&, |, ^, ~, <<, >>).',
        code: `public class Main {
    public static void main(String[] args) {
        boolean t = true, f = false;
        System.out.println("AND: " + (t && f));
        System.out.println("OR: " + (t || f));
        System.out.println("NOT: " + (!t));
        int x = 0b1100, y = 0b1010;
        System.out.println("Bitwise AND: " + (x & y));
        System.out.println("Bitwise OR: " + (x | y));
        System.out.println("Left shift: " + (x << 1));
    }
}`,
        concepts: ['Short-circuit evaluation', 'Bitwise operators', 'Shift operators'],
      }
    ]
  },
  {
    id: 'beginner-control',
    level: 'Beginner',
    title: 'Control Flow',
    description: 'Branching with if/else/else-if and switch statements.',
    lessons: [
      {
        id: 'ifelse',
        title: 'if / else if / else',
        description: 'Conditional branching. The JVM evaluates the boolean expression and jumps to the matching branch.',
        code: `public class Main {
    public static void main(String[] args) {
        int score = 85;
        if (score >= 90) {
            System.out.println("Grade: A");
        } else if (score >= 80) {
            System.out.println("Grade: B");
        } else if (score >= 70) {
            System.out.println("Grade: C");
        } else {
            System.out.println("Grade: F");
        }
    }
}`,
        concepts: ['Conditional branching', 'Else-if chain', 'Boolean expressions'],
        checkpoint: {
          question: 'What happens when an if condition is false?',
          options: ['The JVM throws an exception', 'Execution jumps to else/else-if or continues', 'The program crashes', 'The condition is re-evaluated'],
          correctIndex: 1,
          explanation: 'When the if condition is false, execution jumps to the else/else-if branch or continues after the block.'
        }
      },
      {
        id: 'switch',
        title: 'Switch Statements',
        description: 'Switch selects a branch using a jump table (lookupswitch/tableswitch bytecode) for O(1) dispatch.',
        code: `public class Main {
    public static void main(String[] args) {
        String day = "Monday";
        switch (day) {
            case "Monday" -> System.out.println("Start of week");
            case "Friday" -> System.out.println("Almost weekend");
            case "Saturday", "Sunday" -> System.out.println("Weekend!");
            default -> System.out.println("Midweek");
        }
    }
}`,
        concepts: ['Switch expressions', 'Arrow syntax', 'Jump table dispatch'],
      }
    ]
  },
  {
    id: 'beginner-loops',
    level: 'Beginner',
    title: 'Loops',
    description: 'Repeating execution with for, while, and do-while loops.',
    lessons: [
      {
        id: 'for-loop',
        title: 'For Loop',
        description: 'The for loop combines initialization, condition, and update in one line.',
        code: `public class Main {
    public static void main(String[] args) {
        for (int i = 0; i < 5; i++) {
            System.out.println("Iteration: " + i);
        }
        // Enhanced for-each
        int[] nums = {10, 20, 30};
        for (int n : nums) {
            System.out.println("Value: " + n);
        }
    }
}`,
        concepts: ['For loop structure', 'Iteration variable', 'For-each syntax'],
      },
      {
        id: 'while-do',
        title: 'While & Do-While',
        description: 'While checks before executing; do-while always executes at least once.',
        code: `public class Main {
    public static void main(String[] args) {
        int i = 0;
        while (i < 3) {
            System.out.println("While: " + i++);
        }
        int j = 0;
        do {
            System.out.println("Do-while: " + j++);
        } while (j < 3);
    }
}`,
        concepts: ['While loop', 'Do-while loop', 'Post-test vs pre-test'],
      }
    ]
  },
  {
    id: 'beginner-arrays',
    level: 'Beginner',
    title: 'Arrays',
    description: 'Fixed-length containers storing elements of the same type.',
    lessons: [
      {
        id: 'array-basics',
        title: 'Array Basics',
        description: 'Arrays are objects on the heap with a fixed length. Indexing is zero-based.',
        code: `public class Main {
    public static void main(String[] args) {
        int[] numbers = new int[5];
        numbers[0] = 10; numbers[1] = 20; numbers[2] = 30;
        System.out.println("Length: " + numbers.length);
        System.out.println("First: " + numbers[0]);
        // Multidimensional
        int[][] matrix = {{1,2},{3,4}};
        System.out.println("Element [1][0]: " + matrix[1][0]);
    }
}`,
        concepts: ['Array allocation', 'Indexing', 'Length property', 'Multidimensional arrays'],
      }
    ]
  },
  {
    id: 'beginner-methods',
    level: 'Beginner',
    title: 'Methods & Parameters',
    description: 'Method calls, parameters, return values, and the call stack.',
    lessons: [
      {
        id: 'methods',
        title: 'Defining Methods',
        description: 'Methods define behavior. When called, a new stack frame is pushed onto the call stack.',
        code: `public class Main {
    public static void main(String[] args) {
        int result = add(5, 3);
        System.out.println("5 + 3 = " + result);
        greet("JVM");
    }
    static int add(int a, int b) {
        return a + b;
    }
    static void greet(String name) {
        System.out.println("Hello, " + name + "!");
    }
}`,
        concepts: ['Method declaration', 'Parameters', 'Return types', 'Stack frames'],
        checkpoint: {
          question: 'What happens when a method is called?',
          options: ['A new heap object is created', 'A new stack frame is pushed', 'The method is JIT compiled', 'Local variables are copied to the heap'],
          correctIndex: 1,
          explanation: 'Each method call creates a new stack frame containing local variables and the operand stack.'
        }
      },
      {
        id: 'overloading',
        title: 'Method Overloading',
        description: 'Multiple methods can share the same name if their parameters differ (compile-time polymorphism).',
        code: `public class Main {
    public static void main(String[] args) {
        System.out.println(add(1, 2));
        System.out.println(add(1, 2, 3));
        System.out.println(add(1.5, 2.5));
    }
    static int add(int a, int b) { return a + b; }
    static int add(int a, int b, int c) { return a + b + c; }
    static double add(double a, double b) { return a + b; }
}`,
        concepts: ['Overloading rules', 'Signature uniqueness', 'Compile-time resolution'],
      }
    ]
  },
  {
    id: 'beginner-classes',
    level: 'Beginner',
    title: 'Classes & Objects',
    description: 'Blueprints, heap allocation, and the interplay between classes and instances.',
    lessons: [
      {
        id: 'classes-objects',
        title: 'Classes & Objects',
        description: 'A class is a blueprint. "new" allocates memory on the heap and calls the constructor.',
        code: `public class Main {
    public static void main(String[] args) {
        var p1 = new Person("Alice", 30);
        var p2 = new Person("Bob", 25);
        p1.introduce();
        p2.introduce();
        System.out.println("Total: " + Person.count);
    }
}
class Person {
    String name; int age;
    static int count = 0;
    Person(String name, int age) {
        this.name = name; this.age = age; count++;
    }
    void introduce() {
        System.out.println("Hi, I'm " + name);
    }
}`,
        concepts: ['Class declaration', 'Constructor', 'Static vs instance', 'Heap allocation'],
      },
      {
        id: 'encapsulation',
        title: 'Encapsulation',
        description: 'Hide internal state with private fields and expose behavior through public methods.',
        code: `public class Main {
    public static void main(String[] args) {
        var acc = new BankAccount(1000);
        acc.deposit(500);
        acc.withdraw(200);
        System.out.println("Balance: $" + acc.getBalance());
    }
}
class BankAccount {
    private double balance;
    public BankAccount(double initial) { balance = initial; }
    public double getBalance() { return balance; }
    public void deposit(double amt) { if (amt > 0) balance += amt; }
    public boolean withdraw(double amt) {
        if (amt > 0 && amt <= balance) { balance -= amt; return true; }
        return false;
    }
}`,
        concepts: ['Private fields', 'Getters/setters', 'Data hiding', 'Defensive checks'],
      },
      {
        id: 'constructors',
        title: 'Constructors',
        description: 'Constructors initialize new objects. If none is written, Java provides a default no-arg constructor.',
        code: `public class Main {
    public static void main(String[] args) {
        var r1 = new Rectangle();
        var r2 = new Rectangle(5, 3);
        System.out.println("Default: " + r1.area());
        System.out.println("Custom: " + r2.area());
    }
}
class Rectangle {
    int w, h;
    Rectangle() { this(1, 1); }
    Rectangle(int w, int h) { this.w = w; this.h = h; }
    int area() { return w * h; }
}`,
        concepts: ['Default constructor', 'Constructor chaining', 'this()', 'Overloading'],
      }
    ]
  },
  {
    id: 'beginner-strings',
    level: 'Beginner',
    title: 'String Manipulation',
    description: 'Strings are immutable objects. Operations like concat, substring, and StringBuilder.',
    lessons: [
      {
        id: 'string-basics',
        title: 'String API',
        description: 'Strings are immutable — every "modification" creates a new String object on the heap.',
        code: `public class Main {
    public static void main(String[] args) {
        String s = "Hello";
        System.out.println(s.length());
        System.out.println(s.toUpperCase());
        System.out.println(s.substring(1, 4));
        System.out.println(s.indexOf('l'));
        System.out.println(s.replace('l', 'x'));
        String name = "Java"; int ver = 23;
        System.out.println(name + " " + ver);
        System.out.println("Hello".equals("hello"));
    }
}`,
        concepts: ['String immutability', 'String API', 'Interning', 'equals() vs =='],
      },
      {
        id: 'stringbuilder',
        title: 'StringBuilder',
        description: 'StringBuilder is mutable and efficient for repeated concatenation. No intermediate objects.',
        code: `public class Main {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder();
        sb.append("Hello");
        sb.append(" ");
        sb.append("World");
        sb.insert(5, ",");
        System.out.println(sb.toString());
        System.out.println("Length: " + sb.length());
        sb.reverse();
        System.out.println("Reversed: " + sb);
    }
}`,
        concepts: ['Mutable strings', 'StringBuilder API', 'Performance vs String'],
      }
    ]
  },
  {
    id: 'beginner-inheritance',
    level: 'Beginner',
    title: 'Inheritance & Polymorphism',
    description: 'Reuse behavior through inheritance and override methods for runtime polymorphism.',
    lessons: [
      {
        id: 'inheritance',
        title: 'Inheritance',
        description: 'A subclass inherits all non-private fields and methods from its parent. Java supports single-class inheritance.',
        code: `public class Main {
    public static void main(String[] args) {
        var dog = new Dog("Buddy");
        dog.speak();
        System.out.println(dog.name + " has " + dog.legs + " legs");
    }
}
class Animal {
    String name; int legs;
    Animal(String n, int l) { name = n; legs = l; }
    void speak() { System.out.println("..."); }
}
class Dog extends Animal {
    Dog(String n) { super(n, 4); }
    @Override void speak() { System.out.println("Woof!"); }
}`,
        concepts: ['extends keyword', 'super()', 'Method overriding', 'Inheritance chain'],
      },
      {
        id: 'polymorphism',
        title: 'Polymorphism',
        description: 'A parent reference can point to any child object. Method calls dispatch to the actual runtime type.',
        code: `public class Main {
    public static void main(String[] args) {
        Animal[] animals = {new Dog(), new Cat()};
        for (Animal a : animals) a.speak();
    }
}
class Animal { void speak() { System.out.println("..."); } }
class Dog extends Animal { @Override void speak() { System.out.println("Woof"); } }
class Cat extends Animal { @Override void speak() { System.out.println("Meow"); } }`,
        concepts: ['Upcasting', 'Dynamic dispatch', '@Override', 'Polymorphic collections'],
      },
      {
        id: 'packages',
        title: 'Packages & Imports',
        description: 'Packages organize classes into namespaces. The main method is the JVM entry point.',
        code: `package com.example;
public class Main {
    public static void main(String[] args) {
        System.out.println("Args received: " + args.length);
        for (int i = 0; i < args.length; i++) {
            System.out.println("arg[" + i + "] = " + args[i]);
        }
    }
}`,
        concepts: ['Package declaration', 'Import statements', 'CLI arguments', 'Entry point'],
      }
    ]
  },
  {
    id: 'intermediate-abstract',
    level: 'Intermediate',
    title: 'Abstract Classes & Interfaces',
    description: 'Contracts for behavior with abstract methods and interface default methods.',
    lessons: [
      {
        id: 'abstract',
        title: 'Abstract Classes',
        description: 'Abstract classes cannot be instantiated. Subclasses must implement abstract methods.',
        code: `public class Main {
    public static void main(String[] args) {
        Shape s1 = new Circle(5);
        Shape s2 = new Square(4);
        System.out.println("Circle area: " + s1.area());
        System.out.println("Square area: " + s2.area());
    }
}
abstract class Shape {
    abstract double area();
}
class Circle extends Shape {
    double r; Circle(double r) { this.r = r; }
    @Override double area() { return Math.PI * r * r; }
}
class Square extends Shape {
    double side; Square(double s) { side = s; }
    @Override double area() { return side * side; }
}`,
        concepts: ['Abstract keyword', 'Abstract methods', 'Cannot instantiate', 'Template pattern'],
      },
      {
        id: 'interfaces',
        title: 'Interfaces',
        description: 'Interfaces define a contract. Classes can implement multiple interfaces (multiply-inheritance of type).',
        code: `public class Main {
    public static void main(String[] args) {
        var robot = new Robot();
        robot.work();
        robot.charge();
        System.out.println("Battery: " + robot.getBattery());
    }
}
interface Worker { void work(); }
interface Chargable { void charge(); int getBattery(); }
class Robot implements Worker, Chargable {
    int battery = 100;
    public void work() { battery -= 20; }
    public void charge() { battery = 100; }
    public int getBattery() { return battery; }
}`,
        concepts: ['implements', 'Multiple interfaces', 'Default methods', 'Interface segregation'],
      }
    ]
  },
  {
    id: 'intermediate-exceptions',
    level: 'Intermediate',
    title: 'Exception Handling',
    description: 'Try/catch/finally, checked vs unchecked exceptions, and creating custom exceptions.',
    lessons: [
      {
        id: 'try-catch',
        title: 'Try / Catch / Finally',
        description: 'Exceptions unwind the stack until a matching catch is found. Finally always runs.',
        code: `public class Main {
    public static void main(String[] args) {
        try {
            int result = divide(10, 0);
            System.out.println("Result: " + result);
        } catch (ArithmeticException e) {
            System.out.println("Caught: " + e.getMessage());
        } finally {
            System.out.println("Finally always executes");
        }
    }
    static int divide(int a, int b) {
        return a / b;
    }
}`,
        concepts: ['Try block', 'Catch clause', 'Finally', 'Stack unwinding'],
        checkpoint: {
          question: 'When does the finally block execute?',
          options: ['Only if no exception occurs', 'Only if an exception occurs', 'Always, even with return in try', 'Only in checked exceptions'],
          correctIndex: 2,
          explanation: 'The finally block always executes, even if try has a return statement.'
        }
      },
      {
        id: 'custom-exceptions',
        title: 'Custom Exceptions',
        description: 'Create domain-specific exceptions by extending Exception (checked) or RuntimeException (unchecked).',
        code: `public class Main {
    public static void main(String[] args) {
        try {
            withdraw(50);
            withdraw(200);
        } catch (InsufficientFundsException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
    static int balance = 100;
    static void withdraw(int amt) throws InsufficientFundsException {
        if (amt > balance) throw new InsufficientFundsException("Need " + amt + ", have " + balance);
        balance -= amt;
        System.out.println("Withdrew " + amt + ", balance: " + balance);
    }
}
class InsufficientFundsException extends Exception {
    InsufficientFundsException(String msg) { super(msg); }
}`,
        concepts: ['Checked vs unchecked', 'throws clause', 'Custom exception class', 'Exception chaining'],
      }
    ]
  },
  {
    id: 'intermediate-collections',
    level: 'Intermediate',
    title: 'Collections Framework',
    description: 'Lists, Sets, Maps — how they work under the hood.',
    lessons: [
      {
        id: 'arraylist',
        title: 'ArrayList',
        description: 'Resizable array. When full, creates a new array 50% larger and copies elements.',
        code: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        var list = new ArrayList<String>();
        list.add("A"); list.add("B"); list.add("C");
        System.out.println("Size: " + list.size());
        list.add(1, "X");
        System.out.println("After insert: " + list);
        list.remove("B");
        System.out.println("After remove: " + list);
    }
}`,
        concepts: ['Dynamic array', 'Resize strategy', 'Random access O(1)', 'Insert/remove O(n)'],
      },
      {
        id: 'hashmap',
        title: 'HashMap',
        description: 'Uses buckets indexed by hashCode(). Collisions resolved with linked lists or trees.',
        code: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        var map = new HashMap<String, Integer>();
        map.put("one", 1);
        map.put("two", 2);
        map.put("three", 3);
        System.out.println("Map: " + map);
        System.out.println("Get two: " + map.get("two"));
        System.out.println("Contains four: " + map.containsKey("four"));
        for (var e : map.entrySet()) {
            System.out.println(e.getKey() + " -> " + e.getValue());
        }
    }
}`,
        concepts: ['Hashing', 'Buckets', 'Collision resolution', 'Load factor'],
      },
      {
        id: 'hashcode',
        title: 'equals() & hashCode()',
        description: 'Objects used as HashMap keys must override equals() and hashCode() consistently.',
        code: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        var map = new HashMap<Point, String>();
        map.put(new Point(1, 2), "first");
        System.out.println(map.get(new Point(1, 2)));
    }
}
record Point(int x, int y) {}`,
        concepts: ['equals contract', 'hashCode contract', 'Consistency rule', 'Record defaults'],
      },
      {
        id: 'sets',
        title: 'HashSet & TreeSet',
        description: 'HashSet is backed by HashMap. TreeSet keeps elements sorted (Red-Black tree).',
        code: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        var hashSet = new HashSet<>(Set.of(3, 1, 4, 1, 5));
        System.out.println("HashSet: " + hashSet);
        var treeSet = new TreeSet<>(Set.of(3, 1, 4, 1, 5));
        System.out.println("TreeSet: " + treeSet);
        System.out.println("First: " + treeSet.first());
        System.out.println("Higher than 3: " + treeSet.higher(3));
    }
}`,
        concepts: ['HashSet backing', 'TreeSet ordering', 'NavigableSet', 'Duplicates eliminated'],
      }
    ]
  },
  {
    id: 'intermediate-generics',
    level: 'Intermediate',
    title: 'Generics',
    description: 'Type-safe collections and generic methods with type parameters.',
    lessons: [
      {
        id: 'generics-basics',
        title: 'Generic Classes & Methods',
        description: 'Generics enable compile-time type safety. The compiler erases type parameters (type erasure).',
        code: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Box<String> stringBox = new Box<>("Hello");
        Box<Integer> intBox = new Box<>(42);
        System.out.println(stringBox.get());
        System.out.println(intBox.get());
        System.out.println(max(3, 7, 5));
    }
    static <T extends Comparable<T>> T max(T a, T b, T c) {
        T m = a;
        if (b.compareTo(m) > 0) m = b;
        if (c.compareTo(m) > 0) m = c;
        return m;
    }
}
class Box<T> {
    private T value;
    Box(T value) { this.value = value; }
    T get() { return value; }
}`,
        concepts: ['Type parameters', 'Generic methods', 'Bounded type parameters', 'Type erasure'],
        checkpoint: {
          question: 'What happens to generic type information at runtime?',
          options: ['It is preserved fully', 'It is erased (type erasure)', 'It is stored in a separate table', 'It becomes dynamic'],
          correctIndex: 1,
          explanation: 'The compiler erases type parameters to their bounds or Object (type erasure).'
        }
      },
      {
        id: 'wildcards',
        title: 'Wildcards & Bounds',
        description: '? extends T (covariant), ? super T (contravariant) for flexible API design.',
        code: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        List<Integer> ints = List.of(1, 2, 3);
        printNumbers(ints);
        List<Number> nums = new ArrayList<>();
        addInts(nums);
    }
    static void printNumbers(List<? extends Number> list) {
        for (Number n : list) System.out.println(n);
    }
    static void addInts(List<? super Integer> list) {
        list.add(1); list.add(2);
    }
}`,
        concepts: ['Covariance (? extends)', 'Contravariance (? super)', 'PECS principle', 'Unbounded wildcard ?'],
      }
    ]
  },
  {
    id: 'intermediate-lambdas',
    level: 'Intermediate',
    title: 'Lambdas & Streams',
    description: 'Functional programming in Java: lambda expressions, the Streams API, and Optional.',
    lessons: [
      {
        id: 'lambdas',
        title: 'Lambda Expressions',
        description: 'Lambdas are anonymous functions. The JVM uses invokedynamic to bootstrap them efficiently.',
        code: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        var names = Arrays.asList("Charlie", "Alice", "Bob");
        names.sort((a, b) -> a.compareTo(b));
        System.out.println("Sorted: " + names);
        // Method reference
        names.forEach(System.out::println);
    }
}`,
        concepts: ['Lambda syntax', 'Functional interface', 'invokedynamic', 'Method reference'],
      },
      {
        id: 'streams',
        title: 'Streams API',
        description: 'Streams process data declaratively: filter, map, reduce — lazily evaluated.',
        code: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        var nums = List.of(1, 2, 3, 4, 5, 6);
        var result = nums.stream()
            .filter(n -> n % 2 == 0)
            .map(n -> n * n)
            .reduce(0, Integer::sum);
        System.out.println("Sum of evens squared: " + result);
        // Grouping
        var words = List.of("cat", "dog", "bird", "fish");
        var byLen = words.stream().collect(
            Collectors.groupingBy(String::length));
        System.out.println("Grouped by length: " + byLen);
    }
}`,
        concepts: ['Stream pipeline', 'Lazy evaluation', 'Intermediate/terminal ops', 'Collectors'],
      },
      {
        id: 'optional',
        title: 'Optional',
        description: 'A container that may or may not hold a value — eliminates null checks.',
        code: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Optional<String> present = Optional.of("Hello");
        Optional<String> empty = Optional.empty();
        System.out.println(present.orElse("default"));
        System.out.println(empty.orElse("default"));
        present.ifPresent(v -> System.out.println("Value: " + v));
        String result = empty.orElseThrow(() -> new RuntimeException("Missing!"));
    }
}`,
        concepts: ['Optional creation', 'map/filter on Optional', 'orElse vs orElseThrow', 'Avoid isPresent-get'],
      }
    ]
  },
  {
    id: 'intermediate-io',
    level: 'Intermediate',
    title: 'File I/O & Time API',
    description: 'Reading/writing files with java.nio.file and working with dates and times.',
    lessons: [
      {
        id: 'file-io',
        title: 'File I/O',
        description: 'Files.newBufferedReader, Files.readAllLines, and try-with-resources for automatic cleanup.',
        code: `import java.nio.file.*;
import java.util.*;
public class Main {
    public static void main(String[] args) throws Exception {
        Path p = Files.createTempFile("demo", ".txt");
        Files.writeString(p, "Hello\\nWorld");
        String content = Files.readString(p);
        System.out.println("Read: " + content);
        List<String> lines = Files.readAllLines(p);
        System.out.println("Lines: " + lines);
        Files.deleteIfExists(p);
        System.out.println("Temp file cleaned");
    }
}`,
        concepts: ['java.nio.file.Path', 'Read/write files', 'try-with-resources', 'Temp files'],
      },
      {
        id: 'datetime',
        title: 'Date & Time API',
        description: 'java.time provides immutable, fluent date/time types: LocalDate, LocalTime, ZonedDateTime.',
        code: `import java.time.*;
import java.time.format.*;
public class Main {
    public static void main(String[] args) {
        LocalDate today = LocalDate.now();
        LocalDate xmas = LocalDate.of(2026, 12, 25);
        Period until = Period.between(today, xmas);
        System.out.println("Until Christmas: " + until.getMonths() + " months, " + until.getDays() + " days");
        LocalTime now = LocalTime.now();
        System.out.println("Current time: " + now.format(DateTimeFormatter.ofPattern("HH:mm:ss")));
        ZonedDateTime ny = ZonedDateTime.now(ZoneId.of("America/New_York"));
        System.out.println("NY time: " + ny);
    }
}`,
        concepts: ['LocalDate/LocalTime', 'Period/Duration', 'DateTimeFormatter', 'Time zones'],
      }
    ]
  },
  {
    id: 'intermediate-enums-records',
    level: 'Intermediate',
    title: 'Enums & Records',
    description: 'Type-safe enumerations and concise data carriers with Records (Java 14+).',
    lessons: [
      {
        id: 'enums',
        title: 'Enums',
        description: 'Enums are classes with a fixed set of instances. They can have fields and methods.',
        code: `public class Main {
    public static void main(String[] args) {
        System.out.println(Day.SATURDAY.isWeekend());
        System.out.println("Ordinal: " + Day.WEDNESDAY.ordinal());
        for (Day d : Day.values()) {
            System.out.println(d + " " + (d.isWeekend() ? "(weekend)" : ""));
        }
    }
}
enum Day {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY;
    boolean isWeekend() {
        return this == SATURDAY || this == SUNDAY;
    }
}`,
        concepts: ['Enum constants', 'Enum methods', 'values()/ordinal()', 'Switch with enum'],
      },
      {
        id: 'records',
        title: 'Records',
        description: 'Records are transparent data carriers with auto-generated constructor, accessors, equals, hashCode.',
        code: `public class Main {
    public static void main(String[] args) {
        var p1 = new Point(3, 4);
        var p2 = new Point(3, 4);
        System.out.println(p1);
        System.out.println("Equals: " + p1.equals(p2));
        System.out.println("Distance: " + p1.distance());
    }
}
record Point(int x, int y) {
    double distance() {
        return Math.sqrt(x * x + y * y);
    }
}`,
        concepts: ['Record declaration', 'Canonical constructor', 'Auto-generated methods', 'Compact constructor'],
      }
    ]
  },
  {
    id: 'intermediate-nested',
    level: 'Intermediate',
    title: 'Nested Classes & Annotations',
    description: 'Inner classes, static nested classes, anonymous classes, and metadata with annotations.',
    lessons: [
      {
        id: 'nested',
        title: 'Nested Classes',
        description: 'Inner classes have access to enclosing instance members. Static nested classes do not.',
        code: `public class Main {
    public static void main(String[] args) {
        var outer = new Outer();
        outer.test();
        Outer.StaticNested staticNested = new Outer.StaticNested();
        staticNested.show();
    }
}
class Outer {
    private String msg = "Hello from Outer";
    class Inner { void show() { System.out.println(msg); } }
    static class StaticNested { void show() { System.out.println("Static nested"); } }
    void test() {
        // Anonymous class
        Runnable r = new Runnable() {
            public void run() { System.out.println("Anonymous"); }
        };
        r.run();
        new Inner().show();
    }
}`,
        concepts: ['Inner class', 'Static nested class', 'Anonymous class', 'Enclosing reference'],
      },
      {
        id: 'annotations',
        title: 'Annotations',
        description: 'Annotations add metadata to code. Processed at compile-time or runtime via reflection.',
        code: `import java.lang.annotation.*;
public class Main {
    public static void main(String[] args) {
        var m = new MyClass();
        System.out.println("Deprecated method: " + m.oldMethod());
    }
}
@Deprecated(since = "2.0", forRemoval = true)
class OldClass {}

class MyClass {
    @SuppressWarnings("unchecked")
    void doSomething() {}
    @Deprecated
    String oldMethod() { return "Use newMethod() instead"; }
}`,
        concepts: ['@Override', '@Deprecated', '@SuppressWarnings', 'Custom annotations', '@Retention/@Target'],
      }
    ]
  },
  {
    id: 'advanced-concurrency',
    level: 'Advanced',
    title: 'Advanced Concurrency',
    description: 'Synchronization, locks, executors, and asynchronous programming with CompletableFuture.',
    lessons: [
      {
        id: 'synchronization',
        title: 'Synchronization & volatile',
        description: 'The synchronized keyword provides mutual exclusion. volatile guarantees visibility across threads.',
        code: `public class Main {
    static int counter = 0;
    static volatile boolean running = true;
    public static void main(String[] args) throws Exception {
        var t1 = new Thread(Main::increment);
        var t2 = new Thread(Main::increment);
        t1.start(); t2.start();
        t1.join(); t2.join();
        System.out.println("Counter: " + counter);
    }
    static synchronized void increment() {
        for (int i = 0; i < 1000; i++) counter++;
    }
}`,
        concepts: ['synchronized keyword', 'Monitor lock', 'volatile visibility', 'Race condition prevention'],
      },
      {
        id: 'locks',
        title: 'Locks & Conditions',
        description: 'java.util.concurrent.locks provides more flexible locking than synchronized.',
        code: `import java.util.concurrent.locks.*;
public class Main {
    static final Lock lock = new ReentrantLock();
    static final Condition notFull = lock.newCondition();
    static int count = 0;
    public static void main(String[] args) throws Exception {
        lock.lock();
        try {
            count = 42;
            System.out.println("Locked: " + count);
        } finally { lock.unlock(); }
    }
}`,
        concepts: ['ReentrantLock', 'Lock/unlock pattern', 'Condition', 'tryLock'],
      },
      {
        id: 'executors',
        title: 'ExecutorService & Thread Pools',
        description: 'Thread pools reuse threads to avoid the overhead of creating new threads.',
        code: `import java.util.concurrent.*;
public class Main {
    public static void main(String[] args) throws Exception {
        var executor = Executors.newFixedThreadPool(4);
        var futures = new java.util.ArrayList<Future<Integer>>();
        for (int i = 0; i < 10; i++) {
            int task = i;
            futures.add(executor.submit(() -> {
                Thread.sleep(100);
                return task * task;
            }));
        }
        for (var f : futures) System.out.println(f.get());
        executor.shutdown();
    }
}`,
        concepts: ['Thread pool', 'FixedThreadPool', 'Future', 'shutdown()'],
      },
      {
        id: 'completable-future',
        title: 'CompletableFuture',
        description: 'Async programming with CompletableFuture: thenApply, thenCompose, allOf.',
        code: `import java.util.concurrent.*;
public class Main {
    public static void main(String[] args) throws Exception {
        CompletableFuture.supplyAsync(() -> "Hello")
            .thenApply(s -> s + " World")
            .thenApply(String::toUpperCase)
            .thenAccept(System.out::println)
            .get();
        var f1 = CompletableFuture.supplyAsync(() -> 10);
        var f2 = CompletableFuture.supplyAsync(() -> 20);
        f1.thenCombine(f2, Integer::sum)
            .thenAccept(s -> System.out.println("Sum: " + s));
        Thread.sleep(500);
    }
}`,
        concepts: ['supplyAsync', 'thenApply/thenAccept', 'thenCombine', 'allOf/anyOf'],
      }
    ]
  },
  {
    id: 'advanced-jvm',
    level: 'Advanced',
    title: 'JVM Internals',
    description: 'Bytecode, class loading, memory model, garbage collection, and JMX.',
    lessons: [
      {
        id: 'bytecode-basics',
        title: 'Reading Bytecode',
        description: 'Java compiles to bytecode (.class). The JVM verifies and executes these instructions.',
        code: `public class Main {
    public static void main(String[] args) {
        int a = 10;
        int b = 20;
        int sum = a + b;
        System.out.println(sum);
    }
}`,
        concepts: ['Compilation to .class', 'JVM instructions', 'Operand stack', 'Constant pool'],
        checkpoint: {
          question: 'Where does the JVM store intermediate calculation values?',
          options: ['On the heap', 'In the constant pool', 'On the operand stack', 'In a register'],
          correctIndex: 2,
          explanation: 'The operand stack holds intermediate values during bytecode execution.'
        }
      },
      {
        id: 'class-loading',
        title: 'Class Loading & Metaspace',
        description: 'Classes load lazily. The three built-in classloaders: Bootstrap, Platform, Application.',
        code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Loading classes...");
        var cl = Main.class.getClassLoader();
        System.out.println("ClassLoader: " + cl);
        System.out.println("Parent: " + cl.getParent());
        System.out.println("Bootstrap: " + cl.getParent().getParent());
        try {
            Class.forName("MyClass");
        } catch (ClassNotFoundException e) {
            System.out.println("MyClass not found (expected)");
        }
    }
}`,
        concepts: ['Lazy loading', 'ClassLoader hierarchy', 'Parent delegation', 'Metaspace'],
      },
      {
        id: 'gc-advanced',
        title: 'Garbage Collection',
        description: 'Generational collection: Young (Eden, S0, S1) → Old. Major collectors: G1, ZGC, Shenandoah.',
        code: `public class Main {
    public static void main(String[] args) throws Exception {
        var rt = Runtime.getRuntime();
        System.out.println("Max memory: " + rt.maxMemory() / 1048576 + "MB");
        var list = new java.util.ArrayList<byte[]>();
        for (int i = 0; i < 10; i++) {
            list.add(new byte[10_000_000]);
            System.out.println("Allocated 10MB, free: " + rt.freeMemory() / 1048576 + "MB");
            Thread.sleep(200);
        }
        list.clear();
        System.gc();
        Thread.sleep(1000);
        System.out.println("After GC, free: " + rt.freeMemory() / 1048576 + "MB");
    }
}`,
        concepts: ['Generational GC', 'Young collection', 'Old generation promotion', 'GC tuning flags'],
      },
      {
        id: 'jvm-memory',
        title: 'JVM Memory Model',
        description: 'Stack (per-thread: frames, locals, operand stack), Heap (shared: objects), Metaspace (classes).',
        code: `public class Main {
    static String staticVar = "Class data (Metaspace)";
    public static void main(String[] args) {
        int local = 42; // On stack
        var obj = new Data("On heap");
        System.out.println(local);
        System.out.println(obj);
        System.out.println(staticVar);
    }
}
record Data(String value) {}`,
        concepts: ['Stack per thread', 'Heap shared', 'Metaspace', 'Native memory'],
      },
      {
        id: 'jit-compilation',
        title: 'JIT Compilation & Inlining',
        description: 'The JIT compiler profiles hot methods and compiles bytecode to native code at runtime.',
        code: `public class Main {
    public static void main(String[] args) {
        long sum = 0;
        // Hot loop triggers JIT compilation
        for (int i = 0; i < 1_000_000; i++) {
            sum += hotMethod(i);
        }
        System.out.println("Sum: " + sum);
        System.out.println("-XX:+PrintCompilation to see JIT activity");
    }
    static int hotMethod(int x) {
        return x * 2 + 1;
    }
}`,
        concepts: ['Hot method detection', 'C1/C2 compilers', 'Inlining', 'Deoptimization'],
      },
      {
        id: 'jmx-profiling',
        title: 'Performance & JMX',
        description: 'JMX exposes JVM internals (heap, threads, GC) via MBeans for monitoring and profiling.',
        code: `import java.lang.management.*;
public class Main {
    public static void main(String[] args) {
        var mxBean = ManagementFactory.getMemoryMXBean();
        var heap = mxBean.getHeapMemoryUsage();
        System.out.println("Heap used: " + heap.getUsed() / 1048576 + "MB");
        System.out.println("Heap max: " + heap.getMax() / 1048576 + "MB");
        var threadBean = ManagementFactory.getThreadMXBean();
        System.out.println("Thread count: " + threadBean.getThreadCount());
        var gcBeans = ManagementFactory.getGarbageCollectorMXBeans();
        for (var gc : gcBeans) {
            System.out.println(gc.getName() + ": " + gc.getCollectionCount() + " collections");
        }
    }
}`,
        concepts: ['MemoryMXBean', 'ThreadMXBean', 'GarbageCollectorMXBean', 'JVM monitoring'],
      },
      {
        id: 'stack-traces',
        title: 'Stack Traces & Debugging',
        description: 'Reading stack traces to diagnose exceptions and understand the call chain.',
        code: `public class Main {
    public static void main(String[] args) {
        try {
            level1();
        } catch (Exception e) {
            e.printStackTrace();
            for (var ste : e.getStackTrace()) {
                System.out.println(ste.getClassName() + "." + ste.getMethodName() + ":" + ste.getLineNumber());
            }
        }
    }
    static void level1() { level2(); }
    static void level2() { level3(); }
    static void level3() { throw new RuntimeException("Boom!"); }
}`,
        concepts: ['Stack trace elements', 'Cause chain', 'Line number mapping', 'Exception diagnostics'],
      },
      {
        id: 'reflection',
        title: 'Reflection API',
        description: 'Inspect classes, methods, fields at runtime. Used by frameworks (Spring, Hibernate).',
        code: `import java.lang.reflect.*;
public class Main {
    public static void main(String[] args) throws Exception {
        Class<?> cl = String.class;
        System.out.println("Class: " + cl.getName());
        for (Method m : cl.getMethods()) {
            if (m.getParameterCount() == 0) {
                System.out.println("  " + m.getName());
            }
        }
        // Invoke method reflectively
        String s = "Hello";
        Method length = String.class.getMethod("length");
        System.out.println("Length via reflection: " + length.invoke(s));
    }
}`,
        concepts: ['Class object', 'getMethods/getFields', 'Method.invoke', 'Performance cost'],
      }
    ]
  },
  {
    id: 'advanced-modern',
    level: 'Advanced',
    title: 'Java Module System & Concurrent Collections',
    description: 'Java Platform Module System (JPMS) and thread-safe collections.',
    lessons: [
      {
        id: 'module-system',
        title: 'Module System (JPMS)',
        description: 'Java 9 modules encapsulate packages and declare dependencies explicitly.',
        code: `// module-info.java
// module com.example {
//     requires java.sql;
//     exports com.example.api;
// }
public class Main {
    public static void main(String[] args) {
        System.out.println("Module: " + Main.class.getModule().getName());
        System.out.println("Packages: " + Main.class.getModule().getPackages());
        System.out.println("Module system enforces encapsulation at the JVM level");
    }
}`,
        concepts: ['module-info.java', 'requires/exports', 'Module graph', 'Named vs unnamed modules'],
      },
      {
        id: 'concurrent-collections',
        title: 'Concurrent Collections',
        description: 'ConcurrentHashMap, CopyOnWriteArrayList, BlockingQueue — thread-safe without full synchronization.',
        code: `import java.util.concurrent.*;
public class Main {
    public static void main(String[] args) throws Exception {
        var map = new ConcurrentHashMap<String, Integer>();
        var queue = new LinkedBlockingQueue<String>();
        var executor = Executors.newFixedThreadPool(4);
        for (int i = 0; i < 10; i++) {
            int task = i;
            executor.submit(() -> {
                map.put("key" + task, task);
                queue.offer("task" + task);
            });
        }
        executor.shutdown();
        executor.awaitTermination(1, TimeUnit.SECONDS);
        System.out.println("Map size: " + map.size());
        System.out.println("Queue size: " + queue.size());
    }
}`,
        concepts: ['ConcurrentHashMap segments', 'CopyOnWriteArrayList', 'BlockingQueue', 'Lock striping'],
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
