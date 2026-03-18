'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const quickLinks = [
  {
    label: 'LỊCH KHAI GIẢNG',
    href: '#khoa-hoc',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: 'THÔNG TIN HỌC BỔNG',
    href: '#hoc-bong',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
  },
  {
    label: 'CHƯƠNG TRÌNH ƯU ĐÃI',
    href: '#lien-he',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
  },
  {
    label: 'CẢM NHẬN HỌC VIÊN',
    href: '#cam-nhan',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
];

export default function Activities() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const scrollTo = (href) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={ref} className="bg-white py-8 md:py-12 border-t border-gray-100">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

          {/* ── Left: Classroom photo ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative rounded-xl overflow-hidden shadow-lg"
            style={{ minHeight: 320 }}
          >
            <Image
              src="https://picsum.photos/seed/classroom-group/800/500"
              alt="Hoạt động giảng dạy tại Trung tâm"
              fill
              className="object-cover"
            />
            {/* Red caption bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-red-600 py-2.5 px-4">
              <p className="text-white font-bold text-xs md:text-sm text-center tracking-wide uppercase">
                HOẠT ĐỘNG GIẢNG DẠY TẠI TRUNG TÂM TIẾNG TRUNG HIỆN ĐẠI
              </p>
            </div>
          </motion.div>

          {/* ── Right: 2×2 Quick-access boxes ── */}
          <div className="grid grid-cols-2 gap-4">
            {quickLinks.map((item, i) => (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onClick={() => scrollTo(item.href)}
                className="flex flex-col items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white rounded-xl p-6 transition-all duration-200 hover:shadow-xl hover:-translate-y-1 min-h-[130px] group"
              >
                <div className="group-hover:scale-110 transition-transform duration-200">
                  {item.icon}
                </div>
                <span className="font-bold text-xs md:text-sm text-center leading-tight tracking-wide uppercase">
                  {item.label}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
