'use client';
import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5006/api';
function authHeaders() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : '';
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
}

const STATUS_LABELS = {
  new: { label: 'Mới', color: 'bg-red-100 text-red-700' },
  contacted: { label: 'Đã liên hệ', color: 'bg-yellow-100 text-yellow-700' },
  enrolled: { label: 'Đã đăng ký học', color: 'bg-green-100 text-green-700' },
  cancelled: { label: 'Hủy', color: 'bg-gray-100 text-gray-500' },
};

export default function AdminRegistrations() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const load = () => {
    setLoading(true);
    fetch(`${API_URL}/admin/registrations`, { headers: authHeaders() })
      .then((r) => r.json())
      .then(setRows)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    await fetch(`${API_URL}/admin/registrations/${id}/status`, {
      method: 'PUT', headers: authHeaders(), body: JSON.stringify({ status }),
    });
    load();
  };

  const del = async (id) => {
    if (!confirm('Xóa đăng ký này?')) return;
    await fetch(`${API_URL}/admin/registrations/${id}`, { method: 'DELETE', headers: authHeaders() });
    load();
  };

  const filtered = rows.filter((r) => {
    const matchFilter = filter === 'all' || r.status === filter;
    const matchSearch = !search || [r.name, r.phone, r.email].some((v) => String(v || '').toLowerCase().includes(search.toLowerCase()));
    return matchFilter && matchSearch;
  });

  const counts = Object.fromEntries(
    Object.keys(STATUS_LABELS).map((s) => [s, rows.filter((r) => r.status === s).length])
  );

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Đăng ký tư vấn</h1>
          <p className="text-gray-500 text-sm mt-0.5">{rows.length} đăng ký tổng cộng</p>
        </div>
        <input type="text" placeholder="Tìm theo tên, SĐT, email..."
          value={search} onChange={(e) => setSearch(e.target.value)}
          className="h-9 px-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-red-500 w-56" />
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {[['all', 'Tất cả', rows.length], ...Object.entries(STATUS_LABELS).map(([k, v]) => [k, v.label, counts[k]])].map(([key, label, count]) => (
          <button key={key} onClick={() => setFilter(key)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${filter === key ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {label} ({count || 0})
          </button>
        ))}
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
                  {['#', 'Họ tên', 'SĐT', 'Email', 'Khoá học', 'Hình thức', 'Thời gian', 'Trạng thái', ''].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, i) => {
                  const st = STATUS_LABELS[row.status] || STATUS_LABELS.new;
                  return (
                    <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-gray-400 text-xs">{i + 1}</td>
                      <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap">{row.name}</td>
                      <td className="px-4 py-3">
                        <a href={`tel:${row.phone}`} className="text-blue-600 hover:underline">{row.phone}</a>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{row.email || '—'}</td>
                      <td className="px-4 py-3 text-gray-600">{row.contact_method || '—'}</td>
                      <td className="px-4 py-3 text-gray-600">{row.study_format || '—'}</td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap text-xs">
                        {row.created_at ? new Date(row.created_at).toLocaleString('vi-VN') : '—'}
                      </td>
                      <td className="px-4 py-3">
                        <select value={row.status || 'new'} onChange={(e) => updateStatus(row.id, e.target.value)}
                          className={`text-xs font-bold px-2 py-1 rounded border-0 outline-none cursor-pointer ${st.color}`}>
                          {Object.entries(STATUS_LABELS).map(([k, v]) => (
                            <option key={k} value={k}>{v.label}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => del(row.id)} className="text-red-500 hover:text-red-700 text-xs px-2 py-1 hover:bg-red-50 rounded transition-colors">
                          Xóa
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
