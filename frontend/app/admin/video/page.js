'use client';
import { useState, useEffect, useCallback } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5006/api';

function authHeaders() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : '';
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
}

function parseYouTubeId(input) {
  if (!input) return '';
  // Full URL formats
  const patterns = [
    /[?&]v=([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /embed\/([a-zA-Z0-9_-]{11})/,
    /shorts\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = input.match(p);
    if (m) return m[1];
  }
  // Plain ID (11 chars)
  if (/^[a-zA-Z0-9_-]{11}$/.test(input.trim())) return input.trim();
  return input.trim();
}

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="font-extrabold text-gray-900 text-lg">{title}</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
      </div>
    </div>
  );
}

const base = "w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all";

export default function AdminVideos() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ title: '', youtube_url: '', description: '', sort_order: 0 });
  const [preview, setPreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(() => {
    setLoading(true);
    fetch(`${API_URL}/admin/videos`, { headers: authHeaders() })
      .then((r) => r.json())
      .then(setRows)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const openCreate = () => {
    setForm({ title: '', youtube_url: '', description: '', sort_order: 0 });
    setPreview('');
    setError('');
    setModal({ mode: 'create' });
  };

  const openEdit = (row) => {
    setForm({ title: row.title, youtube_url: row.youtube_id, description: row.description || '', sort_order: row.sort_order || 0 });
    setPreview(row.youtube_id);
    setError('');
    setModal({ mode: 'edit', id: row.id });
  };

  const handleUrlChange = (val) => {
    setForm((f) => ({ ...f, youtube_url: val }));
    setPreview(parseYouTubeId(val));
  };

  const save = async () => {
    const youtube_id = parseYouTubeId(form.youtube_url);
    if (!form.title || !youtube_id) { setError('Vui lòng điền tiêu đề và link YouTube'); return; }
    setSaving(true);
    setError('');
    try {
      const payload = { title: form.title, youtube_id, thumbnail: `https://img.youtube.com/vi/${youtube_id}/hqdefault.jpg`, description: form.description, sort_order: Number(form.sort_order) || 0 };
      const url = modal.mode === 'create' ? `${API_URL}/admin/videos` : `${API_URL}/admin/videos/${modal.id}`;
      const method = modal.mode === 'create' ? 'POST' : 'PUT';
      const res = await fetch(url, { method, headers: authHeaders(), body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Lỗi lưu dữ liệu');
      setModal(null);
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const del = async (id) => {
    if (!confirm('Xác nhận xóa video này?')) return;
    await fetch(`${API_URL}/admin/videos/${id}`, { method: 'DELETE', headers: authHeaders() });
    load();
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Video bài giảng</h1>
          <p className="text-gray-500 text-sm mt-0.5">{rows.length} video</p>
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-lg text-sm transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          Thêm video
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : rows.length === 0 ? (
          <div className="text-center py-16 text-gray-400">Chưa có video nào</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {rows.map((row, i) => (
              <div key={row.id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50">
                <span className="text-gray-400 text-xs w-5">{i + 1}</span>
                <img src={`https://img.youtube.com/vi/${row.youtube_id}/mqdefault.jpg`} alt="" className="w-24 h-14 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">{row.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">ID: {row.youtube_id}</p>
                  {row.description && <p className="text-xs text-gray-400 truncate">{row.description}</p>}
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <a href={`https://www.youtube.com/watch?v=${row.youtube_id}`} target="_blank" rel="noopener noreferrer"
                    className="text-gray-400 hover:text-red-600 text-xs px-2 py-1.5 rounded-lg hover:bg-red-50 transition-colors">
                    Xem
                  </a>
                  <button onClick={() => openEdit(row)}
                    className="text-blue-600 hover:text-blue-700 font-semibold text-xs px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">
                    Sửa
                  </button>
                  <button onClick={() => del(row.id)}
                    className="text-red-600 hover:text-red-700 font-semibold text-xs px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors">
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {modal && (
        <Modal title={modal.mode === 'create' ? 'Thêm video mới' : 'Sửa video'} onClose={() => setModal(null)}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tiêu đề <span className="text-red-500">*</span></label>
              <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="VD: Bài giảng HSK 1 – Phát âm cơ bản" className={base} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Link YouTube <span className="text-red-500">*</span></label>
              <input value={form.youtube_url} onChange={(e) => handleUrlChange(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=... hoặc https://youtu.be/..." className={base} />
              {preview && (
                <div className="mt-2 rounded-lg overflow-hidden border border-gray-200">
                  <img src={`https://img.youtube.com/vi/${preview}/mqdefault.jpg`} alt="preview" className="w-full h-36 object-cover" />
                  <p className="text-xs text-gray-400 px-3 py-1.5">ID: {preview}</p>
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mô tả</label>
              <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Nội dung video..." rows={3} className={base + ' resize-y'} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Thứ tự hiển thị</label>
              <input type="number" value={form.sort_order} onChange={(e) => setForm((f) => ({ ...f, sort_order: e.target.value }))}
                placeholder="0" className={base} />
            </div>
            {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">{error}</div>}
            <div className="flex gap-3 pt-2">
              <button onClick={save} disabled={saving}
                className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-bold py-2.5 rounded-lg text-sm transition-colors">
                {saving ? 'Đang lưu...' : 'Lưu'}
              </button>
              <button onClick={() => setModal(null)}
                className="px-6 border border-gray-300 text-gray-700 font-semibold py-2.5 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                Hủy
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
