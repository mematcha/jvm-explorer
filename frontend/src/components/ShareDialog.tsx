import { useState } from 'react';
import { useStore } from '../stores/appStore';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export function ShareDialog({ onClose }: { onClose: () => void }) {
  const code = useStore((s) => s.code);
  const token = useStore((s) => s.token);
  const [title, setTitle] = useState('My Snippet');
  const [isPublic, setIsPublic] = useState(true);
  const [shareUrl, setShareUrl] = useState('');
  const [error, setError] = useState('');

  const handleShare = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/snippets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, code, isPublic }),
      });
      if (!res.ok) throw new Error('Share failed');
      const data = await res.json();
      setShareUrl(`${window.location.origin}/shared/${data.shareId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to share');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Share Snippet</h3>

        {!shareUrl ? (
          <>
            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label className="checkbox-label">
              <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />
              Public (visible in gallery)
            </label>
            {error && <p className="error">{error}</p>}
            <div className="modal-actions">
              <button onClick={onClose}>Cancel</button>
              <button className="primary" onClick={handleShare}>Share</button>
            </div>
          </>
        ) : (
          <div className="share-result">
            <p>Shared! Copy the link:</p>
            <input readOnly value={shareUrl} onClick={(e) => (e.target as HTMLInputElement).select()} />
            <button className="primary" onClick={() => navigator.clipboard.writeText(shareUrl)}>Copy Link</button>
            <button onClick={onClose}>Done</button>
          </div>
        )}
      </div>
    </div>
  );
}
