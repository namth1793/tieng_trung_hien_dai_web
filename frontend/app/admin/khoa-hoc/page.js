'use client';
import CrudPage from '../../../components/admin/CrudPage';

const fields = [
  { key: 'title', label: 'Tên khóa học', required: true, placeholder: 'VD: HSK 4 + HSKK' },
  { key: 'slug', label: 'Slug (URL)', placeholder: 'VD: hsk-4 (tự tạo nếu để trống)' },
  { key: 'subtitle', label: 'Phụ đề', placeholder: 'Mô tả ngắn' },
  { key: 'level', label: 'Trình độ', placeholder: 'VD: Trung cấp' },
  { key: 'duration', label: 'Thời gian', placeholder: 'VD: 3 tháng' },
  { key: 'sessions', label: 'Số buổi', placeholder: 'VD: 36 buổi' },
  { key: 'badge', label: 'Badge', placeholder: 'VD: Phổ biến' },
  { key: 'sort_order', label: 'Thứ tự hiển thị', type: 'number', placeholder: '0' },
  { key: 'is_featured', label: 'Nổi bật', type: 'checkbox', checkLabel: 'Hiển thị trong mục nổi bật', default: false },
  { key: 'image', label: 'URL ảnh', placeholder: 'https://...' },
  { key: 'description', label: 'Mô tả', type: 'textarea', placeholder: 'Mô tả chi tiết khóa học...' },
];

const columns = [
  { key: 'title', label: 'Tên khóa học' },
  { key: 'level', label: 'Trình độ' },
  { key: 'duration', label: 'Thời gian' },
  { key: 'sort_order', label: 'Thứ tự' },
  { key: 'is_featured', label: 'Nổi bật', render: (v) => v ? <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded">✓</span> : <span className="text-gray-300">—</span> },
];

export default function AdminCourses() {
  return <CrudPage title="Khóa học" endpoint="courses" fields={fields} columns={columns} rowLabel="khóa học" />;
}
