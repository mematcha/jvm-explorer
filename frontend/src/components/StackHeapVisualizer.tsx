import { useStore } from '../stores/appStore';

export function StackHeapVisualizer() {
  const snapshot = useStore((s) => s.snapshot);

  if (!snapshot) {
    return <div className="visualizer"><p className="muted">Waiting for execution data...</p></div>;
  }

  const heapMb = (b: number) => (b / 1048576).toFixed(1);
  const heapPercent = snapshot.heap.maxBytes > 0
    ? (snapshot.heap.usedBytes / snapshot.heap.maxBytes * 100).toFixed(1)
    : '0';

  return (
    <div className="stack-heap-visualizer">
      <h3>Stack & Heap</h3>

      <div className="viz-section">
        <h4>Threads ({snapshot.threads.length})</h4>
        <div className="stack-frames">
          {snapshot.threads.slice(0, 5).map((t) => (
            <div key={t.id} className="stack-frame">
              <div className="frame-header">
                <span className={t.state.toLowerCase()}>{t.state}</span>
                <span>{t.name}</span>
              </div>
              <pre className="frame-stack">{t.stackTrace.split('\n').slice(0, 3).join('\n')}</pre>
            </div>
          ))}
        </div>
      </div>

      <div className="viz-section">
        <h4>Heap Memory</h4>
        <div className="heap-bar">
          <div className="heap-bar-fill" style={{ width: `${Math.min(+heapPercent, 100)}%` }} />
        </div>
        <div className="heap-stats">
          <span>Used: {heapMb(snapshot.heap.usedBytes)} MB</span>
          <span>Max: {heapMb(snapshot.heap.maxBytes)} MB</span>
        </div>

        <div className="memory-pools">
          {snapshot.heap.pools.slice(0, 4).map((pool) => (
            <div key={pool.name} className="pool-item">
              <span className="pool-name">{pool.name}</span>
              <span className="pool-value">{heapMb(pool.used)} MB</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
