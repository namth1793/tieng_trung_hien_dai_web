'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Sidebar from '../../../components/Sidebar';
import RegistrationModal, { openRegistrationModal } from '../../../components/RegistrationModal';

// ── Static library content ───────────────────────────────────────────────────

const LIB_META = {
  'chia-se-kien-thuc': {
    title: 'Chia Sẻ Kiến Thức',
    subtitle: 'Tổng hợp bài viết, mẹo học và kiến thức tiếng Trung thực tiễn',
    image: 'https://picsum.photos/seed/knowledge/1200/400',
    icon: '💡',
  },
  'tai-lieu-hsk2': { title: 'Tài Liệu HSK 2', subtitle: 'Giáo trình, đề thi thử và tài liệu luyện tập HSK 2', image: 'https://picsum.photos/seed/hsk2-doc/1200/400', icon: '📗' },
  'tai-lieu-hsk3': { title: 'Tài Liệu HSK 3', subtitle: 'Giáo trình, đề thi thử và tài liệu luyện tập HSK 3', image: 'https://picsum.photos/seed/hsk3-doc/1200/400', icon: '📘' },
  'tai-lieu-hsk4': { title: 'Tài Liệu HSK 4', subtitle: 'Giáo trình, đề thi thử và tài liệu luyện tập HSK 4', image: 'https://picsum.photos/seed/hsk4-doc/1200/400', icon: '📙' },
  'tai-lieu-hsk5': { title: 'Tài Liệu HSK 5', subtitle: 'Giáo trình, đề thi thử và tài liệu luyện tập HSK 5', image: 'https://picsum.photos/seed/hsk5-doc/1200/400', icon: '📕' },
  'tai-lieu-hsk6': { title: 'Tài Liệu HSK 6', subtitle: 'Giáo trình, đề thi thử và tài liệu luyện tập HSK 6', image: 'https://picsum.photos/seed/hsk6-doc/1200/400', icon: '📒' },
  'thuong-mai': { title: 'Tiếng Trung Thương Mại', subtitle: 'Tài liệu tiếng Trung dành cho môi trường kinh doanh và thương mại', image: 'https://picsum.photos/seed/business-chinese/1200/400', icon: '💼' },
  'du-lich': { title: 'Tiếng Trung Du Lịch', subtitle: 'Hội thoại và từ vựng tiếng Trung thực dụng cho du lịch', image: 'https://picsum.photos/seed/travel-chinese/1200/400', icon: '✈️' },
  'hoc-lieu-khac': { title: 'Học Liệu Khác', subtitle: 'Tổng hợp các tài liệu bổ trợ học tiếng Trung đa dạng', image: 'https://picsum.photos/seed/other-materials/1200/400', icon: '📦' },
};

// Static resources per category
const RESOURCES = {
  default: [
    { type: 'PDF', title: 'Giáo trình chính thức', desc: 'Tài liệu học tập được biên soạn bởi đội ngũ giáo viên', icon: '📄', color: 'red' },
    { type: 'VIDEO', title: 'Video bài giảng mẫu', desc: 'Xem trước phong cách giảng dạy của giáo viên', icon: '🎬', color: 'blue' },
    { type: 'MP3', title: 'File nghe luyện tập', desc: 'Luyện nghe với giọng đọc chuẩn phổ thông', icon: '🎧', color: 'green' },
    { type: 'FLASHCARD', title: 'Bộ flashcard từ vựng', desc: 'Ôn luyện từ vựng mọi lúc mọi nơi', icon: '🃏', color: 'yellow' },
    { type: 'ĐỀ THI', title: 'Đề thi thử có đáp án', desc: 'Bộ đề thi mô phỏng format HSK thật', icon: '📝', color: 'purple' },
    { type: 'BẢNG TỪ', title: 'Danh sách từ vựng theo chủ đề', desc: 'Tổng hợp từ vựng phân loại rõ ràng', icon: '📊', color: 'orange' },
  ],
};

const colorMap = {
  red: 'bg-red-100 text-red-700 border-red-200',
  blue: 'bg-blue-100 text-blue-700 border-blue-200',
  green: 'bg-green-100 text-green-700 border-green-200',
  yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  purple: 'bg-purple-100 text-purple-700 border-purple-200',
  orange: 'bg-orange-100 text-orange-700 border-orange-200',
};

const libNavItems = [
  { label: 'Chia sẻ kiến thức', href: '/thu-vien/chia-se-kien-thuc' },
  { label: 'Tài liệu HSK2', href: '/thu-vien/tai-lieu-hsk2' },
  { label: 'Tài liệu HSK3', href: '/thu-vien/tai-lieu-hsk3' },
  { label: 'Tài liệu HSK4', href: '/thu-vien/tai-lieu-hsk4' },
  { label: 'Tài liệu HSK5', href: '/thu-vien/tai-lieu-hsk5' },
  { label: 'Tài liệu HSK6', href: '/thu-vien/tai-lieu-hsk6' },
  { label: 'Thương mại', href: '/thu-vien/thuong-mai' },
  { label: 'Du lịch', href: '/thu-vien/du-lich' },
  { label: 'Học liệu khác', href: '/thu-vien/hoc-lieu-khac' },
];

export default function ThuVienPage() {
  const { slug } = useParams();
  const meta = LIB_META[slug] || LIB_META['chia-se-kien-thuc'];
  const resources = RESOURCES[slug] || RESOURCES.default;

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <div className="relative h-48 md:h-60 overflow-hidden">
          <Image src={meta.image} alt={meta.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
          <div className="absolute bottom-0 left-0 right-0 p-6 container-custom">
            <p className="text-white/60 text-xs mb-2">
              <Link href="/" className="hover:text-white">Trang chủ</Link>
              {' / '}
              <span className="text-white/80">Thư viện / {meta.title}</span>
            </p>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">
              {meta.icon} {meta.title}
            </h1>
            <p className="text-white/80 mt-1 text-sm">{meta.subtitle}</p>
          </div>
        </div>

        {/* Body */}
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">

            {/* Main */}
            <div>
              {/* Sub-nav */}
              <div className="flex flex-wrap gap-2 mb-8">
                {libNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${slug === item.href.split('/').pop() ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Resources grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
                {resources.map((res, i) => (
                  <motion.div
                    key={res.title}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow group"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 border ${colorMap[res.color]}`}>
                        {res.icon}
                      </div>
                      <div className="flex-1">
                        <div className={`inline-block text-xs font-extrabold uppercase px-2 py-0.5 rounded mb-1 ${colorMap[res.color]} border`}>
                          {res.type}
                        </div>
                        <h3 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-red-600 transition-colors">
                          {res.title}
                        </h3>
                        <p className="text-gray-500 text-xs leading-relaxed">{res.desc}</p>
                      </div>
                    </div>
                    <button
                      onClick={openRegistrationModal}
                      className="mt-4 w-full text-center text-xs font-bold text-red-600 hover:text-red-700 border border-red-200 hover:border-red-400 rounded-lg py-2 transition-colors"
                    >
                      Đăng ký để nhận tài liệu →
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Note */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 mb-8">
                <p className="text-yellow-800 text-sm font-semibold mb-1">📌 Lưu ý:</p>
                <p className="text-yellow-700 text-sm">
                  Tất cả tài liệu được cung cấp <strong>miễn phí</strong> cho học viên đã đăng ký tại Tiếng Trung Hiện Đại. Để nhận tài liệu, vui lòng đăng ký tư vấn hoặc liên hệ trực tiếp với trung tâm.
                </p>
              </div>

              {/* CTA */}
              <div className="bg-red-600 rounded-2xl p-8 text-center text-white">
                <h3 className="text-xl font-extrabold mb-2">Muốn nhận đầy đủ tài liệu?</h3>
                <p className="text-red-100 text-sm mb-5">Đăng ký học tại Tiếng Trung Hiện Đại để được nhận toàn bộ tài liệu và hỗ trợ học tập miễn phí.</p>
                <button onClick={openRegistrationModal} className="bg-white text-red-600 font-extrabold px-7 py-3 rounded-full hover:bg-red-50 transition-colors text-sm">
                  Đăng ký nhận tài liệu →
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <Sidebar />
          </div>
        </div>
      </main>
      <Footer />
      <RegistrationModal />
    </>
  );
}
