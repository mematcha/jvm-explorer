# Developer Setup Guide

## Prerequisites

- **Java**: JDK 21+ ([Eclipse Temurin](https://adoptium.net/) recommended)
- **Node.js**: 23+
- **Docker**: Latest stable (for PostgreSQL)
- **Maven**: 3.8+ (or use `./mvnw`)
- **IDE**: IntelliJ IDEA (recommended) or VS Code

## Clone & Install

```bash
git clone https://github.com/mematcha/jvm-explorer.git
cd jvm-explorer
```

---

## Backend Setup

### Dependencies

```bash
cd backend
mvn dependency:go-offline
```

### Environment

Copy the default properties:

```bash
cp src/main/resources/application.properties src/main/resources/application-local.properties
```

Edit `application-local.properties` if needed. Defaults work with Docker Compose PostgreSQL.

### Run

```bash
# Option 1: Maven
mvn spring-boot:run

# Option 2: IDE
# Open backend/ as a project in IntelliJ IDEA
# Run JvmExplorerApplication
```

The backend starts on `http://localhost:8080`.

### Build

```bash
mvn package -DskipTests
```

---

## Frontend Setup

### Dependencies

```bash
cd frontend
npm install
```

### Environment

Create `.env.local`:

```env
VITE_API_URL=http://localhost:8080
VITE_WS_URL=http://localhost:8080/ws
```

### Run

```bash
npm run dev
```

The frontend starts on `http://localhost:5173`.

### Build

```bash
npm run build
```

Output is in `frontend/dist/`.

---

## Database

### Start PostgreSQL

```bash
docker compose up -d postgres
```

Connection details:
- Host: `localhost`
- Port: `5432`
- Database: `jvmexplorer`
- Username: `jvmexplorer`
- Password: `jvmexplorer`

Flyway migrations run automatically on backend startup.

### Reset Database

```bash
docker compose down -v
docker compose up -d postgres
```

---

## Full Stack with Docker Compose

```bash
# Build and start everything
docker compose up --build

# Backend: http://localhost:8080
# Frontend: http://localhost:5173
# PostgreSQL: localhost:5432
```

---

## Testing

### Backend Tests

```bash
cd backend
mvn test
```

### Frontend Build Check

```bash
cd frontend
npm run build  # TypeScript check + Vite build
```

---

## Running Specific Components

### Only Backend + Database

```bash
docker compose up -d postgres
cd backend && mvn spring-boot:run
```

### Only Frontend (with remote API)

```bash
cd frontend
VITE_API_URL=https://api.yourdomain.com npm run dev
```

---

## Common Issues

### JAVA_HOME not set

```bash
export JAVA_HOME=/path/to/jdk-21
```

### Port already in use

```bash
# Change backend port
SERVER_PORT=8081 mvn spring-boot:run

# Change frontend port
npm run dev -- --port 3000
```

### Flyway migration errors

```bash
# Reset database
docker compose down -v
docker compose up -d postgres
# Restart backend
```

### WebSocket connection fails

Ensure the frontend `VITE_WS_URL` matches the backend URL. For development, both should be `localhost:8080`.

---

## Project Conventions

### Code Style
- Backend: Standard Java conventions, no Checkstyle yet
- Frontend: ESLint + Prettier (config in `frontend/`)

### Git
- Commit messages: `Phase N TASK-NNN: description`
- Branch from `main` for features
- PRs squash-merged to `main`

### Package Structure (Backend)

```
com.jvmexplorer/
├── auth/          # JWT authentication
├── compilation/   # Java Compiler API
├── config/        # WebSocket, Security, Filters
├── execution/     # Sandboxed execution
├── instrumentation/ # MXBean monitoring
├── user/          # User & Snippet entities
└── ws/            # WebSocket engine
```
