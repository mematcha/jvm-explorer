import { useStore } from '../stores/appStore';

export function GcExplorer() {
  const snapshot = useStore((s) => s.snapshot);

  if (!snapshot) return <div className="visualizer"><p className="muted">Waiting for data...</p></div>;

  return (
    <div className="gc-explorer">
      <h3>Garbage Collection</h3>

      <div className="gc-gen-container">
        <div className="gc-gen young">
          <h4>Young Generation</h4>
          <div className="gc-bar">
            <div className="gc-bar-fill eden" style={{ width: '60%' }} />
            <div className="gc-bar-fill s0" style={{ width: '15%' }} />
            <div className="gc-bar-fill s1" style={{ width: '15%' }} />
          </div>
          <div className="gc-labels">
            <span>Eden</span>
            <span>S0</span>
            <span>S1</span>
          </div>
        </div>

        <div className="gc-gen old">
          <h4>Old Generation</h4>
          <div className="gc-bar">
            <div className="gc-bar-fill old-fill" style={{ width: `${Math.min(snapshot.heap.usedBytes / snapshot.heap.maxBytes * 100, 100)}%` }} />
          </div>
          <div className="gc-labels">
            <span>{(snapshot.heap.usedBytes / 1048576).toFixed(1)} MB / {(snapshot.heap.maxBytes / 1048576).toFixed(1)} MB</span>
          </div>
        </div>
      </div>

      <div className="gc-stats">
        <div className="gc-stat">
          <span className="stat-label">Total Collections</span>
          <span className="stat-value">{snapshot.gc.collectionCount}</span>
        </div>
        <div className="gc-stat">
          <span className="stat-label">Total Time</span>
          <span className="stat-value">{snapshot.gc.collectionTimeMs} ms</span>
        </div>
      </div>

      {snapshot.gc.recentGCs.map((gc, i) => (
        <div key={i} className="gc-event">
          <span className="gc-event-name">{gc.name}</span>
          <span className="gc-event-count">{gc.count} collections</span>
          <span className="gc-event-time">{gc.timeMs}ms</span>
        </div>
      ))}
    </div>
  );
}
