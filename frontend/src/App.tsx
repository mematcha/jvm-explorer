import { useState, useEffect } from 'react';
import { AuthPage } from './components/AuthPage';
import { JvmDashboard } from './components/JvmDashboard';
import { CodeEditor } from './components/CodeEditor';
import { OutputPanel } from './components/OutputPanel';
import { BytecodeExplorer } from './components/BytecodeExplorer';
import { StackHeapVisualizer } from './components/StackHeapVisualizer';
import { useStore } from './stores/appStore';
import { connectWebSocket, disconnectWebSocket } from './services/websocket';

type Tab = 'dashboard' | 'bytecode' | 'stackheap';

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
            <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>JVM</button>
            <button className={activeTab === 'bytecode' ? 'active' : ''} onClick={() => setActiveTab('bytecode')}>Bytecode</button>
            <button className={activeTab === 'stackheap' ? 'active' : ''} onClick={() => setActiveTab('stackheap')}>Stack/Heap</button>
          </div>
          <div className="right-panel-content">
            {activeTab === 'dashboard' && <JvmDashboard />}
            {activeTab === 'bytecode' && <BytecodeExplorer />}
            {activeTab === 'stackheap' && <StackHeapVisualizer />}
          </div>
        </div>
      </div>
    </div>
  );
}
