'use client';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Sidebar from '../../../components/Sidebar';
import RegistrationModal, { openRegistrationModal } from '../../../components/RegistrationModal';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5006/api';

const PAGE_META = {
  've-trung-tam': {
    title: 'Về Trung Tâm',
    subtitle: 'Hơn 10 năm đồng hành cùng học viên chinh phục tiếng Trung',
    image: 'https://picsum.photos/seed/about-center/1200/500',
  },
  'doi-ngu-giao-vien': {
    title: 'Đội Ngũ Giáo Viên',
    subtitle: 'Giảng viên tâm huyết – chuyên môn cao – kinh nghiệm dày dạn',
    image: 'https://picsum.photos/seed/teachers-team/1200/500',
  },
};

const milestones = [
  { year: '2014', text: 'Thành lập Trung tâm Tiếng Trung Hiện Đại tại Đà Nẵng' },
  { year: '2016', text: 'Mở rộng thêm cơ sở 2, đón tiếp hơn 500 học viên mỗi năm' },
  { year: '2018', text: 'Đạt danh hiệu Top 3 trung tâm tiếng Trung uy tín Đà Nẵng' },
  { year: '2020', text: 'Ra mắt chương trình học Online, phục vụ học viên toàn quốc' },
  { year: '2022', text: 'Vượt mốc 4.000 học viên tốt nghiệp đạt chuẩn HSK' },
  { year: '2024', text: 'Hơn 5.000 học viên – Top 1 trung tâm tiếng Trung Đà Nẵng' },
];

const values = [
  { icon: '🎯', title: 'Chất lượng đào tạo', desc: 'Giáo trình chuẩn quốc tế, cập nhật liên tục theo chuẩn HSK mới nhất.' },
  { icon: '❤️', title: 'Tận tâm với học viên', desc: 'Đội ngũ trợ giảng hỗ trợ 24/7, luôn đồng hành cùng học viên.' },
  { icon: '🏆', title: 'Cam kết đầu ra', desc: 'Học viên chưa đạt mục tiêu được học lại miễn phí đến khi đạt chuẩn.' },
  { icon: '💡', title: 'Phương pháp hiện đại', desc: 'Kết hợp học trực tiếp, video, flashcard và luyện đề online.' },
  { icon: '👨‍👩‍👧‍👦', title: 'Lớp sĩ số nhỏ', desc: 'Mỗi lớp chỉ 8–12 học viên để giáo viên chú ý từng người.' },
  { icon: '📍', title: 'Vị trí thuận tiện', desc: 'Hai cơ sở tại trung tâm Đà Nẵng, dễ dàng di chuyển.' },
];

const stats = [
  { value: '5.000+', label: 'Học viên đã học' },
  { value: '10+', label: 'Năm kinh nghiệm' },
  { value: '95%', label: 'Tỷ lệ đậu HSK' },
  { value: '50+', label: 'Giảng viên' },
];

function AboutCenterContent() {
  return (
    <div className="space-y-12">
      {/* Stats row */}
      <div className="bg-red-600 rounded-2xl py-8 px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="text-3xl font-extrabold">{s.value}</div>
            <div className="text-red-100 text-sm mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* About text + image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-4 leading-tight">
            Trung Tâm Tiếng Trung <span className="text-red-600">Hiện Đại</span>
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Được thành lập từ năm 2014, Trung tâm Tiếng Trung Hiện Đại đã trở thành một trong những địa chỉ học tiếng Trung uy tín hàng đầu tại Đà Nẵng. Với triết lý <strong>"Thực tế – Hiệu quả – Cam kết"</strong>, chúng tôi không chỉ truyền đạt ngôn ngữ mà còn giúp học viên hiểu sâu về văn hóa Trung Quốc.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            Hơn 10 năm hoạt động, chúng tôi tự hào đã đồng hành và giúp hơn <strong>5.000 học viên</strong> chinh phục tiếng Trung – từ cơ bản đến HSK 6.
          </p>
          <button onClick={openRegistrationModal} className="btn-primary">Đăng ký tư vấn miễn phí →</button>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="relative">
          <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
            <Image src="https://picsum.photos/seed/classroom-inside/800/600" alt="Lớp học" fill className="object-cover" />
          </div>
          <div className="absolute -bottom-4 -right-4 bg-red-600 text-white rounded-xl p-4 shadow-xl">
            <div className="text-2xl font-extrabold">10+</div>
            <div className="text-xs text-red-100">Năm kinh nghiệm</div>
          </div>
        </motion.div>
      </div>

      {/* Values */}
      <div>
        <h2 className="text-xl font-extrabold text-gray-900 mb-6">Giá Trị Cốt Lõi</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-start gap-4"
            >
              <div className="text-2xl flex-shrink-0">{v.icon}</div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{v.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div>
        <h2 className="text-xl font-extrabold text-gray-900 mb-6">Hành Trình Phát Triển</h2>
        <div className="relative border-l-2 border-red-200 pl-6 space-y-6">
          {milestones.map((m, i) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative"
            >
              <div className="absolute -left-[29px] top-1 w-3.5 h-3.5 bg-red-600 rounded-full ring-4 ring-red-100" />
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <span className="text-red-600 font-extrabold text-base">{m.year}</span>
                <p className="text-gray-700 text-sm mt-1">{m.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Facilities */}
      <div>
        <h2 className="text-xl font-extrabold text-gray-900 mb-6">Cơ Sở Vật Chất</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="relative rounded-xl overflow-hidden aspect-video shadow group">
              <Image src={`https://picsum.photos/seed/facility-${n}/600/400`} alt={`Cơ sở ${n}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TeachersContent() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/teachers`)
      .then((r) => r.json())
      .then(setTeachers)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex justify-center py-20">
      <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div>
      <p className="text-gray-500 mb-8 text-sm leading-relaxed">
        Đội ngũ giảng viên của chúng tôi đều có bằng Thạc sĩ, Tiến sĩ chuyên ngành Ngôn ngữ Trung Quốc, được đào tạo tại các trường đại học uy tín trong và ngoài nước.
      </p>
      <div className="space-y-6">
        {teachers.map((teacher, i) => (
          <motion.div
            key={teacher.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex gap-5 hover:shadow-md transition-shadow group"
          >
            <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-red-100">
              <Image src={teacher.photo} alt={teacher.name} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="font-extrabold text-gray-900 group-hover:text-red-600 transition-colors">{teacher.name}</h3>
              <p className="text-red-600 text-sm font-semibold mb-2">{teacher.title}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-600">
                <span><strong>Học vị:</strong> {teacher.degree}</span>
                <span><strong>Kinh nghiệm:</strong> {teacher.years_experience} năm</span>
                <span className="sm:col-span-2"><strong>Đào tạo:</strong> {teacher.university}</span>
              </div>
              {teacher.bio && <p className="text-gray-500 text-xs mt-2 line-clamp-2">{teacher.bio}</p>}
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-10 bg-red-600 rounded-2xl p-8 text-center text-white">
        <h3 className="text-xl font-extrabold mb-2">Muốn học cùng giáo viên của chúng tôi?</h3>
        <p className="text-red-100 text-sm mb-5">Đăng ký học thử miễn phí để trải nghiệm phong cách giảng dạy chuyên nghiệp.</p>
        <button onClick={openRegistrationModal} className="bg-white text-red-600 font-extrabold px-8 py-3 rounded-full hover:bg-red-50 transition-colors text-sm">
          Đăng ký học thử →
        </button>
      </div>
    </div>
  );
}

export default function GioiThieuPage() {
  const { slug } = useParams();
  const meta = PAGE_META[slug] || PAGE_META['ve-trung-tam'];

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <div className="relative h-48 md:h-64 overflow-hidden">
          <Image src={meta.image} alt={meta.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
          <div className="absolute bottom-0 left-0 right-0 p-6 container-custom">
            <p className="text-white/60 text-xs mb-2">
              <Link href="/" className="hover:text-white">Trang chủ</Link>
              {' / '}
              <span className="text-white/80">Giới thiệu / {meta.title}</span>
            </p>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">{meta.title}</h1>
            <p className="text-white/80 mt-1 text-sm">{meta.subtitle}</p>
          </div>
        </div>

        {/* Body: main + sidebar */}
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">
            <div>
              {slug === 'doi-ngu-giao-vien' ? <TeachersContent /> : <AboutCenterContent />}
            </div>
            <Sidebar />
          </div>
        </div>
      </main>
      <Footer />
      <RegistrationModal />
    </>
  );
}
