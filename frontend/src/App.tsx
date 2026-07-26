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

export default function App() {
  const user = useStore((s) => s.user);
  const token = useStore((s) => s.token);
  const snapshot = useStore((s) => s.snapshot);
  const [leftWidth, setLeftWidth] = useState(50);
  const [dragging, setDragging] = useState(false);
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

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => {
      const pct = (e.clientX / window.innerWidth) * 100;
      setLeftWidth(Math.min(Math.max(pct, 25), 75));
    };
    const onUp = () => setDragging(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [dragging]);

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
        {snapshot && <button className="clear-btn" onClick={clearData}>Clear</button>}
        <button onClick={() => useStore.getState().logout()}>Logout</button>
      </header>
      <div className="app-body" style={{ cursor: dragging ? 'col-resize' : undefined }}>
        <div className="left-panel" style={{ width: `${leftWidth}%` }}>
          <CodeEditor />
          <OutputPanel />
        </div>
        <div className="drag-handle" onMouseDown={() => setDragging(true)} />
        <div className="right-panel">
          <div className="viz-row"><JvmDashboard /></div>
          <div className="viz-row"><BytecodeExplorer /></div>
          <div className="viz-row"><StackHeapVisualizer /></div>
          <div className="viz-row"><ThreadExplorer /></div>
          <div className="viz-row"><GcExplorer /></div>
          <div className="viz-row"><ClassLoaderExplorer /></div>
          <div className="viz-row"><MemoryExplorer /></div>
          <div className="viz-row"><SyncLab /></div>
          <div className="viz-row"><CollectionsExplorer /></div>
          <div className="viz-row"><ExceptionExplorer /></div>
          <div className="viz-row"><LearningLab /></div>
          <div className="viz-row"><PublicGallery /></div>
        </div>
      </div>
    </div>
  );
}
