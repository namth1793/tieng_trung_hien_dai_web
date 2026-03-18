'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Sidebar from '../../components/Sidebar';
import RegistrationModal, { openRegistrationModal } from '../../components/RegistrationModal';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5006/api';

const stars = (n = 5) => (
  <div className="flex gap-0.5">
    {[...Array(n)].map((_, i) => (
      <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

const sources = ['Tất cả', 'Facebook', 'Google', 'Zalo', 'Bạn bè'];

export default function CamNhanPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Tất cả');
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/testimonials`)
      .then(r => r.json())
      .then(data => { setTestimonials(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const shown = filter === 'Tất cả'
    ? testimonials
    : testimonials.filter(t => t.source === filter);

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <div className="relative h-48 md:h-64 overflow-hidden bg-red-600">
          <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/students-happy/1200/400')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="text-white/70 text-sm mb-2">
                <Link href="/" className="hover:text-white">Trang chủ</Link> / Cảm nhận học viên
              </p>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">❤️ Cảm Nhận Học Viên</h1>
              <p className="text-red-100 text-base">Hàng ngàn học viên đã tin tưởng và thành công cùng Tiếng Trung Hiện Đại</p>
            </motion.div>
          </div>
        </div>

        {/* Stats row */}
        <div className="bg-white border-b border-gray-100 py-6">
          <div className="container-custom grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '5.000+', label: 'Học viên đã học' },
              { value: '4.9★', label: 'Đánh giá trung bình' },
              { value: '95%', label: 'Học viên hài lòng' },
              { value: '1.200+', label: 'Đánh giá 5 sao' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-2xl font-extrabold text-red-600">{s.value}</div>
                <div className="text-gray-500 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">
            <div>
              {/* Filter */}
              <div className="flex flex-wrap gap-2 mb-8">
                {sources.map(s => (
                  <button
                    key={s}
                    onClick={() => setFilter(s)}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${filter === s ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[...Array(6)].map((_, i) => <div key={i} className="bg-gray-100 rounded-xl h-44 animate-pulse" />)}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {shown.map((t, i) => (
                    <motion.div
                      key={t.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                      className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gray-100 border-2 border-red-100">
                          <Image src={t.photo || `https://picsum.photos/seed/student-${t.id}/100/100`} alt={t.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                          <p className="text-gray-400 text-xs">{t.course || 'Học viên'}</p>
                          {stars(t.rating || 5)}
                        </div>
                        {t.source && (
                          <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium flex-shrink-0">{t.source}</span>
                        )}
                      </div>
                      <p className={`text-gray-600 text-sm leading-relaxed ${expanded === t.id ? '' : 'line-clamp-3'}`}>
                        "{t.content}"
                      </p>
                      {t.content?.length > 150 && (
                        <button
                          onClick={() => setExpanded(expanded === t.id ? null : t.id)}
                          className="text-red-600 text-xs font-semibold mt-1 hover:underline"
                        >
                          {expanded === t.id ? 'Thu gọn ▲' : 'Xem thêm ▼'}
                        </button>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Video testimonials placeholder */}
              <div className="mt-12">
                <h2 className="text-xl font-extrabold text-gray-900 mb-6">🎬 Video Cảm Nhận</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[1, 2].map(n => (
                    <div key={n} className="relative rounded-xl overflow-hidden aspect-video bg-gray-900 cursor-pointer group">
                      <Image src={`https://picsum.photos/seed/video-testimonial-${n}/600/340`} alt="" fill className="object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 bg-red-600/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      <div className="absolute bottom-3 left-3 text-white text-sm font-bold">Học viên chia sẻ trải nghiệm #{n}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-10 bg-red-600 rounded-2xl p-8 text-center text-white">
                <h3 className="text-xl font-extrabold mb-2">Bạn muốn là học viên tiếp theo?</h3>
                <p className="text-red-100 text-sm mb-5">Đăng ký tư vấn miễn phí — chúng tôi sẽ giúp bạn xác định lộ trình học phù hợp nhất!</p>
                <button onClick={openRegistrationModal} className="bg-white text-red-600 font-extrabold px-8 py-3 rounded-full hover:bg-red-50 transition-colors text-sm">
                  Đăng ký ngay →
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
