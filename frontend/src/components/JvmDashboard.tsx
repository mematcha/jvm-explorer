import { useStore } from '../stores/appStore';

export function JvmDashboard() {
  const snapshot = useStore((s) => s.snapshot);

  if (!snapshot) {
    return <div className="dashboard"><p>Waiting for JVM data...</p></div>;
  }

  const heapMb = (bytes: number) => (bytes / 1024 / 1024).toFixed(1);

  return (
    <div className="dashboard">
      <div className="metric-card">
        <h3>Heap Memory</h3>
        <p className="value">{heapMb(snapshot.heap.usedBytes)} MB</p>
        <p className="sub">of {heapMb(snapshot.heap.maxBytes)} MB</p>
      </div>

      <div className="metric-card">
        <h3>Threads</h3>
        <p className="value">{snapshot.threads.length}</p>
        <p className="sub">
          {snapshot.threads.filter((t) => t.state === 'RUNNABLE').length} running
        </p>
      </div>

      <div className="metric-card">
        <h3>GC Collections</h3>
        <p className="value">{snapshot.gc.collectionCount}</p>
        <p className="sub">{snapshot.gc.collectionTimeMs} ms total</p>
      </div>

      <div className="metric-card">
        <h3>Loaded Classes</h3>
        <p className="value">{snapshot.classLoaders[2]?.loadedClasses ?? 0}</p>
        <p className="sub">Application class loader</p>
      </div>
    </div>
  );
}
