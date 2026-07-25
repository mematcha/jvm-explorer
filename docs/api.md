# API Documentation

Base URL: `http://localhost:8080` (development) or `https://api.yourdomain.com` (production)

Authentication: Bearer token in `Authorization` header.

---

## Authentication

### Register

```http
POST /auth/register
Content-Type: application/json

{
  "username": "alice",
  "email": "alice@example.com",
  "password": "securepass123"
}
```

Response `200`:
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "username": "alice",
  "email": "alice@example.com"
}
```

### Login

```http
POST /auth/login
Content-Type: application/json

{
  "username": "alice",
  "password": "securepass123"
}
```

Response `200`:
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "username": "alice",
  "email": "alice@example.com"
}
```

---

## Compilation

### Compile Java Source

```http
POST /api/compile
Content-Type: application/json
Authorization: Bearer <token>

{
  "className": "Main",
  "sourceCode": "public class Main { ... }"
}
```

Response `200`:
```json
{
  "success": true,
  "classBytes": { "Main": "<base64-encoded bytes>" },
  "errors": [],
  "warnings": []
}
```

---

## Execution

### Compile and Run

```http
POST /api/execute
Content-Type: application/json
Authorization: Bearer <token>

{
  "className": "Main",
  "sourceCode": "public class Main { ... }",
  "args": [],
  "timeoutMs": 30000
}
```

Response `200`:
```json
{
  "success": true,
  "stdout": "Hello, World!\n",
  "stderr": "",
  "exitCode": 0,
  "durationMs": 152,
  "errors": []
}
```

---

## Bytecode Disassembly

### Disassemble to Bytecode

```http
POST /api/bytecode
Content-Type: application/json
Authorization: Bearer <token>

{
  "className": "Main",
  "sourceCode": "public class Main { ... }"
}
```

Response `200`:
```json
{
  "success": true,
  "classes": [
    {
      "name": "Main",
      "bytecode": "Classfile /tmp/bytecode-...\n  Last modified ...\n  SHA-256 checksum ...\n  Compiled from \"Main.java\"\npublic class Main ..."
    }
  ],
  "errors": []
}
```

---

## Instrumentation

### Get JVM Snapshot

```http
GET /api/instrumentation/snapshot
Authorization: Bearer <token>
```

Response `200`:
```json
{
  "heap": {
    "usedBytes": 52428800,
    "maxBytes": 1073741824,
    "committedBytes": 268435456,
    "pendingFinalization": 0,
    "pools": [
      { "name": "G1 Eden Space", "type": "HEAP", "used": 4194304, "max": -1, "committed": 8388608 }
    ]
  },
  "threads": [
    {
      "id": 1,
      "name": "main",
      "state": "RUNNABLE",
      "stackTrace": "java.lang.Thread.dumpThreads(Native Method)\n...",
      "isVirtual": false,
      "lockInfo": ""
    }
  ],
  "classLoaders": [...],
  "gc": {
    "collectionCount": 5,
    "collectionTimeMs": 120,
    "recentGCs": [...]
  },
  "jit": {
    "totalCompilationTimeMs": 850,
    "isCompilationEnabled": true,
    "compilerName": "HotSpot Compiler"
  },
  "timestamp": 1700000000000
}
```

---

## Snippets

### Share a Snippet

```http
POST /api/snippets
Content-Type: application/json
Authorization: Bearer <token>

{
  "title": "Hello World",
  "code": "public class Main { ... }",
  "isPublic": true
}
```

### List Public Snippets

```http
GET /api/snippets/public
```

### Get Snippet by Share ID

```http
GET /api/snippets/share/abc12345
```

### List My Snippets

```http
GET /api/snippets/mine
Authorization: Bearer <token>
```

---

## WebSocket

### Connect

```
STOMP endpoint: /ws
```

### Subscribe

```
/topic/visualization   → JVM snapshot updates (500ms interval)
/queue/visualization   → Session-specific visualization data
```

### Send

```
/app/visualization.start  → Start streaming
/app/visualization.stop   → Stop streaming
```

### Message Format

```json
{
  "type": "jvm_snapshot",
  "payload": { ... }
}
```
