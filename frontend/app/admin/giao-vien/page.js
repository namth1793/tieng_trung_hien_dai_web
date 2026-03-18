'use client';
import CrudPage from '../../../components/admin/CrudPage';

const fields = [
  { key: 'name', label: 'Họ tên', required: true, placeholder: 'Thầy / Cô ...' },
  { key: 'title', label: 'Chức danh', placeholder: 'VD: Giảng viên chính' },
  { key: 'degree', label: 'Học vị', placeholder: 'VD: Thạc sĩ, Tiến sĩ' },
  { key: 'specialization', label: 'Chuyên ngành', placeholder: 'VD: Ngôn ngữ Trung Quốc' },
  { key: 'university', label: 'Trường đào tạo', placeholder: 'VD: Đại học Ngoại Ngữ Hà Nội' },
  { key: 'years_experience', label: 'Năm kinh nghiệm', type: 'number', placeholder: '5' },
  { key: 'sort_order', label: 'Thứ tự hiển thị', type: 'number', placeholder: '0' },
  { key: 'photo', label: 'URL ảnh', placeholder: 'https://...' },
  { key: 'bio', label: 'Tiểu sử', type: 'textarea', placeholder: 'Giới thiệu ngắn về giáo viên...' },
];

const columns = [
  { key: 'photo', label: 'Ảnh', render: (v) => v ? <img src={v} alt="" className="w-10 h-10 rounded-full object-cover" /> : <div className="w-10 h-10 bg-gray-200 rounded-full" /> },
  { key: 'name', label: 'Họ tên' },
  { key: 'title', label: 'Chức danh' },
  { key: 'degree', label: 'Học vị' },
  { key: 'years_experience', label: 'Kinh nghiệm', render: (v) => v ? `${v} năm` : '—' },
];

export default function AdminTeachers() {
  return <CrudPage title="Giáo viên" endpoint="teachers" fields={fields} columns={columns} rowLabel="giáo viên" />;
}
