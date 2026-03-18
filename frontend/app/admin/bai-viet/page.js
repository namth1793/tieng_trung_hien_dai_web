'use client';
import CrudPage from '../../../components/admin/CrudPage';

const CATEGORIES = ['Văn hóa', 'Ưu đãi', 'Mẹo học', 'HSK', 'Học bổng', 'Tin tức'];

const fields = [
  { key: 'title', label: 'Tiêu đề', required: true, placeholder: 'Tiêu đề bài viết' },
  { key: 'slug', label: 'Slug (URL)', placeholder: 'Tự tạo nếu để trống' },
  { key: 'category', label: 'Danh mục', type: 'select', options: CATEGORIES },
  { key: 'author', label: 'Tác giả', placeholder: 'Tên tác giả' },
  { key: 'image', label: 'URL ảnh bìa', placeholder: 'https://...' },
  { key: 'excerpt', label: 'Mô tả ngắn', type: 'textarea', placeholder: 'Tóm tắt bài viết (hiển thị ở danh sách)' },
  { key: 'content', label: 'Nội dung (HTML)', type: 'textarea', placeholder: '<p>Nội dung bài viết...</p>' },
];

const columns = [
  { key: 'title', label: 'Tiêu đề' },
  { key: 'category', label: 'Danh mục', render: (v) => v ? <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded">{v}</span> : '—' },
  { key: 'author', label: 'Tác giả' },
  { key: 'views', label: 'Lượt xem' },
  { key: 'created_at', label: 'Ngày tạo', render: (v) => v ? new Date(v).toLocaleDateString('vi-VN') : '—' },
];

export default function AdminArticles() {
  return <CrudPage title="Bài viết" endpoint="articles" fields={fields} columns={columns} rowLabel="bài viết" />;
}
