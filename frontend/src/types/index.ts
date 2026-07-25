export interface User {
  id: number;
  username: string;
  email: string;
  displayName?: string;
}

export interface AuthResponse {
  token: string;
  username: string;
  email: string;
}

export interface JvmSnapshot {
  heap: HeapSnapshot;
  threads: ThreadSnapshot[];
  classLoaders: ClassLoaderSnapshot[];
  gc: GcSnapshot;
  jit: JitSnapshot;
  timestamp: number;
}

export interface HeapSnapshot {
  usedBytes: number;
  maxBytes: number;
  committedBytes: number;
  pendingFinalization: number;
  pools: MemoryPoolSnapshot[];
}

export interface MemoryPoolSnapshot {
  name: string;
  type: string;
  used: number;
  max: number;
  committed: number;
}

export interface ThreadSnapshot {
  id: number;
  name: string;
  state: string;
  stackTrace: string;
  isVirtual: boolean;
  lockInfo: string;
}

export interface ClassLoaderSnapshot {
  name: string;
  isVisible: boolean;
  loadedClasses: number;
  unloadedClasses: number;
  classNames: string[];
}

export interface GcSnapshot {
  collectionCount: number;
  collectionTimeMs: number;
  recentGCs: GcInfo[];
}

export interface GcInfo {
  name: string;
  count: number;
  timeMs: number;
  isConcurrent: boolean;
}

export interface JitSnapshot {
  totalCompilationTimeMs: number;
  isCompilationEnabled: boolean;
  compilerName: string;
}

export interface CompilationResult {
  success: boolean;
  classBytes: Record<string, string>;
  errors: string[];
  warnings: string[];
}

export interface ExecutionResult {
  success: boolean;
  stdout: string;
  stderr: string;
  exitCode: number;
  durationMs: number;
  errors: string[];
}

export interface WsMessage {
  type: string;
  payload: unknown;
}
