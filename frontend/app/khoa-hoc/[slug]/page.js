'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Sidebar from '../../../components/Sidebar';
import RegistrationModal, { openRegistrationModal } from '../../../components/RegistrationModal';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5006/api';

export default function CourseDetail() {
  const { slug } = useParams();
  const router = useRouter();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/courses/${slug}`)
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((data) => { setCourse(data); setLoading(false); })
      .catch(() => { setLoading(false); router.push('/'); });
  }, [slug, router]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
  if (!course) return null;

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <div className="relative h-52 md:h-72 overflow-hidden">
          <Image src={course.image} alt={course.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />
          <div className="absolute bottom-0 left-0 right-0 p-6 container-custom">
            <p className="text-white/60 text-xs mb-2">
              <Link href="/" className="hover:text-white">Trang chủ</Link>
              {' / '}
              <Link href="/#khoa-hoc" className="hover:text-white">Khóa học</Link>
              {' / '}
              <span className="text-white/80">{course.title}</span>
            </p>
            <h1 className="text-2xl md:text-4xl font-extrabold text-white">{course.title}</h1>
            {course.subtitle && <p className="text-white/80 mt-1 text-sm">{course.subtitle}</p>}
          </div>
        </div>

        {/* Body: main + sidebar */}
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">

            {/* Main */}
            <div>
              {/* Info bar */}
              <div className="grid grid-cols-3 gap-4 bg-gray-50 rounded-xl p-5 mb-8 border border-gray-100">
                {[
                  { icon: '📊', label: 'Trình độ', value: course.level },
                  { icon: '⏱️', label: 'Thời gian', value: course.duration },
                  { icon: '📚', label: 'Số buổi', value: course.sessions },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className="text-2xl mb-1">{item.icon}</div>
                    <div className="text-xs text-gray-500 mb-0.5">{item.label}</div>
                    <div className="text-sm font-bold text-gray-900">{item.value}</div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <h2 className="text-xl font-extrabold text-gray-900 mb-3">Mô tả khóa học</h2>
              <p className="text-gray-600 leading-relaxed mb-8 text-base">{course.description}</p>

              {/* What you learn */}
              <h2 className="text-xl font-extrabold text-gray-900 mb-4">Học viên sẽ được gì?</h2>
              <ul className="space-y-3 mb-8">
                {[
                  'Nắm vững từ vựng và ngữ pháp theo chuẩn HSK',
                  'Giao tiếp tự tin trong các tình huống thực tế',
                  'Luyện 4 kỹ năng: Nghe – Nói – Đọc – Viết',
                  'Được cung cấp đầy đủ tài liệu học tập miễn phí',
                  'Hỗ trợ ôn tập và giải đáp thắc mắc 24/7',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Register CTA inline */}
              <div className="bg-red-50 border border-red-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-1">
                  <p className="font-extrabold text-red-700 text-lg mb-1">Đăng ký tư vấn miễn phí</p>
                  <p className="text-gray-600 text-sm">Học thử 1 buổi không mất phí · Tư vấn lộ trình cá nhân hóa</p>
                </div>
                <button
                  onClick={openRegistrationModal}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-7 py-3.5 rounded-xl transition-colors whitespace-nowrap text-sm flex-shrink-0"
                >
                  Đăng ký ngay →
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <Sidebar />
          </div>
        </div>
      </main>
      <Footer />
      <RegistrationModal />
    </>
  );
}
