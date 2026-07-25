import { useStore } from '../stores/appStore';

export function MemoryExplorer() {
  const snapshot = useStore((s) => s.snapshot);

  if (!snapshot) return <div className="visualizer"><p className="muted">Waiting for data...</p></div>;

  const heapMb = (b: number) => (b / 1048576).toFixed(1);

  return (
    <div className="memory-explorer">
      <h3>JVM Memory</h3>

      <div className="memory-summary">
        <div className="mem-row">
          <span>Heap</span>
          <span>{heapMb(snapshot.heap.usedBytes)} MB / {heapMb(snapshot.heap.maxBytes)} MB</span>
        </div>
        <div className="mem-row">
          <span>Committed</span>
          <span>{heapMb(snapshot.heap.committedBytes)} MB</span>
        </div>
        <div className="mem-row">
          <span>Pending Finalization</span>
          <span>{snapshot.heap.pendingFinalization}</span>
        </div>
      </div>

      <h4>Memory Pools</h4>
      {snapshot.heap.pools.map((pool) => (
        <div key={pool.name} className="pool-row">
          <div className="pool-header">
            <span>{pool.name}</span>
            <span>{heapMb(pool.used)} / {heapMb(pool.max)} MB</span>
          </div>
          <div className="pool-bar-bg">
            <div className="pool-bar-fill" style={{
              width: `${pool.max > 0 ? (pool.used / pool.max * 100) : 0}%`
            }} />
          </div>
        </div>
      ))}

      <h4>JIT Compilation</h4>
      <div className="jit-info">
        <div className="mem-row">
          <span>Compiler</span>
          <span>{snapshot.jit.compilerName}</span>
        </div>
        <div className="mem-row">
          <span>Total Compilation Time</span>
          <span>{snapshot.jit.totalCompilationTimeMs} ms</span>
        </div>
      </div>
    </div>
  );
}
