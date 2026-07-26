import { useState, useEffect, useRef, useCallback } from 'react';
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
import { SyncLab } from './components/SyncLab';
import { CollectionsExplorer } from './components/CollectionsExplorer';
import { ExceptionExplorer } from './components/ExceptionExplorer';
import { LearningLab } from './components/LearningLab';
import { PublicGallery } from './components/PublicGallery';
import { useStore } from './stores/appStore';
import { connectWebSocket, disconnectWebSocket } from './services/websocket';

type Tab = 'dashboard' | 'bytecode' | 'stackheap' | 'classloader' | 'threads' | 'gc' | 'memory' | 'sync' | 'collections' | 'exceptions' | 'learn' | 'gallery';

export default function App() {
  const user = useStore((s) => s.user);
  const token = useStore((s) => s.token);
  const snapshot = useStore((s) => s.snapshot);
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const inactivityRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const clearData = useCallback(() => {
    useStore.getState().clearData();
    disconnectWebSocket();
  }, []);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityRef.current) clearTimeout(inactivityRef.current);
    inactivityRef.current = setTimeout(() => {
      clearData();
    }, 5 * 60 * 1000);
  }, [clearData]);

  useEffect(() => {
    if (token && !user) fetchUser();
  }, [token]);

  useEffect(() => {
    if (user) {
      connectWebSocket();
      resetInactivityTimer();
      const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'] as const;
      events.forEach((e) => window.addEventListener(e, resetInactivityTimer));
      const onUnload = () => clearData();
      window.addEventListener('beforeunload', onUnload);
      return () => {
        disconnectWebSocket();
        if (inactivityRef.current) clearTimeout(inactivityRef.current);
        events.forEach((e) => window.removeEventListener(e, resetInactivityTimer));
        window.removeEventListener('beforeunload', onUnload);
      };
    }
  }, [user, resetInactivityTimer, clearData]);

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
    { key: 'sync', label: 'Sync' },
    { key: 'gc', label: 'GC' },
    { key: 'collections', label: 'Collections' },
    { key: 'exceptions', label: 'Exceptions' },
    { key: 'classloader', label: 'Classes' },
    { key: 'memory', label: 'Memory' },
    { key: 'learn', label: 'Learn' },
    { key: 'gallery', label: 'Gallery' },
  ];

  return (
    <div className="app">
      <header className="app-header">
        <h1>JVM Explorer</h1>
        <span className="user-info">{user.username}</span>
        {snapshot && <button className="clear-btn" onClick={clearData}>Clear</button>}
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
            {activeTab === 'sync' && <SyncLab />}
            {activeTab === 'collections' && <CollectionsExplorer />}
            {activeTab === 'exceptions' && <ExceptionExplorer />}
            {activeTab === 'learn' && <LearningLab />}
            {activeTab === 'gallery' && <PublicGallery />}
          </div>
        </div>
      </div>
    </div>
  );
}
