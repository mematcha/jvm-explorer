import { useStore } from '../stores/appStore';

export function ThreadExplorer() {
  const snapshot = useStore((s) => s.snapshot);

  if (!snapshot) return <div className="visualizer"><p className="muted">Waiting for data...</p></div>;

  return (
    <div className="thread-explorer">
      <h3>Thread Explorer ({snapshot.threads.length} threads)</h3>
      <div className="thread-timeline">
        {snapshot.threads.map((t) => (
          <div key={t.id} className="thread-row">
            <div className="thread-info">
              <span className={`thread-state ${t.state.toLowerCase()}`}>{t.state}</span>
              <span className="thread-name">{t.name}</span>
              <span className="thread-id">#{t.id}</span>
            </div>
            <div className="thread-bar-container">
              <div className={`thread-bar ${t.state.toLowerCase()}`} style={{ width: t.state === 'RUNNABLE' ? '80%' : t.state === 'BLOCKED' ? '30%' : '50%' }} />
            </div>
            {t.lockInfo && <div className="thread-lock">Lock: {t.lockInfo}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
