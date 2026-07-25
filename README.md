# JVM Explorer

**Interactive Java Internals Laboratory**

Write Java code and watch the JVM execute it — bytecode, stack frames, heap allocation, threads, GC, and more — visualized in real time.

![Project Status](https://img.shields.io/badge/status-active-brightgreen)
![Java](https://img.shields.io/badge/Java-21-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4-brightgreen)
![React](https://img.shields.io/badge/React-19-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

## Overview

JVM Explorer answers the question: *"What is Java actually doing underneath my code?"*

Rather than teaching Java through documentation, JVM Explorer lets you observe the Java Virtual Machine in action. Write code, run it, and watch every major runtime concept unfold visually:

- Source → Bytecode compilation
- Class loading hierarchy
- Stack frame creation and operand stack operations
- Heap allocation and object references
- Garbage collection cycles
- Thread states and deadlocks
- Synchronization primitives
- Collections internals (HashMap, ArrayList, TreeMap)
- Exception propagation and stack unwinding

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    React Frontend                    │
│  Monaco Editor  │  Visualizers  │  Dashboard        │
└──────────┬──────────────────────────────────────────┘
           │ HTTP REST + WebSocket (STOMP)
           ▼
┌─────────────────────────────────────────────────────┐
│                  Spring Boot Backend                 │
│  Auth  │  Compiler  │  Sandbox  │  Instrumentation  │
│  JWT   │  Javac API │  Process  │  MXBeans          │
└──────────┬──────────────────────────────────────────┘
           │ JDBC
           ▼
┌─────────────────────────────────────────────────────┐
│                  PostgreSQL 16                       │
└─────────────────────────────────────────────────────┘
```

---

## Getting Started

### Prerequisites

- Java 21+ (JDK 21 recommended)
- Node.js 23+
- Docker & Docker Compose (for PostgreSQL)
- Maven

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/mematcha/jvm-explorer.git
cd jvm-explorer

# 2. Start PostgreSQL
docker compose up -d postgres

# 3. Start the backend
cd backend
./mvnw spring-boot:run

# 4. In another terminal, start the frontend
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 in your browser. Register an account, then write and run Java code.

---

## Features

### Interactive Code Editor
Powered by Monaco Editor (VS Code's editor). Write any Java 21 code with syntax highlighting, error detection, and code completion.

### Bytecode Explorer
Disassemble compiled `.class` files using `javap` to see the exact bytecode instructions the JVM executes.

### Stack & Heap Visualizer
Live view of thread stacks, local variables, heap memory usage, and memory pool breakdowns — updated every 500ms via WebSocket.

### Thread Explorer
Monitor all JVM threads with their current state (RUNNABLE, BLOCKED, WAITING, TIMED_WAITING), stack traces, and lock information.

### Garbage Collection Explorer
Visualize young/old generation memory, GC event counts and durations, and memory pool utilization.

### Class Loader Explorer
View the Bootstrap → Platform → Application class loader hierarchy with loaded class counts.

### Synchronization Laboratory
Interactive examples for `synchronized`, `volatile`, `ReentrantLock`, and deadlock scenarios.

### Collections Explorer
Run demos showing HashMap bucket internals, ArrayList vs LinkedList performance, and TreeMap ordering.

### Exception Explorer
Learn how exceptions propagate through stack frames, how finally blocks work, and catch block ordering.

### Learning Platform
Structured curriculum with Beginner → Intermediate → Advanced modules, code examples, and knowledge checks with progress tracking.

### Public Gallery & Sharing
Share code snippets with permalinks, browse the public gallery, and load examples from the community.

---

## Project Structure

```
jvm-explorer/
├── backend/                  # Spring Boot 3.4 + Java 21
│   ├── src/main/java/com/jvmexplorer/
│   │   ├── auth/             # JWT authentication
│   │   ├── compilation/      # In-memory Java compiler
│   │   ├── config/           # WebSocket, Security, Rate limiting
│   │   ├── execution/        # Sandboxed code execution
│   │   ├── instrumentation/  # JVM monitoring (MXBeans)
│   │   ├── user/             # User & Snippet entities
│   │   └── ws/               # WebSocket visualization engine
│   ├── src/main/resources/
│   │   ├── db/migration/     # Flyway migrations
│   │   └── application*.properties
│   └── Dockerfile
├── frontend/                 # React 19 + TypeScript + Vite
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── data/             # Curriculum data
│   │   ├── services/         # API & WebSocket clients
│   │   ├── stores/           # Zustand state management
│   │   └── types/            # TypeScript types
│   └── Dockerfile
├── infra/terraform/          # AWS infrastructure as code
├── .github/workflows/        # CI/CD pipelines
└── docs/                     # Documentation
```

---

## API Overview

| Method | Path | Description |
|--------|------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login and get JWT |
| POST | `/api/compile` | Compile Java source code |
| POST | `/api/execute` | Compile and run Java code |
| POST | `/api/bytecode` | Disassemble to bytecode |
| GET | `/api/instrumentation/snapshot` | JVM runtime snapshot |
| POST | `/api/snippets` | Share a code snippet |
| GET | `/api/snippets/public` | List public snippets |
| GET | `/api/snippets/share/{id}` | Get snippet by share ID |

WebSocket endpoint: `/ws` (STOMP)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Language | Java 21, TypeScript |
| Backend | Spring Boot 3.4, Spring Security, Spring WebSocket |
| Frontend | React 19, Monaco Editor, Zustand, STOMP.js |
| Database | PostgreSQL 16, Flyway |
| Infrastructure | Docker, AWS ECS Fargate, RDS, ALB, Terraform |
| CI/CD | GitHub Actions |
| Monitoring | CloudWatch |

---

## License

MIT
