import { useState } from 'react';
import { api } from '../services/api';
import { useStore } from '../stores/appStore';

interface AuthPageProps {
  onSuccess: () => void;
}

export function AuthPage({ onSuccess }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const setUser = useStore((s) => s.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = isLogin
        ? await api.login(username, password)
        : await api.register(username, email, password);

      setUser({ username: res.username, email: res.email } as never, res.token);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>JVM Explorer</h1>
        <h2>{isLogin ? 'Sign In' : 'Create Account'}</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {!isLogin && (
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          )}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">{isLogin ? 'Sign In' : 'Register'}</button>
        </form>

        <p className="toggle" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Register" : 'Already have an account? Sign In'}
        </p>
      </div>
    </div>
  );
}
