'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5006/api';

// Facebook-style review card
function ReviewCard({ t, i, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.08 }}
      className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
    >
      {/* Card header (Facebook style) */}
      <div className="p-4 pb-3">
        <div className="flex items-center gap-3 mb-3">
          {/* Avatar */}
          <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gray-100">
            <Image src={t.photo} alt={t.student_name} fill className="object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-gray-900 text-sm truncate">{t.student_name}</div>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              {/* Stars */}
              <div className="flex gap-0.5">
                {[...Array(t.rating || 5)].map((_, j) => (
                  <svg key={j} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span>đã đánh giá</span>
            </div>
          </div>
          {/* Facebook logo badge */}
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </div>
        </div>

        {/* Review text */}
        <p className="text-gray-700 text-sm leading-relaxed line-clamp-4 mb-3">
          "{t.review}"
        </p>

        {/* Success story tag */}
        <div className="flex items-center gap-1.5 bg-red-50 rounded-lg px-3 py-1.5">
          <span className="text-red-500 text-xs">🏆</span>
          <span className="text-red-700 text-xs font-medium line-clamp-1">{t.success_story}</span>
        </div>
      </div>

      {/* Course tag at bottom */}
      <div className="bg-gray-50 border-t border-gray-100 px-4 py-2">
        <span className="text-gray-500 text-xs">Khóa học: </span>
        <span className="text-red-600 text-xs font-semibold">{t.course}</span>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    fetch(`${API_URL}/testimonials`)
      .then((r) => r.json())
      .then(setTestimonials)
      .catch(console.error);
  }, []);

  const displayed = showAll ? testimonials : testimonials.slice(0, 6);

  return (
    <section className="py-12 md:py-16 bg-gray-50 border-t border-gray-100" ref={ref} id="cam-nhan">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="h-px w-12 bg-red-300" />
            <span className="text-red-600 font-bold text-xs uppercase tracking-widest">❤ CẢM NHẬN CỦA HỌC VIÊN</span>
            <div className="h-px w-12 bg-red-300" />
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 uppercase tracking-wide">
            Học Viên Nói Gì Về Chúng Tôi?
          </h2>
        </motion.div>

        {/* ── Grid of FB-style review cards ── */}
        {testimonials.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayed.map((t, i) => (
              <ReviewCard key={t.id} t={t} i={i} inView={inView} />
            ))}
          </div>
        )}

        {/* Show more */}
        {testimonials.length > 6 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-bold px-8 py-3 rounded-lg transition-all duration-200 text-sm uppercase tracking-wide"
            >
              {showAll ? 'Thu gọn ↑' : 'Xem thêm đánh giá →'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
