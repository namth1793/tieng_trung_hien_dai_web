'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5006/api';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    fetch(`${API_URL}/courses`)
      .then((r) => r.json())
      .then((data) => { setCourses(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="py-12 md:py-16 bg-gray-50 border-t border-gray-100" ref={ref} id="khoa-hoc">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header (matches screenshot style) ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          {/* Icon + Title row */}
          <div className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full px-6 py-2.5 mb-5 shadow-sm">
            <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span className="font-extrabold text-gray-800 text-sm md:text-base uppercase tracking-wide">
              THÔNG TIN KHÓA HỌC VÀ LỘ TRÌNH HỌC TẬP
            </span>
          </div>

          <p className="text-red-600 text-sm md:text-base font-medium italic max-w-2xl mx-auto">
            Cuộc sống sau công việc bằng tiếng Trung từ chưa biết đến tự tin giao tiếp – những bài học không nhàm chán.
          </p>
        </motion.div>

        {/* ── Course Grid ── */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="rounded-xl overflow-hidden animate-pulse bg-gray-200 aspect-square" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {courses.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: (i % 4) * 0.07 }}
              >
                <Link href={`/khoa-hoc/${course.slug}`} className="block group">
                  <div className="relative rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                    style={{ aspectRatio: '4/3' }}>
                    {/* Background image */}
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Dark red overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-red-900/90 via-red-800/50 to-transparent" />

                    {/* Course label at top */}
                    {course.badge && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-yellow-400 text-gray-900 text-xs font-black px-2 py-0.5 rounded uppercase tracking-wide">
                          {course.badge}
                        </span>
                      </div>
                    )}

                    {/* Course info at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      {/* Level badge */}
                      <div className="mb-1">
                        <span className="text-yellow-300 font-black text-xl md:text-2xl leading-tight block drop-shadow-lg">
                          {course.level}
                        </span>
                      </div>
                      <div className="text-white font-bold text-xs md:text-sm leading-tight">
                        {course.title}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* ── CTA ── */}
        <div className="text-center mt-8">
          <button
            onClick={() => document.getElementById('lien-he')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3.5 rounded-lg transition-all duration-200 hover:shadow-lg text-sm uppercase tracking-wide"
          >
            Đăng ký tư vấn miễn phí →
          </button>
        </div>
      </div>
    </section>
  );
}
