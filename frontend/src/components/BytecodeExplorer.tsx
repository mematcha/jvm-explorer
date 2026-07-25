import { useState } from 'react';
import { useStore } from '../stores/appStore';
import { api } from '../services/api';

export function BytecodeExplorer() {
  const code = useStore((s) => s.code);
  const [bytecode, setBytecode] = useState<{ name: string; bytecode: string }[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const className = code.match(/public\s+(?:class|record)\s+(\w+)/)?.[1] || 'Main';

  const handleDisassemble = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await api.disassemble(className, code);
      if (result.success) {
        setBytecode(result.classes);
      } else {
        setError(result.errors.join('\n'));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Disassembly failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bytecode-explorer">
      <div className="explorer-toolbar">
        <h3>Bytecode</h3>
        <button onClick={handleDisassemble} disabled={loading}>
          {loading ? 'Disassembling...' : '▶ Disassemble'}
        </button>
      </div>
      <div className="bytecode-content">
        {error && <p className="error">{error}</p>}
        {bytecode?.map((cls) => (
          <div key={cls.name} className="bytecode-class">
            <h4>{cls.name}</h4>
            <pre>{cls.bytecode}</pre>
          </div>
        ))}
        {!bytecode && !error && <p className="muted">Click "Disassemble" to view bytecode</p>}
      </div>
    </div>
  );
}
