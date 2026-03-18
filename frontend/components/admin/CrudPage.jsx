'use client';
import { useState, useEffect, useCallback } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5006/api';

function authHeaders() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : '';
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
}

// ── Modal ────────────────────────────────────────────────────────────────────

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
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

// ── Field renderer ────────────────────────────────────────────────────────────

function FormField({ field, value, onChange }) {
  const base = "w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all";

  if (field.type === 'textarea') return (
    <textarea rows={4} value={value || ''} onChange={(e) => onChange(e.target.value)}
      placeholder={field.placeholder} className={base + ' resize-y'} />
  );
  if (field.type === 'select') return (
    <select value={value || ''} onChange={(e) => onChange(e.target.value)} className={base}>
      <option value="">-- Chọn --</option>
      {field.options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
  if (field.type === 'checkbox') return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 accent-red-600" />
      <span className="text-sm text-gray-700">{field.checkLabel}</span>
    </label>
  );
  return (
    <input type={field.type || 'text'} value={value || ''} onChange={(e) => onChange(e.target.value)}
      placeholder={field.placeholder} className={base} />
  );
}

// ── Main CrudPage ─────────────────────────────────────────────────────────────

export default function CrudPage({ title, endpoint, fields, columns, rowLabel, defaultSort }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // null | { mode:'create'|'edit', data:{} }
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const load = useCallback(() => {
    setLoading(true);
    fetch(`${API_URL}/admin/${endpoint}`, { headers: authHeaders() })
      .then((r) => r.json())
      .then(setRows)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [endpoint]);

  useEffect(() => { load(); }, [load]);

  const openCreate = () => {
    const defaults = {};
    fields.forEach((f) => { defaults[f.key] = f.default ?? ''; });
    setFormData(defaults);
    setError('');
    setModal({ mode: 'create' });
  };

  const openEdit = (row) => {
    setFormData({ ...row });
    setError('');
    setModal({ mode: 'edit', id: row.id });
  };

  const save = async () => {
    setSaving(true);
    setError('');
    try {
      const url = modal.mode === 'create'
        ? `${API_URL}/admin/${endpoint}`
        : `${API_URL}/admin/${endpoint}/${modal.id}`;
      const method = modal.mode === 'create' ? 'POST' : 'PUT';
      const res = await fetch(url, { method, headers: authHeaders(), body: JSON.stringify(formData) });
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
    if (!confirm(`Xác nhận xóa ${rowLabel || 'mục này'}?`)) return;
    await fetch(`${API_URL}/admin/${endpoint}/${id}`, { method: 'DELETE', headers: authHeaders() });
    load();
  };

  const filtered = rows.filter((row) => {
    if (!search) return true;
    return columns.some((col) => String(row[col.key] || '').toLowerCase().includes(search.toLowerCase()));
  });

  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">{title}</h1>
          <p className="text-gray-500 text-sm mt-0.5">{rows.length} mục</p>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 px-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-red-500 w-48"
          />
          <button onClick={openCreate}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-lg text-sm transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Thêm mới
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">Không có dữ liệu</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase w-10">#</th>
                  {columns.map((col) => (
                    <th key={col.key} className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase whitespace-nowrap">{col.label}</th>
                  ))}
                  <th className="text-right px-4 py-3 text-xs font-bold text-gray-500 uppercase">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, i) => (
                  <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-400 text-xs">{i + 1}</td>
                    {columns.map((col) => (
                      <td key={col.key} className="px-4 py-3 text-gray-800 max-w-[220px]">
                        {col.render ? col.render(row[col.key], row) : (
                          <span className="truncate block">{row[col.key] || '—'}</span>
                        )}
                      </td>
                    ))}
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <button onClick={() => openEdit(row)}
                        className="text-blue-600 hover:text-blue-700 font-semibold text-xs px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors mr-1">
                        Sửa
                      </button>
                      <button onClick={() => del(row.id)}
                        className="text-red-600 hover:text-red-700 font-semibold text-xs px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors">
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {modal && (
        <Modal
          title={modal.mode === 'create' ? `Thêm ${rowLabel || 'mới'}` : `Sửa ${rowLabel || ''}`}
          onClose={() => setModal(null)}
        >
          <div className="space-y-4">
            {fields.map((field) => (
              <div key={field.key}>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <FormField
                  field={field}
                  value={formData[field.key]}
                  onChange={(val) => setFormData((prev) => ({ ...prev, [field.key]: val }))}
                />
              </div>
            ))}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">{error}</div>
            )}
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
