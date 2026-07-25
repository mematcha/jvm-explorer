const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080';

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(body || res.statusText);
  }
  return res.json();
}

export const api = {
  login: (username: string, password: string) =>
    request<{ token: string; username: string; email: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),

  register: (username: string, email: string, password: string) =>
    request<{ token: string; username: string; email: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    }),

  compile: (className: string, sourceCode: string) =>
    request<{ success: boolean; errors: string[]; warnings: string[] }>('/api/compile', {
      method: 'POST',
      body: JSON.stringify({ className, sourceCode }),
    }),

  execute: (className: string, sourceCode: string, args: string[] = []) =>
    request<{ success: boolean; stdout: string; stderr: string; exitCode: number; durationMs: number }>(
      '/api/execute',
      { method: 'POST', body: JSON.stringify({ className, sourceCode, args, timeoutMs: 30000 }) }
    ),

  getSnapshot: () =>
    request<unknown>('/api/instrumentation/snapshot'),

  disassemble: (className: string, sourceCode: string) =>
    request<{ success: boolean; classes: { name: string; bytecode: string }[]; errors: string[] }>(
      '/api/bytecode',
      { method: 'POST', body: JSON.stringify({ className, sourceCode }) }
    ),
};
