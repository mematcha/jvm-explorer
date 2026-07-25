import { useState, useEffect } from 'react';
import { AuthPage } from './components/AuthPage';
import { JvmDashboard } from './components/JvmDashboard';
import { CodeEditor } from './components/CodeEditor';
import { OutputPanel } from './components/OutputPanel';
import { BytecodeExplorer } from './components/BytecodeExplorer';
import { StackHeapVisualizer } from './components/StackHeapVisualizer';
import { ClassLoaderExplorer } from './components/ClassLoaderExplorer';
import { ThreadExplorer } from './components/ThreadExplorer';
import { GcExplorer } from './components/GcExplorer';
import { MemoryExplorer } from './components/MemoryExplorer';
import { useStore } from './stores/appStore';
import { connectWebSocket, disconnectWebSocket } from './services/websocket';

type Tab = 'dashboard' | 'bytecode' | 'stackheap' | 'classloader' | 'threads' | 'gc' | 'memory';

export default function App() {
  const user = useStore((s) => s.user);
  const token = useStore((s) => s.token);
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  useEffect(() => {
    if (token && !user) fetchUser();
  }, [token]);

  useEffect(() => {
    if (user) connectWebSocket();
    return () => { disconnectWebSocket(); };
  }, [user]);

  async function fetchUser() {
    try {
      const res = await fetch('http://localhost:8080/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        useStore.getState().setUser(data, token!);
      }
    } catch {
      useStore.getState().logout();
    }
  }

  if (!user) {
    return <AuthPage onSuccess={() => fetchUser()} />;
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: 'dashboard', label: 'JVM' },
    { key: 'bytecode', label: 'Bytecode' },
    { key: 'stackheap', label: 'Stack/Heap' },
    { key: 'threads', label: 'Threads' },
    { key: 'gc', label: 'GC' },
    { key: 'classloader', label: 'Classes' },
    { key: 'memory', label: 'Memory' },
  ];

  return (
    <div className="app">
      <header className="app-header">
        <h1>JVM Explorer</h1>
        <span className="user-info">{user.username}</span>
        <button onClick={() => useStore.getState().logout()}>Logout</button>
      </header>
      <div className="app-body">
        <div className="left-panel">
          <CodeEditor />
          <OutputPanel />
        </div>
        <div className="right-panel">
          <div className="right-panel-tabs">
            {tabs.map((t) => (
              <button key={t.key} className={activeTab === t.key ? 'active' : ''} onClick={() => setActiveTab(t.key)}>{t.label}</button>
            ))}
          </div>
          <div className="right-panel-content">
            {activeTab === 'dashboard' && <JvmDashboard />}
            {activeTab === 'bytecode' && <BytecodeExplorer />}
            {activeTab === 'stackheap' && <StackHeapVisualizer />}
            {activeTab === 'threads' && <ThreadExplorer />}
            {activeTab === 'gc' && <GcExplorer />}
            {activeTab === 'classloader' && <ClassLoaderExplorer />}
            {activeTab === 'memory' && <MemoryExplorer />}
          </div>
        </div>
      </div>
    </div>
  );
}
