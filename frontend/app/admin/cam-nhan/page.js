'use client';
import CrudPage from '../../../components/admin/CrudPage';

const COURSES = ['HSK 1-2', 'HSK 3', 'HSK 4', 'HSK 5', 'HSK 6', 'Tiếng Trung Thương Mại', 'Tiếng Trung Trẻ Em', 'Lớp 1-1'];

const fields = [
  { key: 'student_name', label: 'Tên học viên', required: true, placeholder: 'Nguyễn Văn A' },
  { key: 'course', label: 'Khóa học đã học', type: 'select', options: COURSES },
  { key: 'rating', label: 'Đánh giá (1–5)', type: 'number', placeholder: '5', default: 5 },
  { key: 'photo', label: 'URL ảnh học viên', placeholder: 'https://...' },
  { key: 'review', label: 'Nhận xét', type: 'textarea', placeholder: 'Chia sẻ của học viên...' },
  { key: 'success_story', label: 'Câu chuyện thành công', type: 'textarea', placeholder: 'Kết quả đạt được sau khóa học...' },
];

const columns = [
  { key: 'student_name', label: 'Học viên' },
  { key: 'course', label: 'Khóa học' },
  { key: 'rating', label: 'Sao', render: (v) => '⭐'.repeat(Math.min(v, 5)) },
  { key: 'review', label: 'Nhận xét', render: (v) => <span className="line-clamp-1 max-w-xs block">{v || '—'}</span> },
  { key: 'created_at', label: 'Ngày', render: (v) => v ? new Date(v).toLocaleDateString('vi-VN') : '—' },
];

export default function AdminTestimonials() {
  return <CrudPage title="Cảm nhận học viên" endpoint="testimonials" fields={fields} columns={columns} rowLabel="cảm nhận" />;
}
