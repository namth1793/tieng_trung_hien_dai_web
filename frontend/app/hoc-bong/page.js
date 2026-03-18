'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Sidebar from '../../components/Sidebar';
import RegistrationModal, { openRegistrationModal } from '../../components/RegistrationModal';

const scholarships = [
  {
    id: 1,
    title: 'Học Bổng Tân Sinh Viên',
    value: 'Giảm 30% học phí',
    badge: 'HOT',
    badgeColor: 'bg-red-500',
    desc: 'Dành cho học viên đăng ký lần đầu tại Tiếng Trung Hiện Đại trong tháng này.',
    conditions: ['Đăng ký trong tháng', 'Chưa từng học tại trung tâm', 'Áp dụng cho tất cả khóa học'],
    deadline: '31/12/2025',
    image: 'https://picsum.photos/seed/scholarship1/600/400',
  },
  {
    id: 2,
    title: 'Học Bổng Giới Thiệu Bạn Bè',
    value: 'Giảm 500.000đ/người',
    badge: 'MỚI',
    badgeColor: 'bg-blue-500',
    desc: 'Cả bạn và người được giới thiệu đều được giảm học phí khi đăng ký cùng nhau.',
    conditions: ['Giới thiệu tối thiểu 1 người', 'Người được giới thiệu phải đăng ký khóa học', 'Không giới hạn số lượt giới thiệu'],
    deadline: 'Không giới hạn',
    image: 'https://picsum.photos/seed/scholarship2/600/400',
  },
  {
    id: 3,
    title: 'Học Bổng Học Viên Xuất Sắc',
    value: 'Học miễn phí 1 tháng',
    badge: 'ĐẶC BIỆT',
    badgeColor: 'bg-yellow-500',
    desc: 'Trao cho học viên đạt điểm HSK xuất sắc hoặc tiến bộ vượt bậc trong khóa học.',
    conditions: ['Đạt HSK đúng hạn theo cam kết', 'Điểm số từ 80% trở lên', 'Đánh giá nội bộ cuối khóa'],
    deadline: 'Mỗi quý',
    image: 'https://picsum.photos/seed/scholarship3/600/400',
  },
  {
    id: 4,
    title: 'Học Bổng Gia Đình',
    value: 'Giảm 20% từ thành viên thứ 2',
    badge: 'GIA ĐÌNH',
    badgeColor: 'bg-green-500',
    desc: 'Khi có từ 2 thành viên gia đình cùng học, các thành viên tiếp theo được giảm học phí.',
    conditions: ['Từ 2 thành viên gia đình trở lên', 'Đăng ký cùng một đợt', 'Áp dụng cho mọi khóa học'],
    deadline: 'Thường xuyên',
    image: 'https://picsum.photos/seed/scholarship4/600/400',
  },
  {
    id: 5,
    title: 'Học Bổng Học Liên Tục',
    value: 'Giảm 15% từ khóa thứ 2',
    badge: 'TRUNG THÀNH',
    badgeColor: 'bg-purple-500',
    desc: 'Học viên đã học khóa trước và tiếp tục đăng ký khóa mới được hưởng ưu đãi đặc biệt.',
    conditions: ['Đã hoàn thành ít nhất 1 khóa', 'Đăng ký khóa mới trong vòng 30 ngày', 'Không bị gián đoạn quá 3 tháng'],
    deadline: 'Thường xuyên',
    image: 'https://picsum.photos/seed/scholarship5/600/400',
  },
  {
    id: 6,
    title: 'Học Bổng Đăng Ký Sớm',
    value: 'Giảm 10% + tặng tài liệu',
    badge: 'EARLY BIRD',
    badgeColor: 'bg-orange-500',
    desc: 'Đăng ký trước ngày khai giảng 2 tuần để nhận ưu đãi và bộ tài liệu học tập cao cấp.',
    conditions: ['Đăng ký trước khai giảng 14 ngày', 'Đóng học phí đầy đủ khi đăng ký', 'Áp dụng mỗi đợt khai giảng'],
    deadline: 'Mỗi đợt khai giảng',
    image: 'https://picsum.photos/seed/scholarship6/600/400',
  },
];

const faqs = [
  { q: 'Có thể kết hợp nhiều học bổng không?', a: 'Các học bổng không thể cộng dồn. Học viên được áp dụng 1 loại học bổng có giá trị cao nhất.' },
  { q: 'Làm thế nào để đăng ký nhận học bổng?', a: 'Điền form đăng ký tư vấn, nhân viên sẽ tư vấn và hướng dẫn thủ tục nhận học bổng phù hợp.' },
  { q: 'Học bổng có áp dụng cho khóa online không?', a: 'Hầu hết các học bổng áp dụng cho cả hình thức Online và Offline, trừ một số trường hợp đặc biệt.' },
];

export default function HocBongPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <div className="relative h-48 md:h-64 overflow-hidden bg-gradient-to-r from-red-700 to-red-500">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'url("https://picsum.photos/seed/scholarship-bg/1200/400")', backgroundSize: 'cover' }} />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="text-white/70 text-sm mb-2">
                <Link href="/" className="hover:text-white">Trang chủ</Link> / Học bổng
              </p>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">🎓 Chương Trình Học Bổng</h1>
              <p className="text-red-100 text-base">Tiếng Trung Hiện Đại luôn có học bổng dành cho bạn — đừng bỏ lỡ!</p>
            </motion.div>
          </div>
        </div>

        {/* Body */}
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">
            <div>
              {/* Scholarship cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {scholarships.map((s, i) => (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow overflow-hidden group"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <Image src={s.image} alt={s.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <span className={`absolute top-3 left-3 ${s.badgeColor} text-white text-xs font-extrabold px-2.5 py-1 rounded-full`}>
                        {s.badge}
                      </span>
                      <div className="absolute bottom-3 left-3 text-white">
                        <p className="font-extrabold text-xl">{s.value}</p>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-extrabold text-gray-900 text-base mb-1 group-hover:text-red-600 transition-colors">{s.title}</h3>
                      <p className="text-gray-500 text-sm mb-3">{s.desc}</p>
                      <ul className="space-y-1.5 mb-4">
                        {s.conditions.map(c => (
                          <li key={c} className="flex items-start gap-2 text-xs text-gray-600">
                            <svg className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                            {c}
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">⏰ HSD: {s.deadline}</span>
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

              {/* FAQ */}
              <div className="mb-10">
                <h2 className="text-xl font-extrabold text-gray-900 mb-6">Câu Hỏi Thường Gặp</h2>
                <div className="space-y-3">
                  {faqs.map((f, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                      <p className="font-bold text-gray-900 text-sm mb-2">❓ {f.q}</p>
                      <p className="text-gray-600 text-sm">{f.a}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-red-600 rounded-2xl p-8 text-center text-white">
                <h3 className="text-xl font-extrabold mb-2">Nhận tư vấn học bổng ngay!</h3>
                <p className="text-red-100 text-sm mb-5">Đội ngũ tư vấn sẽ giúp bạn tìm học bổng phù hợp nhất.</p>
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
