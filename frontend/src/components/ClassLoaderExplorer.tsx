import { useStore } from '../stores/appStore';

export function ClassLoaderExplorer() {
  const snapshot = useStore((s) => s.snapshot);

  if (!snapshot) return <div className="visualizer"><p className="muted">Waiting for data...</p></div>;

  return (
    <div className="classloader-explorer">
      <h3>Class Loaders</h3>
      <div className="classloader-tree">
        {snapshot.classLoaders.map((cl, i) => (
          <div key={i} className="classloader-node" style={{ marginLeft: `${i * 24}px` }}>
            <div className="node-connector" />
            <div className="node-card">
              <div className="node-header">
                <span className="node-name">{cl.name}</span>
                <span className="node-classes">{cl.loadedClasses} classes</span>
              </div>
              <div className="node-meta">
                Unloaded: {cl.unloadedClasses}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
