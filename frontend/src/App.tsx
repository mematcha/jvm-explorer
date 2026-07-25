import { useEffect } from 'react';
import { AuthPage } from './components/AuthPage';
import { JvmDashboard } from './components/JvmDashboard';
import { useStore } from './stores/appStore';
import { connectWebSocket, disconnectWebSocket } from './services/websocket';

export default function App() {
  const user = useStore((s) => s.user);
  const token = useStore((s) => s.token);

  useEffect(() => {
    if (token && !user) {
      fetchUser();
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      connectWebSocket();
    }
    return () => {
      disconnectWebSocket();
    };
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
    return <AuthPage onSuccess={() => {}} />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>JVM Explorer</h1>
        <span className="user-info">{user.username}</span>
        <button onClick={() => useStore.getState().logout()}>Logout</button>
      </header>
      <main className="app-main">
        <JvmDashboard />
      </main>
    </div>
  );
}
