package com.jvmexplorer.curriculum;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CurriculumSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(CurriculumSeeder.class);
    private final CurriculumModuleRepository moduleRepo;

    public CurriculumSeeder(CurriculumModuleRepository moduleRepo) {
        this.moduleRepo = moduleRepo;
    }

    @Override
    public void run(String... args) {
        if (moduleRepo.count() > 0) {
            log.info("Curriculum already seeded, skipping");
            return;
        }
        log.info("Seeding curriculum data...");
        moduleRepo.saveAll(buildModules());
        log.info("Curriculum seeded successfully");
    }

    private List<CurriculumModule> buildModules() {
        return List.of(
            module("beginner-variables", "Beginner", "Variables & Types", "How Java stores data in variables and the primitive type system.", 0, List.of(
                lesson("variables", "Variables", "Variables are named memory locations. Java is statically typed — every variable must declare its type.",
                    "public class Main {\n    public static void main(String[] args) {\n        int age = 25;\n        double price = 19.99;\n        String name = \"JVM Explorer\";\n        boolean isFun = true;\n        System.out.println(\"Name: \" + name);\n        System.out.println(\"Age: \" + age);\n        System.out.println(\"Price: \" + price);\n        System.out.println(\"Is fun? \" + isFun);\n    }\n}",
                    "Variable declaration,Primitive types,Type inference (var)",
                    "Which of these is a valid Java variable declaration?|int 1number = 5;,int number = 5;,number = 5;,var 5 = number;|1|Java variable declarations must have a type followed by a name."),
                lesson("primitives", "Primitive Types", "Java has 8 primitive types: byte, short, int, long, float, double, char, boolean.",
                    "public class Main {\n    public static void main(String[] args) {\n        byte b = 127; short s = 32767;\n        int i = 2_147_483_647; long l = 9_223_372_036_854_775_807L;\n        float f = 3.14f; double d = 3.14159265359;\n        char c = 'A'; boolean bool = true;\n        System.out.println(\"byte: \" + b + \" int: \" + i);\n        System.out.println(\"double: \" + d + \" char: \" + c);\n    }\n}",
                    "8 primitive types,Type ranges,Underscores in numbers", null),
                lesson("references", "Object References", "Objects live on the heap. Variables hold references (memory addresses) to objects.",
                    "public class Main {\n    public static void main(String[] args) {\n        String a = \"Hello\";\n        String b = a;\n        System.out.println(\"a: \" + a + \" b: \" + b);\n        a = \"World\";\n        System.out.println(\"After change:\");\n        System.out.println(\"a: \" + a + \" b: \" + b + \" (unchanged)\");\n    }\n}",
                    "Reference variables,Heap allocation,String immutability", null)
            )),
            module("beginner-operators", "Beginner", "Operators & Expressions", "Arithmetic, comparison, logical, and bitwise operators in Java.", 1, List.of(
                lesson("arithmetic", "Arithmetic & Comparison", "Standard math operators (+, -, *, /, %) and comparison operators (==, !=, <, >).",
                    "public class Main {\n    public static void main(String[] args) {\n        int a = 10, b = 3;\n        System.out.println(\"Sum: \" + (a + b));\n        System.out.println(\"Difference: \" + (a - b));\n        System.out.println(\"Product: \" + (a * b));\n        System.out.println(\"Quotient: \" + (a / b));\n        System.out.println(\"Remainder: \" + (a % b));\n        System.out.println(\"a > b: \" + (a > b));\n        System.out.println(\"a == b: \" + (a == b));\n    }\n}",
                    "Arithmetic operators,Integer division,Modulo,Comparison", null),
                lesson("logical", "Logical & Bitwise", "Boolean logic (&&, ||, !) and bitwise operations (&, |, ^, ~, <<, >>).",
                    "public class Main {\n    public static void main(String[] args) {\n        boolean t = true, f = false;\n        System.out.println(\"AND: \" + (t && f));\n        System.out.println(\"OR: \" + (t || f));\n        System.out.println(\"NOT: \" + (!t));\n        int x = 0b1100, y = 0b1010;\n        System.out.println(\"Bitwise AND: \" + (x & y));\n        System.out.println(\"Bitwise OR: \" + (x | y));\n        System.out.println(\"Left shift: \" + (x << 1));\n    }\n}",
                    "Short-circuit evaluation,Bitwise operators,Shift operators", null)
            )),
            module("beginner-control", "Beginner", "Control Flow", "Branching with if/else/else-if and switch statements.", 2, List.of(
                lesson("ifelse", "if / else if / else", "Conditional branching. The JVM evaluates the boolean expression and jumps to the matching branch.",
                    "public class Main {\n    public static void main(String[] args) {\n        int score = 85;\n        if (score >= 90) {\n            System.out.println(\"Grade: A\");\n        } else if (score >= 80) {\n            System.out.println(\"Grade: B\");\n        } else if (score >= 70) {\n            System.out.println(\"Grade: C\");\n        } else {\n            System.out.println(\"Grade: F\");\n        }\n    }\n}",
                    "Conditional branching,Else-if chain,Boolean expressions",
                    "What happens when an if condition is false?|The JVM throws an exception,Execution jumps to else/else-if or continues,The program crashes,The condition is re-evaluated|1|When the if condition is false, execution jumps to the else/else-if branch or continues after the block."),
                lesson("switch", "Switch Statements", "Switch selects a branch using a jump table (lookupswitch/tableswitch bytecode) for O(1) dispatch.",
                    "public class Main {\n    public static void main(String[] args) {\n        String day = \"Monday\";\n        switch (day) {\n            case \"Monday\" -> System.out.println(\"Start of week\");\n            case \"Friday\" -> System.out.println(\"Almost weekend\");\n            case \"Saturday\", \"Sunday\" -> System.out.println(\"Weekend!\");\n            default -> System.out.println(\"Midweek\");\n        }\n    }\n}",
                    "Switch expressions,Arrow syntax,Jump table dispatch", null)
            )),
            module("beginner-loops", "Beginner", "Loops", "Repeating execution with for, while, and do-while loops.", 3, List.of(
                lesson("for-loop", "For Loop", "The for loop combines initialization, condition, and update in one line.",
                    "public class Main {\n    public static void main(String[] args) {\n        for (int i = 0; i < 5; i++) {\n            System.out.println(\"Iteration: \" + i);\n        }\n        int[] nums = {10, 20, 30};\n        for (int n : nums) {\n            System.out.println(\"Value: \" + n);\n        }\n    }\n}",
                    "For loop structure,Iteration variable,For-each syntax", null),
                lesson("while-do", "While & Do-While", "While checks before executing; do-while always executes at least once.",
                    "public class Main {\n    public static void main(String[] args) {\n        int i = 0;\n        while (i < 3) {\n            System.out.println(\"While: \" + i++);\n        }\n        int j = 0;\n        do {\n            System.out.println(\"Do-while: \" + j++);\n        } while (j < 3);\n    }\n}",
                    "While loop,Do-while loop,Post-test vs pre-test", null)
            )),
            module("beginner-arrays", "Beginner", "Arrays", "Fixed-length containers storing elements of the same type.", 4, List.of(
                lesson("array-basics", "Array Basics", "Arrays are objects on the heap with a fixed length. Indexing is zero-based.",
                    "public class Main {\n    public static void main(String[] args) {\n        int[] numbers = new int[5];\n        numbers[0] = 10; numbers[1] = 20; numbers[2] = 30;\n        System.out.println(\"Length: \" + numbers.length);\n        System.out.println(\"First: \" + numbers[0]);\n        int[][] matrix = {{1,2},{3,4}};\n        System.out.println(\"Element [1][0]: \" + matrix[1][0]);\n    }\n}",
                    "Array allocation,Indexing,Length property,Multidimensional arrays", null)
            )),
            module("beginner-methods", "Beginner", "Methods & Parameters", "Method calls, parameters, return values, and the call stack.", 5, List.of(
                lesson("methods", "Defining Methods", "Methods define behavior. When called, a new stack frame is pushed onto the call stack.",
                    "public class Main {\n    public static void main(String[] args) {\n        int result = add(5, 3);\n        System.out.println(\"5 + 3 = \" + result);\n        greet(\"JVM\");\n    }\n    static int add(int a, int b) {\n        return a + b;\n    }\n    static void greet(String name) {\n        System.out.println(\"Hello, \" + name + \"!\");\n    }\n}",
                    "Method declaration,Parameters,Return types,Stack frames",
                    "What happens when a method is called?|A new heap object is created,A new stack frame is pushed,The method is JIT compiled,Local variables are copied to the heap|1|Each method call creates a new stack frame containing local variables and the operand stack."),
                lesson("overloading", "Method Overloading", "Multiple methods can share the same name if their parameters differ (compile-time polymorphism).",
                    "public class Main {\n    public static void main(String[] args) {\n        System.out.println(add(1, 2));\n        System.out.println(add(1, 2, 3));\n        System.out.println(add(1.5, 2.5));\n    }\n    static int add(int a, int b) { return a + b; }\n    static int add(int a, int b, int c) { return a + b + c; }\n    static double add(double a, double b) { return a + b; }\n}",
                    "Overloading rules,Signature uniqueness,Compile-time resolution", null)
            )),
            module("beginner-classes", "Beginner", "Classes & Objects", "Blueprints, heap allocation, and the interplay between classes and instances.", 6, List.of(
                lesson("classes-objects", "Classes & Objects", "A class is a blueprint. new allocates memory on the heap and calls the constructor.",
                    "public class Main {\n    public static void main(String[] args) {\n        var p1 = new Person(\"Alice\", 30);\n        var p2 = new Person(\"Bob\", 25);\n        p1.introduce();\n        p2.introduce();\n        System.out.println(\"Total: \" + Person.count);\n    }\n}\nclass Person {\n    String name; int age;\n    static int count = 0;\n    Person(String name, int age) {\n        this.name = name; this.age = age; count++;\n    }\n    void introduce() {\n        System.out.println(\"Hi, I'm \" + name);\n    }\n}",
                    "Class declaration,Constructor,Static vs instance,Heap allocation", null),
                lesson("encapsulation", "Encapsulation", "Hide internal state with private fields and expose behavior through public methods.",
                    "public class Main {\n    public static void main(String[] args) {\n        var acc = new BankAccount(1000);\n        acc.deposit(500);\n        acc.withdraw(200);\n        System.out.println(\"Balance: $\" + acc.getBalance());\n    }\n}\nclass BankAccount {\n    private double balance;\n    public BankAccount(double initial) { balance = initial; }\n    public double getBalance() { return balance; }\n    public void deposit(double amt) { if (amt > 0) balance += amt; }\n    public boolean withdraw(double amt) {\n        if (amt > 0 && amt <= balance) { balance -= amt; return true; }\n        return false;\n    }\n}",
                    "Private fields,Getters/setters,Data hiding,Defensive checks", null),
                lesson("constructors", "Constructors", "Constructors initialize new objects. If none is written, Java provides a default no-arg constructor.",
                    "public class Main {\n    public static void main(String[] args) {\n        var r1 = new Rectangle();\n        var r2 = new Rectangle(5, 3);\n        System.out.println(\"Default: \" + r1.area());\n        System.out.println(\"Custom: \" + r2.area());\n    }\n}\nclass Rectangle {\n    int w, h;\n    Rectangle() { this(1, 1); }\n    Rectangle(int w, int h) { this.w = w; this.h = h; }\n    int area() { return w * h; }\n}",
                    "Default constructor,Constructor chaining,this(),Overloading", null)
            )),
            module("beginner-strings", "Beginner", "String Manipulation", "Strings are immutable objects. Operations like concat, substring, and StringBuilder.", 7, List.of(
                lesson("string-basics", "String API", "Strings are immutable — every modification creates a new String object on the heap.",
                    "public class Main {\n    public static void main(String[] args) {\n        String s = \"Hello\";\n        System.out.println(s.length());\n        System.out.println(s.toUpperCase());\n        System.out.println(s.substring(1, 4));\n        System.out.println(s.indexOf('l'));\n        System.out.println(s.replace('l', 'x'));\n        String name = \"Java\"; int ver = 23;\n        System.out.println(name + \" \" + ver);\n        System.out.println(\"Hello\".equals(\"hello\"));\n    }\n}",
                    "String immutability,String API,Interning,equals() vs ==", null),
                lesson("stringbuilder", "StringBuilder", "StringBuilder is mutable and efficient for repeated concatenation. No intermediate objects.",
                    "public class Main {\n    public static void main(String[] args) {\n        StringBuilder sb = new StringBuilder();\n        sb.append(\"Hello\");\n        sb.append(\" \");\n        sb.append(\"World\");\n        sb.insert(5, \",\");\n        System.out.println(sb.toString());\n        System.out.println(\"Length: \" + sb.length());\n        sb.reverse();\n        System.out.println(\"Reversed: \" + sb);\n    }\n}",
                    "Mutable strings,StringBuilder API,Performance vs String", null)
            )),
            module("beginner-inheritance", "Beginner", "Inheritance & Polymorphism", "Reuse behavior through inheritance and override methods for runtime polymorphism.", 8, List.of(
                lesson("inheritance", "Inheritance", "A subclass inherits all non-private fields and methods from its parent. Java supports single-class inheritance.",
                    "public class Main {\n    public static void main(String[] args) {\n        var dog = new Dog(\"Buddy\");\n        dog.speak();\n        System.out.println(dog.name + \" has \" + dog.legs + \" legs\");\n    }\n}\nclass Animal {\n    String name; int legs;\n    Animal(String n, int l) { name = n; legs = l; }\n    void speak() { System.out.println(\"...\"); }\n}\nclass Dog extends Animal {\n    Dog(String n) { super(n, 4); }\n    @Override void speak() { System.out.println(\"Woof!\"); }\n}",
                    "extends keyword,super(),Method overriding,Inheritance chain", null),
                lesson("polymorphism", "Polymorphism", "A parent reference can point to any child object. Method calls dispatch to the actual runtime type.",
                    "public class Main {\n    public static void main(String[] args) {\n        Animal[] animals = {new Dog(), new Cat()};\n        for (Animal a : animals) a.speak();\n    }\n}\nclass Animal { void speak() { System.out.println(\"...\"); } }\nclass Dog extends Animal { @Override void speak() { System.out.println(\"Woof\"); } }\nclass Cat extends Animal { @Override void speak() { System.out.println(\"Meow\"); } }",
                    "Upcasting,Dynamic dispatch,@Override,Polymorphic collections", null),
                lesson("packages", "Packages & Imports", "Packages organize classes into namespaces. The main method is the JVM entry point.",
                    "package com.example;\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Args received: \" + args.length);\n        for (int i = 0; i < args.length; i++) {\n            System.out.println(\"arg[\" + i + \"] = \" + args[i]);\n        }\n    }\n}",
                    "Package declaration,Import statements,CLI arguments,Entry point", null)
            )),
            module("intermediate-abstract", "Intermediate", "Abstract Classes & Interfaces", "Contracts for behavior with abstract methods and interface default methods.", 9, List.of(
                lesson("abstract", "Abstract Classes", "Abstract classes cannot be instantiated. Subclasses must implement abstract methods.",
                    "public class Main {\n    public static void main(String[] args) {\n        Shape s1 = new Circle(5);\n        Shape s2 = new Square(4);\n        System.out.println(\"Circle area: \" + s1.area());\n        System.out.println(\"Square area: \" + s2.area());\n    }\n}\nabstract class Shape {\n    abstract double area();\n}\nclass Circle extends Shape {\n    double r; Circle(double r) { this.r = r; }\n    @Override double area() { return Math.PI * r * r; }\n}\nclass Square extends Shape {\n    double side; Square(double s) { side = s; }\n    @Override double area() { return side * side; }\n}",
                    "Abstract keyword,Abstract methods,Cannot instantiate,Template pattern", null),
                lesson("interfaces", "Interfaces", "Interfaces define a contract. Classes can implement multiple interfaces (multiply-inheritance of type).",
                    "public class Main {\n    public static void main(String[] args) {\n        var robot = new Robot();\n        robot.work();\n        robot.charge();\n        System.out.println(\"Battery: \" + robot.getBattery());\n    }\n}\ninterface Worker { void work(); }\ninterface Chargable { void charge(); int getBattery(); }\nclass Robot implements Worker, Chargable {\n    int battery = 100;\n    public void work() { battery -= 20; }\n    public void charge() { battery = 100; }\n    public int getBattery() { return battery; }\n}",
                    "implements,Multiple interfaces,Default methods,Interface segregation", null)
            )),
            module("intermediate-exceptions", "Intermediate", "Exception Handling", "Try/catch/finally, checked vs unchecked exceptions, and creating custom exceptions.", 10, List.of(
                lesson("try-catch", "Try / Catch / Finally", "Exceptions unwind the stack until a matching catch is found. Finally always runs.",
                    "public class Main {\n    public static void main(String[] args) {\n        try {\n            int result = divide(10, 0);\n            System.out.println(\"Result: \" + result);\n        } catch (ArithmeticException e) {\n            System.out.println(\"Caught: \" + e.getMessage());\n        } finally {\n            System.out.println(\"Finally always executes\");\n        }\n    }\n    static int divide(int a, int b) {\n        return a / b;\n    }\n}",
                    "Try block,Catch clause,Finally,Stack unwinding",
                    "When does the finally block execute?|Only if no exception occurs,Only if an exception occurs,Always even with return in try,Only in checked exceptions|2|The finally block always executes, even if try has a return statement."),
                lesson("custom-exceptions", "Custom Exceptions", "Create domain-specific exceptions by extending Exception (checked) or RuntimeException (unchecked).",
                    "public class Main {\n    public static void main(String[] args) {\n        try {\n            withdraw(50);\n            withdraw(200);\n        } catch (InsufficientFundsException e) {\n            System.out.println(\"Error: \" + e.getMessage());\n        }\n    }\n    static int balance = 100;\n    static void withdraw(int amt) throws InsufficientFundsException {\n        if (amt > balance) throw new InsufficientFundsException(\"Need \" + amt + \", have \" + balance);\n        balance -= amt;\n        System.out.println(\"Withdrew \" + amt + \", balance: \" + balance);\n    }\n}\nclass InsufficientFundsException extends Exception {\n    InsufficientFundsException(String msg) { super(msg); }\n}",
                    "Checked vs unchecked,throws clause,Custom exception class,Exception chaining", null)
            )),
            module("intermediate-collections", "Intermediate", "Collections Framework", "Lists, Sets, Maps — how they work under the hood.", 11, List.of(
                lesson("arraylist", "ArrayList", "Resizable array. When full, creates a new array 50% larger and copies elements.",
                    "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        var list = new ArrayList<String>();\n        list.add(\"A\"); list.add(\"B\"); list.add(\"C\");\n        System.out.println(\"Size: \" + list.size());\n        list.add(1, \"X\");\n        System.out.println(\"After insert: \" + list);\n        list.remove(\"B\");\n        System.out.println(\"After remove: \" + list);\n    }\n}",
                    "Dynamic array,Resize strategy,Random access O(1),Insert/remove O(n)", null),
                lesson("hashmap", "HashMap", "Uses buckets indexed by hashCode(). Collisions resolved with linked lists or trees.",
                    "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        var map = new HashMap<String, Integer>();\n        map.put(\"one\", 1);\n        map.put(\"two\", 2);\n        map.put(\"three\", 3);\n        System.out.println(\"Map: \" + map);\n        System.out.println(\"Get two: \" + map.get(\"two\"));\n        System.out.println(\"Contains four: \" + map.containsKey(\"four\"));\n        for (var e : map.entrySet()) {\n            System.out.println(e.getKey() + \" -> \" + e.getValue());\n        }\n    }\n}",
                    "Hashing,Buckets,Collision resolution,Load factor", null),
                lesson("hashcode", "equals() & hashCode()", "Objects used as HashMap keys must override equals() and hashCode() consistently.",
                    "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        var map = new HashMap<Point, String>();\n        map.put(new Point(1, 2), \"first\");\n        System.out.println(map.get(new Point(1, 2)));\n    }\n}\nrecord Point(int x, int y) {}",
                    "equals contract,hashCode contract,Consistency rule,Record defaults", null),
                lesson("sets", "HashSet & TreeSet", "HashSet is backed by HashMap. TreeSet keeps elements sorted (Red-Black tree).",
                    "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        var hashSet = new HashSet<>(Set.of(3, 1, 4, 1, 5));\n        System.out.println(\"HashSet: \" + hashSet);\n        var treeSet = new TreeSet<>(Set.of(3, 1, 4, 1, 5));\n        System.out.println(\"TreeSet: \" + treeSet);\n        System.out.println(\"First: \" + treeSet.first());\n        System.out.println(\"Higher than 3: \" + treeSet.higher(3));\n    }\n}",
                    "HashSet backing,TreeSet ordering,NavigableSet,Duplicates eliminated", null)
            )),
            module("intermediate-generics", "Intermediate", "Generics", "Type-safe collections and generic methods with type parameters.", 12, List.of(
                lesson("generics-basics", "Generic Classes & Methods", "Generics enable compile-time type safety. The compiler erases type parameters (type erasure).",
                    "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Box<String> stringBox = new Box<>(\"Hello\");\n        Box<Integer> intBox = new Box<>(42);\n        System.out.println(stringBox.get());\n        System.out.println(intBox.get());\n        System.out.println(max(3, 7, 5));\n    }\n    static <T extends Comparable<T>> T max(T a, T b, T c) {\n        T m = a;\n        if (b.compareTo(m) > 0) m = b;\n        if (c.compareTo(m) > 0) m = c;\n        return m;\n    }\n}\nclass Box<T> {\n    private T value;\n    Box(T value) { this.value = value; }\n    T get() { return value; }\n}",
                    "Type parameters,Generic methods,Bounded type parameters,Type erasure",
                    "What happens to generic type information at runtime?|It is preserved fully,It is erased (type erasure),It is stored in a separate table,It becomes dynamic|1|The compiler erases type parameters to their bounds or Object (type erasure)."),
                lesson("wildcards", "Wildcards & Bounds", "? extends T (covariant), ? super T (contravariant) for flexible API design.",
                    "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        List<Integer> ints = List.of(1, 2, 3);\n        printNumbers(ints);\n        List<Number> nums = new ArrayList<>();\n        addInts(nums);\n    }\n    static void printNumbers(List<? extends Number> list) {\n        for (Number n : list) System.out.println(n);\n    }\n    static void addInts(List<? super Integer> list) {\n        list.add(1); list.add(2);\n    }\n}",
                    "Covariance (? extends),Contravariance (? super),PECS principle,Unbounded wildcard ?", null)
            )),
            module("intermediate-lambdas", "Intermediate", "Lambdas & Streams", "Functional programming in Java: lambda expressions, the Streams API, and Optional.", 13, List.of(
                lesson("lambdas", "Lambda Expressions", "Lambdas are anonymous functions. The JVM uses invokedynamic to bootstrap them efficiently.",
                    "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        var names = Arrays.asList(\"Charlie\", \"Alice\", \"Bob\");\n        names.sort((a, b) -> a.compareTo(b));\n        System.out.println(\"Sorted: \" + names);\n        names.forEach(System.out::println);\n    }\n}",
                    "Lambda syntax,Functional interface,invokedynamic,Method reference", null),
                lesson("streams", "Streams API", "Streams process data declaratively: filter, map, reduce — lazily evaluated.",
                    "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        var nums = List.of(1, 2, 3, 4, 5, 6);\n        var result = nums.stream()\n            .filter(n -> n % 2 == 0)\n            .map(n -> n * n)\n            .reduce(0, Integer::sum);\n        System.out.println(\"Sum of evens squared: \" + result);\n        var words = List.of(\"cat\", \"dog\", \"bird\", \"fish\");\n        var byLen = words.stream().collect(\n            Collectors.groupingBy(String::length));\n        System.out.println(\"Grouped by length: \" + byLen);\n    }\n}",
                    "Stream pipeline,Lazy evaluation,Intermediate/terminal ops,Collectors", null),
                lesson("optional", "Optional", "A container that may or may not hold a value — eliminates null checks.",
                    "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Optional<String> present = Optional.of(\"Hello\");\n        Optional<String> empty = Optional.empty();\n        System.out.println(present.orElse(\"default\"));\n        System.out.println(empty.orElse(\"default\"));\n        present.ifPresent(v -> System.out.println(\"Value: \" + v));\n        String result = empty.orElseThrow(() -> new RuntimeException(\"Missing!\"));\n    }\n}",
                    "Optional creation,map/filter on Optional,orElse vs orElseThrow,Avoid isPresent-get", null)
            )),
            module("intermediate-io", "Intermediate", "File I/O & Time API", "Reading/writing files with java.nio.file and working with dates and times.", 14, List.of(
                lesson("file-io", "File I/O", "Files.newBufferedReader, Files.readAllLines, and try-with-resources for automatic cleanup.",
                    "import java.nio.file.*;\nimport java.util.*;\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        Path p = Files.createTempFile(\"demo\", \".txt\");\n        Files.writeString(p, \"Hello\\nWorld\");\n        String content = Files.readString(p);\n        System.out.println(\"Read: \" + content);\n        List<String> lines = Files.readAllLines(p);\n        System.out.println(\"Lines: \" + lines);\n        Files.deleteIfExists(p);\n        System.out.println(\"Temp file cleaned\");\n    }\n}",
                    "java.nio.file.Path,Read/write files,try-with-resources,Temp files", null),
                lesson("datetime", "Date & Time API", "java.time provides immutable, fluent date/time types: LocalDate, LocalTime, ZonedDateTime.",
                    "import java.time.*;\nimport java.time.format.*;\npublic class Main {\n    public static void main(String[] args) {\n        LocalDate today = LocalDate.now();\n        LocalDate xmas = LocalDate.of(2026, 12, 25);\n        Period until = Period.between(today, xmas);\n        System.out.println(\"Until Christmas: \" + until.getMonths() + \" months, \" + until.getDays() + \" days\");\n        LocalTime now = LocalTime.now();\n        System.out.println(\"Current time: \" + now.format(DateTimeFormatter.ofPattern(\"HH:mm:ss\")));\n        ZonedDateTime ny = ZonedDateTime.now(ZoneId.of(\"America/New_York\"));\n        System.out.println(\"NY time: \" + ny);\n    }\n}",
                    "LocalDate/LocalTime,Period/Duration,DateTimeFormatter,Time zones", null)
            )),
            module("intermediate-enums-records", "Intermediate", "Enums & Records", "Type-safe enumerations and concise data carriers with Records (Java 14+).", 15, List.of(
                lesson("enums", "Enums", "Enums are classes with a fixed set of instances. They can have fields and methods.",
                    "public class Main {\n    public static void main(String[] args) {\n        System.out.println(Day.SATURDAY.isWeekend());\n        System.out.println(\"Ordinal: \" + Day.WEDNESDAY.ordinal());\n        for (Day d : Day.values()) {\n            System.out.println(d + \" \" + (d.isWeekend() ? \"(weekend)\" : \"\"));\n        }\n    }\n}\nenum Day {\n    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY;\n    boolean isWeekend() {\n        return this == SATURDAY || this == SUNDAY;\n    }\n}",
                    "Enum constants,Enum methods,values()/ordinal(),Switch with enum", null),
                lesson("records", "Records", "Records are transparent data carriers with auto-generated constructor, accessors, equals, hashCode.",
                    "public class Main {\n    public static void main(String[] args) {\n        var p1 = new Point(3, 4);\n        var p2 = new Point(3, 4);\n        System.out.println(p1);\n        System.out.println(\"Equals: \" + p1.equals(p2));\n        System.out.println(\"Distance: \" + p1.distance());\n    }\n}\nrecord Point(int x, int y) {\n    double distance() {\n        return Math.sqrt(x * x + y * y);\n    }\n}",
                    "Record declaration,Canonical constructor,Auto-generated methods,Compact constructor", null)
            )),
            module("intermediate-nested", "Intermediate", "Nested Classes & Annotations", "Inner classes, static nested classes, anonymous classes, and metadata with annotations.", 16, List.of(
                lesson("nested", "Nested Classes", "Inner classes have access to enclosing instance members. Static nested classes do not.",
                    "public class Main {\n    public static void main(String[] args) {\n        var outer = new Outer();\n        outer.test();\n        Outer.StaticNested staticNested = new Outer.StaticNested();\n        staticNested.show();\n    }\n}\nclass Outer {\n    private String msg = \"Hello from Outer\";\n    class Inner { void show() { System.out.println(msg); } }\n    static class StaticNested { void show() { System.out.println(\"Static nested\"); } }\n    void test() {\n        Runnable r = new Runnable() {\n            public void run() { System.out.println(\"Anonymous\"); }\n        };\n        r.run();\n        new Inner().show();\n    }\n}",
                    "Inner class,Static nested class,Anonymous class,Enclosing reference", null),
                lesson("annotations", "Annotations", "Annotations add metadata to code. Processed at compile-time or runtime via reflection.",
                    "import java.lang.annotation.*;\npublic class Main {\n    public static void main(String[] args) {\n        var m = new MyClass();\n        System.out.println(m.oldMethod());\n    }\n}\n@Deprecated(since = \"2.0\", forRemoval = true)\nclass OldClass {}\nclass MyClass {\n    @Deprecated\n    String oldMethod() { return \"Use newMethod() instead\"; }\n}",
                    "@Override,@Deprecated,@SuppressWarnings,Custom annotations,@Retention/@Target", null)
            )),
            module("advanced-concurrency", "Advanced", "Advanced Concurrency", "Synchronization, locks, executors, and asynchronous programming with CompletableFuture.", 17, List.of(
                lesson("synchronization", "Synchronization & volatile", "The synchronized keyword provides mutual exclusion. volatile guarantees visibility across threads.",
                    "public class Main {\n    static int counter = 0;\n    public static void main(String[] args) throws Exception {\n        var t1 = new Thread(Main::increment);\n        var t2 = new Thread(Main::increment);\n        t1.start(); t2.start();\n        t1.join(); t2.join();\n        System.out.println(\"Counter: \" + counter);\n    }\n    static synchronized void increment() {\n        for (int i = 0; i < 1000; i++) counter++;\n    }\n}",
                    "synchronized keyword,Monitor lock,volatile visibility,Race condition prevention", null),
                lesson("locks", "Locks & Conditions", "java.util.concurrent.locks provides more flexible locking than synchronized.",
                    "import java.util.concurrent.locks.*;\npublic class Main {\n    static final Lock lock = new ReentrantLock();\n    static int count = 0;\n    public static void main(String[] args) throws Exception {\n        lock.lock();\n        try {\n            count = 42;\n            System.out.println(\"Locked: \" + count);\n        } finally { lock.unlock(); }\n    }\n}",
                    "ReentrantLock,Lock/unlock pattern,Condition,tryLock", null),
                lesson("executors", "ExecutorService & Thread Pools", "Thread pools reuse threads to avoid the overhead of creating new threads.",
                    "import java.util.concurrent.*;\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        var executor = Executors.newFixedThreadPool(4);\n        var futures = new java.util.ArrayList<Future<Integer>>();\n        for (int i = 0; i < 10; i++) {\n            int task = i;\n            futures.add(executor.submit(() -> {\n                Thread.sleep(100);\n                return task * task;\n            }));\n        }\n        for (var f : futures) System.out.println(f.get());\n        executor.shutdown();\n    }\n}",
                    "Thread pool,FixedThreadPool,Future,shutdown()", null),
                lesson("completable-future", "CompletableFuture", "Async programming with CompletableFuture: thenApply, thenCompose, allOf.",
                    "import java.util.concurrent.*;\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        CompletableFuture.supplyAsync(() -> \"Hello\")\n            .thenApply(s -> s + \" World\")\n            .thenApply(String::toUpperCase)\n            .thenAccept(System.out::println)\n            .get();\n        var f1 = CompletableFuture.supplyAsync(() -> 10);\n        var f2 = CompletableFuture.supplyAsync(() -> 20);\n        f1.thenCombine(f2, Integer::sum)\n            .thenAccept(s -> System.out.println(\"Sum: \" + s));\n        Thread.sleep(500);\n    }\n}",
                    "supplyAsync,thenApply/thenAccept,thenCombine,allOf/anyOf", null)
            )),
            module("advanced-jvm", "Advanced", "JVM Internals", "Bytecode, class loading, memory model, garbage collection, and JMX.", 18, List.of(
                lesson("bytecode-basics", "Reading Bytecode", "Java compiles to bytecode (.class). The JVM verifies and executes these instructions.",
                    "public class Main {\n    public static void main(String[] args) {\n        int a = 10;\n        int b = 20;\n        int sum = a + b;\n        System.out.println(sum);\n    }\n}",
                    "Compilation to .class,JVM instructions,Operand stack,Constant pool",
                    "Where does the JVM store intermediate calculation values?|On the heap,In the constant pool,On the operand stack,In a register|2|The operand stack holds intermediate values during bytecode execution."),
                lesson("class-loading", "Class Loading & Metaspace", "Classes load lazily. The three built-in classloaders: Bootstrap, Platform, Application.",
                    "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Loading classes...\");\n        var cl = Main.class.getClassLoader();\n        System.out.println(\"ClassLoader: \" + cl);\n        System.out.println(\"Parent: \" + cl.getParent());\n        System.out.println(\"Bootstrap: \" + cl.getParent().getParent());\n    }\n}",
                    "Lazy loading,ClassLoader hierarchy,Parent delegation,Metaspace", null),
                lesson("gc-advanced", "Garbage Collection", "Generational collection: Young (Eden, S0, S1) -> Old. Major collectors: G1, ZGC, Shenandoah.",
                    "public class Main {\n    public static void main(String[] args) throws Exception {\n        var rt = Runtime.getRuntime();\n        System.out.println(\"Max memory: \" + rt.maxMemory() / 1048576 + \"MB\");\n        var list = new java.util.ArrayList<byte[]>();\n        for (int i = 0; i < 10; i++) {\n            list.add(new byte[10_000_000]);\n            System.out.println(\"Allocated 10MB, free: \" + rt.freeMemory() / 1048576 + \"MB\");\n            Thread.sleep(200);\n        }\n        list.clear();\n        System.gc();\n        Thread.sleep(1000);\n        System.out.println(\"After GC, free: \" + rt.freeMemory() / 1048576 + \"MB\");\n    }\n}",
                    "Generational GC,Young collection,Old generation promotion,GC tuning flags", null),
                lesson("jvm-memory", "JVM Memory Model", "Stack (per-thread: frames, locals, operand stack), Heap (shared: objects), Metaspace (classes).",
                    "public class Main {\n    static String staticVar = \"Class data (Metaspace)\";\n    public static void main(String[] args) {\n        int local = 42;\n        var obj = new Data(\"On heap\");\n        System.out.println(local);\n        System.out.println(obj);\n        System.out.println(staticVar);\n    }\n}\nrecord Data(String value) {}",
                    "Stack per thread,Heap shared,Metaspace,Native memory", null),
                lesson("jit-compilation", "JIT Compilation & Inlining", "The JIT compiler profiles hot methods and compiles bytecode to native code at runtime.",
                    "public class Main {\n    public static void main(String[] args) {\n        long sum = 0;\n        for (int i = 0; i < 1_000_000; i++) {\n            sum += hotMethod(i);\n        }\n        System.out.println(\"Sum: \" + sum);\n    }\n    static int hotMethod(int x) {\n        return x * 2 + 1;\n    }\n}",
                    "Hot method detection,C1/C2 compilers,Inlining,Deoptimization", null),
                lesson("jmx-profiling", "Performance & JMX", "JMX exposes JVM internals (heap, threads, GC) via MBeans for monitoring and profiling.",
                    "import java.lang.management.*;\npublic class Main {\n    public static void main(String[] args) {\n        var mxBean = ManagementFactory.getMemoryMXBean();\n        var heap = mxBean.getHeapMemoryUsage();\n        System.out.println(\"Heap used: \" + heap.getUsed() / 1048576 + \"MB\");\n        System.out.println(\"Heap max: \" + heap.getMax() / 1048576 + \"MB\");\n        var threadBean = ManagementFactory.getThreadMXBean();\n        System.out.println(\"Thread count: \" + threadBean.getThreadCount());\n        var gcBeans = ManagementFactory.getGarbageCollectorMXBeans();\n        for (var gc : gcBeans) {\n            System.out.println(gc.getName() + \": \" + gc.getCollectionCount() + \" collections\");\n        }\n    }\n}",
                    "MemoryMXBean,ThreadMXBean,GarbageCollectorMXBean,JVM monitoring", null),
                lesson("stack-traces", "Stack Traces & Debugging", "Reading stack traces to diagnose exceptions and understand the call chain.",
                    "public class Main {\n    public static void main(String[] args) {\n        try {\n            level1();\n        } catch (Exception e) {\n            e.printStackTrace();\n            for (var ste : e.getStackTrace()) {\n                System.out.println(ste.getClassName() + \".\" + ste.getMethodName() + \":\" + ste.getLineNumber());\n            }\n        }\n    }\n    static void level1() { level2(); }\n    static void level2() { level3(); }\n    static void level3() { throw new RuntimeException(\"Boom!\"); }\n}",
                    "Stack trace elements,Cause chain,Line number mapping,Exception diagnostics", null),
                lesson("reflection", "Reflection API", "Inspect classes, methods, fields at runtime. Used by frameworks (Spring, Hibernate).",
                    "import java.lang.reflect.*;\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        Class<?> cl = String.class;\n        System.out.println(\"Class: \" + cl.getName());\n        for (Method m : cl.getMethods()) {\n            if (m.getParameterCount() == 0) {\n                System.out.println(\"  \" + m.getName());\n            }\n        }\n        String s = \"Hello\";\n        Method length = String.class.getMethod(\"length\");\n        System.out.println(\"Length via reflection: \" + length.invoke(s));\n    }\n}",
                    "Class object,getMethods/getFields,Method.invoke,Performance cost", null)
            )),
            module("advanced-modern", "Advanced", "Java Module System & Concurrent Collections", "Java Platform Module System (JPMS) and thread-safe collections.", 19, List.of(
                lesson("module-system", "Module System (JPMS)", "Java 9 modules encapsulate packages and declare dependencies explicitly.",
                    "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Module: \" + Main.class.getModule().getName());\n        System.out.println(\"Packages: \" + Main.class.getModule().getPackages());\n        System.out.println(\"Module system enforces encapsulation at the JVM level\");\n    }\n}",
                    "module-info.java,requires/exports,Module graph,Named vs unnamed modules", null),
                lesson("concurrent-collections", "Concurrent Collections", "ConcurrentHashMap, CopyOnWriteArrayList, BlockingQueue — thread-safe without full synchronization.",
                    "import java.util.concurrent.*;\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        var map = new ConcurrentHashMap<String, Integer>();\n        var queue = new LinkedBlockingQueue<String>();\n        var executor = Executors.newFixedThreadPool(4);\n        for (int i = 0; i < 10; i++) {\n            int task = i;\n            executor.submit(() -> {\n                map.put(\"key\" + task, task);\n                queue.offer(\"task\" + task);\n            });\n        }\n        executor.shutdown();\n        executor.awaitTermination(1, TimeUnit.SECONDS);\n        System.out.println(\"Map size: \" + map.size());\n        System.out.println(\"Queue size: \" + queue.size());\n    }\n}",
                    "ConcurrentHashMap segments,CopyOnWriteArrayList,BlockingQueue,Lock striping", null)
            ))
        );
    }

    private CurriculumModule module(String moduleId, String level, String title, String description, int sortOrder, List<Lesson> lessons) {
        var m = new CurriculumModule();
        m.setModuleId(moduleId);
        m.setLevel(level);
        m.setTitle(title);
        m.setDescription(description);
        m.setSortOrder(sortOrder);
        for (var l : lessons) l.setModule(m);
        m.setLessons(lessons);
        return m;
    }

    private Lesson lesson(String lessonId, String title, String description, String code, String concepts, String checkpoint) {
        var l = new Lesson();
        l.setLessonId(lessonId);
        l.setTitle(title);
        l.setDescription(description);
        l.setCode(code);
        l.setConcepts(concepts);
        l.setCheckpointJson(checkpoint);
        return l;
    }
}
