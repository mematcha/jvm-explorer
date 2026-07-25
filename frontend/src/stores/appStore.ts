import { create } from 'zustand';
import type { User, JvmSnapshot, CompilationResult, ExecutionResult } from '../types';

interface AppState {
  user: User | null;
  token: string | null;
  snapshot: JvmSnapshot | null;
  compilationResult: CompilationResult | null;
  executionResult: ExecutionResult | null;
  code: string;
  connected: boolean;

  setUser: (user: User | null, token: string | null) => void;
  setSnapshot: (snapshot: JvmSnapshot) => void;
  setCompilationResult: (result: CompilationResult) => void;
  setExecutionResult: (result: ExecutionResult) => void;
  setCode: (code: string) => void;
  setConnected: (connected: boolean) => void;
  logout: () => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  snapshot: null,
  compilationResult: null,
  executionResult: null,
  code: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, JVM Explorer!");\n    }\n}`,
  connected: false,

  setUser: (user, token) => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
    set({ user, token });
  },

  setSnapshot: (snapshot) => set({ snapshot }),
  setCompilationResult: (result) => set({ compilationResult: result }),
  setExecutionResult: (result) => set({ executionResult: result }),
  setCode: (code) => set({ code }),
  setConnected: (connected) => set({ connected }),
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },
}));
