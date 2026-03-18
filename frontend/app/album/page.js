'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import RegistrationModal, { openRegistrationModal } from '../../components/RegistrationModal';

const albums = [
  {
    id: 1, label: 'Tất cả',
  },
  { id: 2, label: 'Lớp học' },
  { id: 3, label: 'Hoạt động' },
  { id: 4, label: 'Lễ khai giảng' },
  { id: 5, label: 'Tốt nghiệp' },
  { id: 6, label: 'Dã ngoại' },
];

const photos = [
  { id: 1, src: 'https://picsum.photos/seed/class-01/600/400', alt: 'Lớp học HSK 1-2', cat: 'Lớp học', size: 'large' },
  { id: 2, src: 'https://picsum.photos/seed/class-02/600/400', alt: 'Giờ luyện tập', cat: 'Lớp học', size: 'small' },
  { id: 3, src: 'https://picsum.photos/seed/activity-01/600/400', alt: 'Hoạt động nhóm', cat: 'Hoạt động', size: 'small' },
  { id: 4, src: 'https://picsum.photos/seed/opening-01/600/400', alt: 'Lễ khai giảng tháng 3', cat: 'Lễ khai giảng', size: 'large' },
  { id: 5, src: 'https://picsum.photos/seed/grad-01/600/400', alt: 'Tốt nghiệp HSK 4', cat: 'Tốt nghiệp', size: 'small' },
  { id: 6, src: 'https://picsum.photos/seed/trip-01/600/400', alt: 'Dã ngoại học viên', cat: 'Dã ngoại', size: 'small' },
  { id: 7, src: 'https://picsum.photos/seed/class-03/600/400', alt: 'Lớp VIP 1-1', cat: 'Lớp học', size: 'small' },
  { id: 8, src: 'https://picsum.photos/seed/activity-02/600/400', alt: 'Văn nghệ cuối năm', cat: 'Hoạt động', size: 'large' },
  { id: 9, src: 'https://picsum.photos/seed/grad-02/600/400', alt: 'Lễ trao chứng chỉ', cat: 'Tốt nghiệp', size: 'small' },
  { id: 10, src: 'https://picsum.photos/seed/opening-02/600/400', alt: 'Khai giảng tháng 9', cat: 'Lễ khai giảng', size: 'small' },
  { id: 11, src: 'https://picsum.photos/seed/trip-02/600/400', alt: 'Tham quan bảo tàng', cat: 'Dã ngoại', size: 'small' },
  { id: 12, src: 'https://picsum.photos/seed/class-04/600/400', alt: 'Giờ học online', cat: 'Lớp học', size: 'large' },
  { id: 13, src: 'https://picsum.photos/seed/activity-03/600/400', alt: 'Tết Trung Thu', cat: 'Hoạt động', size: 'small' },
  { id: 14, src: 'https://picsum.photos/seed/grad-03/600/400', alt: 'Học viên xuất sắc', cat: 'Tốt nghiệp', size: 'small' },
  { id: 15, src: 'https://picsum.photos/seed/class-05/600/400', alt: 'Lớp học buổi tối', cat: 'Lớp học', size: 'small' },
];

export default function AlbumPage() {
  const [filter, setFilter] = useState('Tất cả');
  const [lightbox, setLightbox] = useState(null);

  const shown = filter === 'Tất cả' ? photos : photos.filter(p => p.cat === filter);

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <div className="relative h-48 md:h-60 overflow-hidden bg-gray-900">
          <Image src="https://picsum.photos/seed/album-hero/1200/400" alt="Album" fill className="object-cover opacity-50" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <p className="text-white/60 text-sm mb-2">
              <Link href="/" className="hover:text-white">Trang chủ</Link> / Album ảnh
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">📷 Album Ảnh</h1>
            <p className="text-white/80">Những khoảnh khắc đáng nhớ tại Tiếng Trung Hiện Đại</p>
          </div>
        </div>

        <div className="container-custom py-12">
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {albums.map(a => (
              <button
                key={a.id}
                onClick={() => setFilter(a.label)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-colors ${filter === a.label ? 'bg-red-600 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {a.label}
              </button>
            ))}
          </div>

          {/* Photo grid — masonry-style */}
          <motion.div layout className="columns-2 md:columns-3 gap-3 space-y-3">
            <AnimatePresence>
              {shown.map((p, i) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  className="break-inside-avoid mb-3 relative rounded-xl overflow-hidden cursor-pointer group shadow-sm"
                  onClick={() => setLightbox(p)}
                >
                  <div className={`relative ${p.size === 'large' ? 'aspect-[4/3]' : 'aspect-square'}`}>
                    <Image src={p.src} alt={p.alt} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-xs font-medium">{p.alt}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* CTA */}
          <div className="mt-12 bg-red-50 border border-red-100 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-extrabold text-red-700 mb-2">Muốn có mặt trong những khoảnh khắc này?</h3>
            <p className="text-gray-600 text-sm mb-5">Đăng ký học tại Tiếng Trung Hiện Đại và trở thành một phần của cộng đồng học viên sôi động!</p>
            <button onClick={openRegistrationModal} className="btn-primary">Đăng ký học ngay →</button>
          </div>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
              onClick={() => setLightbox(null)}
            >
              <motion.div
                initial={{ scale: 0.85 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.85 }}
                className="relative max-w-3xl w-full max-h-[80vh] rounded-xl overflow-hidden"
                onClick={e => e.stopPropagation()}
              >
                <Image src={lightbox.src} alt={lightbox.alt} width={900} height={600} className="w-full h-auto object-contain" />
                <p className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm font-medium p-3 text-center">{lightbox.alt}</p>
              </motion.div>
              <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
      <RegistrationModal />
    </>
  );
}
