import { useState, useEffect } from 'react';
import { useStore } from '../stores/appStore';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080';

interface GallerySnippet {
  id: number;
  title: string;
  code: string;
  shareId: string;
  createdAt: string;
}

export function PublicGallery() {
  const [snippets, setSnippets] = useState<GallerySnippet[]>([]);
  const [loading, setLoading] = useState(true);
  const setCode = useStore((s) => s.setCode);

  useEffect(() => {
    fetch(`${API_BASE}/api/snippets/public`)
      .then((r) => r.json())
      .then((data) => setSnippets(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="gallery"><p className="muted">Loading gallery...</p></div>;

  return (
    <div className="gallery">
      <h3>Public Gallery</h3>
      {snippets.length === 0 && <p className="muted">No shared snippets yet. Share one from the editor!</p>}
      <div className="gallery-grid">
        {snippets.map((s) => (
          <div key={s.id} className="gallery-card">
            <h4>{s.title}</h4>
            <pre className="gallery-code">{s.code.slice(0, 200)}{s.code.length > 200 ? '...' : ''}</pre>
            <div className="gallery-footer">
              <span className="gallery-date">
                {new Date(s.createdAt).toLocaleDateString()}
              </span>
              <div className="gallery-actions">
                <button onClick={() => setCode(s.code)}>Load</button>
                <button onClick={() => window.open(`/shared/${s.shareId}`, '_blank')}>Open</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
