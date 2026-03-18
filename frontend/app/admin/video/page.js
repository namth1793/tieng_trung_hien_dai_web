'use client';
import CrudPage from '../../../components/admin/CrudPage';

const fields = [
  { key: 'title', label: 'Tiêu đề video', required: true, placeholder: 'VD: Bài giảng HSK 1 – Phát âm' },
  { key: 'youtube_id', label: 'YouTube Video ID', required: true, placeholder: 'VD: dQw4w9WgXcQ (phần sau v= trong URL)' },
  { key: 'description', label: 'Mô tả', type: 'textarea', placeholder: 'Nội dung video...' },
  { key: 'sort_order', label: 'Thứ tự hiển thị', type: 'number', placeholder: '0' },
];

const columns = [
  {
    key: 'youtube_id', label: 'Thumbnail',
    render: (v) => v ? <img src={`https://img.youtube.com/vi/${v}/mqdefault.jpg`} alt="" className="w-20 h-12 rounded object-cover" /> : '—'
  },
  { key: 'title', label: 'Tiêu đề' },
  { key: 'youtube_id', label: 'YouTube ID' },
  { key: 'sort_order', label: 'Thứ tự' },
];

export default function AdminVideos() {
  return <CrudPage title="Video bài giảng" endpoint="videos" fields={fields} columns={columns} rowLabel="video" />;
}
