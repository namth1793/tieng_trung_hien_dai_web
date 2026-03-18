'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { openRegistrationModal } from './RegistrationModal';

export default function Hero() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-white overflow-hidden" style={{ minHeight: 520 }}>
      {/* Red top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-red-600" />

      {/* Background decorative shapes */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-50 to-transparent" />
      <div className="absolute -top-8 -left-8 w-32 h-32 border-[40px] border-red-100 rounded-full opacity-60" />
      <div className="absolute bottom-0 left-1/4 w-20 h-20 border-[30px] border-red-100 rounded-full opacity-40" />

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center min-h-[520px] py-8 lg:py-0">

          {/* ── Left: Content ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 py-10 lg:py-16"
          >
            {/* Decorative % top-left */}
            <div className="absolute -top-2 -left-4 text-gray-200 font-black text-6xl select-none hidden md:block">%</div>

            {/* Main headline */}
            <div className="relative mb-2">
              {/* Dot + ĐƯỢC RỒI HỌC THÔI */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-black leading-none tracking-tight text-red-600 uppercase"
                style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', lineHeight: 1.05 }}
              >
                <span className="text-gray-300 mr-1">.</span>ĐƯỢC RỒI
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="font-black leading-none tracking-tight text-red-600 uppercase mb-3"
                style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', lineHeight: 1.05 }}
              >
                HỌC THÔI
              </motion.h1>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-gray-700 font-bold text-sm md:text-base tracking-widest uppercase mb-3"
            >
              TIẾNG TRUNG CƠ BẢN ĐẾN NÂNG CAO
            </motion.p>

            {/* Sale banner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-block bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-black px-5 py-2.5 rounded-lg text-sm md:text-base mb-4 shadow-md"
            >
              ƯU ĐÃI HỌC PHÍ LÊN TỚI 2.000.000Đ
            </motion.div>

            {/* Three dots */}
            <div className="flex gap-2 mb-3">
              <span className="w-3 h-3 rounded-full bg-red-600 inline-block" />
              <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" />
            </div>

            {/* Bottom text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-gray-600 font-semibold text-xs md:text-sm tracking-widest uppercase mb-6"
            >
              CHẤT LƯỢNG ĐÀO TẠO CHUẨN ĐẠI HỌC QUỐC GIA
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <button
                onClick={openRegistrationModal}
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-7 py-3.5 rounded-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 text-sm uppercase tracking-wide"
              >
                Đăng ký tư vấn
              </button>
              <button
                onClick={() => scrollTo('khoa-hoc')}
                className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-bold px-7 py-3.5 rounded-lg transition-all duration-200 text-sm uppercase tracking-wide"
              >
                Xem khóa học
              </button>
            </motion.div>
          </motion.div>

          {/* ── Right: Photo ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative hidden lg:flex items-end justify-center h-full"
            style={{ minHeight: 480 }}
          >
            {/* Decorative + signs */}
            <span className="absolute top-8 left-8 text-red-300 font-black text-4xl select-none">+</span>
            <span className="absolute top-16 right-12 text-red-200 font-black text-5xl select-none">+</span>
            <span className="absolute bottom-20 left-4 text-gray-200 font-black text-6xl select-none">%</span>
            <span className="absolute top-4 right-4 text-gray-200 font-black text-4xl select-none">%</span>

            {/* Red circle decoration */}
            <div className="absolute top-10 right-8 w-16 h-16 bg-red-100 rounded-full" />
            <div className="absolute bottom-24 right-16 w-8 h-8 bg-red-200 rounded-full" />

            {/* Student/Teacher photo */}
            <div className="relative w-full h-[480px]">
              <Image
                src="https://picsum.photos/seed/hero-student-male/600/800"
                alt="Học viên tiếng Trung"
                fill
                className="object-cover object-top"
                priority
                style={{ borderRadius: '0 0 0 60px' }}
              />
              {/* Bottom fade */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
