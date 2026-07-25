# User Guide

## Getting Started

### 1. Create an Account

Open JVM Explorer and click **Register**. Enter a username, email, and password. After registration, you're automatically logged in.

### 2. Write Code

The main editor (Monaco Editor) is pre-loaded with a "Hello, World!" template. You can:

- Type or paste any Java 21 code
- Select a template from the dropdown (Hello World, HashMap Demo, Thread Demo, GC Demo)
- Load examples from the **Learn** tab

### 3. Run Code

Click the **▶ Run** button. The code is:
1. Compiled using the Java Compiler API
2. Executed in a sandboxed subprocess with a 30-second timeout
3. Output displayed in the **Output** panel below the editor

### 4. Explore Visualizations

The right panel contains tabs for different JVM visualizations:

---

## Visualizer Tabs

### JVM Dashboard
Overview of key metrics: heap memory, thread count, GC collections, and loaded classes. Updates every 500ms via WebSocket.

### Bytecode
Click **Disassemble** to decompile your code into JVM bytecode using `javap`. See the exact instructions the JVM executes.

### Stack / Heap
Live view of:
- Thread stacks with state indicators (RUNNABLE, BLOCKED, WAITING)
- Heap memory bar with usage percentage
- Memory pool breakdown (Eden, Survivor, Old Gen, Metaspace)

### Threads
Visual timeline of all JVM threads with state-colored bars, thread IDs, names, and lock information (if blocked).

### Sync
Interactive synchronization laboratory with examples for:
- `synchronized` blocks
- `volatile` visibility
- `ReentrantLock`
- Deadlock scenarios

Click any example to load it into the editor and run it.

### GC
Garbage Collection visualization showing:
- Young Generation (Eden, S0, S1)
- Old Generation usage bar
- Total collection count and time
- Per-collector statistics

### Collections
Educational examples showing:
- HashMap internals (collisions, resizing)
- ArrayList vs LinkedList performance
- TreeMap sorted ordering

### Exceptions
Interactive exception exploration:
- Try-catch flow
- Finally block guarantees
- Multi-catch ordering
- Stack unwinding visualization

### Classes
Class loader hierarchy showing Bootstrap, Platform, and Application class loaders with loaded/unloaded class counts.

### Memory
Detailed memory breakdown:
- Heap, committed, pending finalization
- Per-pool usage bars
- JIT compiler information

---

## Learning Platform

The **Learn** tab offers a structured curriculum:

### Levels
- **Beginner**: Variables, types, methods, classes, objects
- **Intermediate**: Collections, threads, concurrency
- **Advanced**: Bytecode, class loading, garbage collection

### Lessons
Each lesson includes:
- Explanation of the concept
- Code example (click **Load Code** to try it)
- Key concept tags
- Optional knowledge check quiz

Progress is tracked locally in your browser.

---

## Sharing Snippets

### Share Code
1. Click the **Share** button in the editor toolbar
2. Enter a title
3. Toggle public/private
4. Click **Share** to generate a permalink

### Gallery
Browse public snippets in the **Gallery** tab. Click **Load** to copy code into your editor, or **Open** to view in a new tab.

---

## Tips

- **Keyboard shortcut**: Use the Templates dropdown to quickly load educational examples
- **Bytecode exploration**: Write a simple class, run it, then click Disassemble to see the bytecode
- **GC observation**: Run the GC Demo template and watch the GC Explorer tab
- **Deadlock detection**: Run the deadlock example in Sync Lab, then check the Threads tab
- **Memory leaks**: Run the GC Demo, watch heap grow, then see GC collection after `System.gc()`

## Limitations

- Code execution is limited to 30 seconds
- No file I/O or network access in sandboxed code
- Output is limited to stdout/stderr (no interactive input)
- Maximum heap for user code: depends on host JVM
