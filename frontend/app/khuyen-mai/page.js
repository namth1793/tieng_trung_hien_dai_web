'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Sidebar from '../../components/Sidebar';
import RegistrationModal, { openRegistrationModal } from '../../components/RegistrationModal';

const promos = [
  {
    id: 1,
    tag: 'FLASH SALE',
    tagColor: 'bg-red-500',
    title: 'Giảm 40% tất cả khóa học HSK',
    desc: 'Áp dụng cho học viên đăng ký trong tuần này. Số lượng có hạn — chỉ còn 15 suất!',
    original: '4.500.000đ',
    sale: '2.700.000đ',
    deadline: '31/03/2025',
    image: 'https://picsum.photos/seed/promo-flash/600/360',
    hot: true,
  },
  {
    id: 2,
    tag: 'THÁNG 3',
    tagColor: 'bg-orange-500',
    title: 'Khai giảng tháng 3 — Tặng tài liệu trị giá 300.000đ',
    desc: 'Học viên đăng ký đợt khai giảng tháng 3 nhận ngay bộ tài liệu học tập cao cấp hoàn toàn miễn phí.',
    original: null,
    sale: 'Miễn phí tài liệu',
    deadline: '15/03/2025',
    image: 'https://picsum.photos/seed/promo-march/600/360',
    hot: false,
  },
  {
    id: 3,
    tag: 'COMBO',
    tagColor: 'bg-purple-500',
    title: 'Combo 2 khóa — Tiết kiệm 1.500.000đ',
    desc: 'Đăng ký liền 2 cấp học (ví dụ HSK3 + HSK4) để nhận ưu đãi combo đặc biệt không giới hạn thời gian.',
    original: '9.000.000đ',
    sale: '7.500.000đ',
    deadline: 'Thường xuyên',
    image: 'https://picsum.photos/seed/promo-combo/600/360',
    hot: false,
  },
  {
    id: 4,
    tag: 'HỌC BỔNG',
    tagColor: 'bg-green-500',
    title: 'Học bổng 50% cho học viên giỏi',
    desc: 'Thi tuyển đầu vào đạt 80% trở lên nhận ngay học bổng 50% học phí cho khóa học bất kỳ.',
    original: null,
    sale: 'Giảm 50% học phí',
    deadline: 'Mỗi đợt khai giảng',
    image: 'https://picsum.photos/seed/promo-scholarship/600/360',
    hot: true,
  },
  {
    id: 5,
    tag: 'NHÓM',
    tagColor: 'bg-blue-500',
    title: 'Đăng ký nhóm 3+ người — Giảm thêm 15%',
    desc: 'Rủ bạn bè cùng học — nhóm từ 3 người trở lên được giảm thêm 15% trên tổng học phí.',
    original: null,
    sale: 'Giảm thêm 15%',
    deadline: 'Thường xuyên',
    image: 'https://picsum.photos/seed/promo-group/600/360',
    hot: false,
  },
  {
    id: 6,
    tag: 'ONLINE',
    tagColor: 'bg-teal-500',
    title: 'Khóa Online — Giảm 20% so với Offline',
    desc: 'Học mọi lúc mọi nơi với hình thức Online, tiết kiệm hơn mà chất lượng tương đương lớp trực tiếp.',
    original: null,
    sale: 'Giảm 20%',
    deadline: 'Thường xuyên',
    image: 'https://picsum.photos/seed/promo-online/600/360',
    hot: false,
  },
];

export default function KhuyenMaiPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <div className="relative h-48 md:h-64 overflow-hidden bg-gradient-to-r from-orange-600 to-red-600">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(https://picsum.photos/seed/promo-hero/1200/400)', backgroundSize: 'cover' }} />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="text-white/60 text-sm mb-2">
                <Link href="/" className="hover:text-white">Trang chủ</Link> / Khuyến mãi
              </p>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">🎁 Chương Trình Khuyến Mãi</h1>
              <p className="text-orange-100">Cập nhật ưu đãi mới nhất — đừng bỏ lỡ!</p>
            </motion.div>
          </div>
        </div>

        <div className="container-custom py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {promos.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow overflow-hidden group"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className={`${p.tagColor} text-white text-xs font-extrabold px-2.5 py-1 rounded-full`}>{p.tag}</span>
                        {p.hot && <span className="bg-yellow-400 text-yellow-900 text-xs font-extrabold px-2.5 py-1 rounded-full">🔥 HOT</span>}
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <span className="bg-white text-red-600 font-extrabold text-lg px-3 py-1 rounded-lg shadow">{p.sale}</span>
                        {p.original && <span className="ml-2 text-white/70 text-sm line-through">{p.original}</span>}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-extrabold text-gray-900 text-base mb-2 group-hover:text-red-600 transition-colors leading-tight">{p.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-4">{p.desc}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          HSD: {p.deadline}
                        </span>
                        <button
                          onClick={openRegistrationModal}
                          className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
                        >
                          Đăng ký ngay
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Note */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 mb-8">
                <p className="text-yellow-800 text-sm font-semibold mb-1">📌 Điều kiện áp dụng:</p>
                <ul className="text-yellow-700 text-sm space-y-1 list-disc list-inside">
                  <li>Các ưu đãi không được cộng dồn với nhau.</li>
                  <li>Ưu đãi có thể thay đổi mà không cần thông báo trước.</li>
                  <li>Liên hệ trực tiếp để xác nhận ưu đãi đang áp dụng.</li>
                </ul>
              </div>

              {/* CTA */}
              <div className="bg-red-600 rounded-2xl p-8 text-center text-white">
                <h3 className="text-xl font-extrabold mb-2">Nhận tư vấn ưu đãi ngay!</h3>
                <p className="text-red-100 text-sm mb-5">Đội ngũ tư vấn sẽ giúp bạn chọn ưu đãi tốt nhất phù hợp với nhu cầu.</p>
                <button onClick={openRegistrationModal} className="bg-white text-red-600 font-extrabold px-8 py-3 rounded-full hover:bg-red-50 transition-colors text-sm">
                  Đăng ký tư vấn →
                </button>
              </div>
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
