'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5006/api';

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    fetch(`${API_URL}/teachers`)
      .then((r) => r.json())
      .then(setTeachers)
      .catch(console.error);
  }, []);

  return (
    <section className="py-12 md:py-16 bg-white border-t border-gray-100" ref={ref} id="giao-vien">
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
            <span className="text-red-600 font-bold text-xs uppercase tracking-widest">
              ĐỘI NGŨ GIẢNG VIÊN TẠI TIẾNG TRUNG HIỆN ĐẠI
            </span>
            <div className="h-px w-12 bg-red-300" />
          </div>
        </motion.div>

        {/* ── Teacher cards ── (match screenshot: 3 cols, visible text, card style) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teachers.slice(0, 3).map((teacher, i) => (
            <motion.div
              key={teacher.id}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
            >
              {/* Top: photo + stars */}
              <div className="relative">
                <div className="h-56 relative overflow-hidden bg-gray-100">
                  <Image
                    src={teacher.photo}
                    alt={teacher.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Star rating overlay at bottom of photo */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <div className="flex gap-0.5 justify-center">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-extrabold text-gray-900 text-lg mb-0.5 group-hover:text-red-600 transition-colors">
                  {teacher.name}
                </h3>
                <p className="text-red-600 font-semibold text-sm mb-3">{teacher.title}</p>

                {/* Details list */}
                <ul className="space-y-1.5 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold mt-0.5 flex-shrink-0">•</span>
                    <span><strong>Đơn vị công tác:</strong> {teacher.bio?.split('.')[0] || teacher.title}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold mt-0.5 flex-shrink-0">•</span>
                    <span><strong>Học vị:</strong> {teacher.degree}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold mt-0.5 flex-shrink-0">•</span>
                    <span><strong>Chuyên ngành:</strong> Ngôn ngữ Trung Quốc</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold mt-0.5 flex-shrink-0">•</span>
                    <span><strong>Đơn vị đào tạo:</strong> {teacher.university}</span>
                  </li>
                </ul>

                {/* Experience badge */}
                <div className="mt-4 inline-flex items-center gap-1.5 bg-red-50 text-red-600 text-xs font-semibold px-3 py-1.5 rounded-full">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {teacher.years_experience} năm kinh nghiệm
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
