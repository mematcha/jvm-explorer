import { useStore } from '../stores/appStore';

export function OutputPanel() {
  const compilationResult = useStore((s) => s.compilationResult);
  const executionResult = useStore((s) => s.executionResult);

  return (
    <div className="output-panel">
      <div className="output-section">
        <h3>Compilation</h3>
        {!compilationResult && <p className="muted">Run your code to see compilation output</p>}
        {compilationResult?.errors?.map((e, i) => (
          <p key={i} className="error">✗ {e}</p>
        ))}
        {compilationResult?.warnings?.map((w, i) => (
          <p key={i} className="warning">⚠ {w}</p>
        ))}
        {compilationResult?.success && <p className="success">✓ Compilation successful</p>}
      </div>

      <div className="output-section">
        <h3>Execution</h3>
        {!executionResult && <p className="muted">Output will appear here</p>}
        {executionResult?.stdout && (
          <pre className="stdout">{executionResult.stdout}</pre>
        )}
        {executionResult?.stderr && (
          <pre className="stderr">{executionResult.stderr}</pre>
        )}
        {executionResult && (
          <p className="meta">
            Exit code: {executionResult.exitCode} | Duration: {executionResult.durationMs}ms
          </p>
        )}
      </div>
    </div>
  );
}
