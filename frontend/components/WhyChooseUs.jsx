'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const reasons = [
  'Đội ngũ giáo viên trình độ chuyên môn cao',
  'Giáo trình và lộ trình học rõ ràng, bài bản',
  'Công tác hỗ trợ học viên tận tình, chu đáo',
  'Hình thức học tập phù hợp và các lớp tiêu chuẩn',
  'Học liệu tặng kèm theo khóa học',
];

export default function WhyChooseUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-12 md:py-16 bg-white border-t border-gray-100" ref={ref}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left: Numbered list ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Section title with checkmark */}
            <div className="flex items-center gap-2 mb-7">
              <div className="w-7 h-7 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-base md:text-lg font-extrabold text-gray-900 uppercase tracking-wide">
                TẠI SAO NÊN CHỌN TIẾNG TRUNG HIỆN ĐẠI
              </h2>
            </div>

            {/* Numbered list */}
            <ol className="space-y-4">
              {reasons.map((reason, i) => (
                <motion.li
                  key={reason}
                  initial={{ opacity: 0, x: -15 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-start gap-4"
                >
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-red-600 text-white font-bold text-sm flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-gray-700 text-sm md:text-base font-medium leading-relaxed">
                    {reason}
                  </span>
                </motion.li>
              ))}
            </ol>
          </motion.div>

          {/* ── Right: Chinese logo/seal + CTA ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col items-center justify-center gap-6 bg-gray-50 rounded-2xl p-10 border border-gray-100"
          >
            {/* Large Chinese seal */}
            <div className="relative">
              {/* Outer ring */}
              <div className="w-40 h-40 rounded-2xl bg-red-600 flex items-center justify-center shadow-2xl border-4 border-red-700 relative">
                {/* Corner marks */}
                <div className="absolute top-1 left-1 w-4 h-4 border-l-2 border-t-2 border-white/40 rounded-tl" />
                <div className="absolute top-1 right-1 w-4 h-4 border-r-2 border-t-2 border-white/40 rounded-tr" />
                <div className="absolute bottom-1 left-1 w-4 h-4 border-l-2 border-b-2 border-white/40 rounded-bl" />
                <div className="absolute bottom-1 right-1 w-4 h-4 border-r-2 border-b-2 border-white/40 rounded-br" />

                {/* Inner content */}
                <div className="text-center">
                  <div className="text-white font-black leading-none mb-1" style={{ fontSize: 56, fontFamily: 'serif', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                    漢語
                  </div>
                  <div className="text-white/80 text-xs tracking-widest border-t border-white/30 pt-1">
                    TRUNG TÂM
                  </div>
                </div>
              </div>
              {/* Decorative shadow */}
              <div className="absolute inset-0 bg-red-900/20 rounded-2xl translate-x-2 translate-y-2 -z-10" />
            </div>

            {/* Center name */}
            <div className="text-center">
              <div className="text-gray-900 font-black text-lg tracking-widest uppercase mb-1">
                TIẾNG TRUNG HIỆN ĐẠI
              </div>
              <div className="text-gray-500 text-sm">
                Trung tâm tiếng Trung hàng đầu
              </div>
            </div>

            {/* CTA button */}
            <button
              onClick={() => document.getElementById('gioi-thieu')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-lg transition-all duration-200 hover:shadow-lg text-sm"
            >
              Xem giới thiệu chi tiết
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
