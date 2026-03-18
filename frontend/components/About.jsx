'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const highlights = [
  { icon: '🏅', text: 'Top 3 trung tâm tiếng Trung uy tín Đà Nẵng' },
  { icon: '📚', text: 'Giáo trình chuẩn quốc tế HSK mới nhất' },
  { icon: '🌏', text: 'Giảng viên tu nghiệp tại Bắc Kinh & Thượng Hải' },
  { icon: '💼', text: 'Kết nối việc làm cho học viên xuất sắc' },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <Image
                src="https://picsum.photos/seed/classroom-about/800/600"
                alt="Lớp học Tiếng Trung Hiệp Lâm"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-5 -right-5 bg-red-600 text-white rounded-2xl p-5 shadow-xl">
              <div className="text-3xl font-extrabold">10+</div>
              <div className="text-xs text-red-100">Năm kinh nghiệm</div>
            </div>
            {/* Floating badge 2 */}
            <div className="absolute -top-5 -left-5 bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
              <div className="text-2xl font-extrabold text-red-600">5000+</div>
              <div className="text-xs text-gray-500">Học viên đã học</div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className="badge bg-red-100 text-red-600 mb-3">Về chúng tôi</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-5 leading-tight">
              Trung Tâm Tiếng Trung{' '}
              <span className="gradient-text">Hiệp Lâm</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-5">
              Được thành lập từ năm 2014, Trung tâm Tiếng Trung Hiệp Lâm đã trở thành một trong những địa chỉ học tiếng Trung uy tín hàng đầu tại Đà Nẵng. Chúng tôi tự hào đã đồng hành và giúp hơn 5.000 học viên chinh phục tiếng Trung.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Với triết lý giảng dạy <strong>"Thực tế - Hiệu quả - Cam kết"</strong>, chúng tôi không chỉ dạy ngôn ngữ mà còn giúp học viên hiểu văn hóa, tư duy người Trung Quốc để ứng dụng thực tế trong công việc và cuộc sống.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {highlights.map((h) => (
                <div key={h.text} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                  <span className="text-xl">{h.icon}</span>
                  <span className="text-sm font-medium text-gray-700">{h.text}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => document.getElementById('lien-he')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary"
            >
              Tìm hiểu thêm →
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
