'use client';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Sidebar from '../../../components/Sidebar';
import RegistrationModal, { openRegistrationModal } from '../../../components/RegistrationModal';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5006/api';

const PAGE_META = {
  'van-hoa': {
    title: 'Văn Hóa Trung Quốc',
    subtitle: 'Khám phá nét đặc sắc trong văn hóa, phong tục và lễ hội Trung Quốc',
    category: 'Văn hóa',
    image: 'https://picsum.photos/seed/culture-china/1200/400',
  },
  'uu-dai': {
    title: 'Chương Trình Ưu Đãi',
    subtitle: 'Cập nhật các ưu đãi học phí, học bổng và chương trình khuyến mãi mới nhất',
    category: 'Ưu đãi',
    image: 'https://picsum.photos/seed/promotion/1200/400',
  },
  'huu-ich': {
    title: 'Thông Tin Hữu Ích',
    subtitle: 'Mẹo học tiếng Trung, tài liệu và kinh nghiệm từ học viên',
    category: 'Mẹo học',
    image: 'https://picsum.photos/seed/useful-info/1200/400',
  },
};

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export default function TinTucCategoryPage() {
  const { slug } = useParams();
  const meta = PAGE_META[slug] || PAGE_META['huu-ich'];
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/articles/recent`)
      .then((r) => r.json())
      .then((data) => {
        // Filter by category or show all if not matching
        const filtered = data.filter((a) =>
          a.category?.toLowerCase().includes(meta.category.toLowerCase()) ||
          meta.category === 'Mẹo học'
        );
        setArticles(filtered.length > 0 ? filtered : data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug, meta.category]);

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <div className="relative h-48 md:h-64 overflow-hidden">
          <Image src={meta.image} alt={meta.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
          <div className="absolute bottom-0 left-0 right-0 p-6 container-custom">
            <p className="text-white/60 text-xs mb-2">
              <Link href="/" className="hover:text-white">Trang chủ</Link>
              {' / '}
              <Link href="/#tin-tuc" className="hover:text-white">Tin tức</Link>
              {' / '}
              <span className="text-white/80">{meta.title}</span>
            </p>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">{meta.title}</h1>
            <p className="text-white/80 mt-1 text-sm">{meta.subtitle}</p>
          </div>
        </div>

        {/* Body: main + sidebar */}
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">

            {/* Main content */}
            <div>
              {loading ? (
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-gray-100 rounded-xl h-32 animate-pulse" />
                  ))}
                </div>
              ) : articles.length === 0 ? (
                <div className="text-center py-20 text-gray-400">Chưa có bài viết nào.</div>
              ) : (
                <div className="space-y-6">
                  {articles.map((article, i) => (
                    <motion.article
                      key={article.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.07 }}
                    >
                      <Link href={`/bai-viet/${article.slug}`} className="flex gap-5 group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-4">
                        {/* Thumbnail */}
                        <div className="relative w-36 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                          <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-400" />
                        </div>
                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded uppercase">
                              {article.category}
                            </span>
                            <span className="text-gray-400 text-xs">{formatDate(article.created_at)}</span>
                          </div>
                          <h2 className="font-bold text-gray-900 text-base line-clamp-2 group-hover:text-red-600 transition-colors mb-1">
                            {article.title}
                          </h2>
                          <p className="text-gray-500 text-sm line-clamp-2">{article.excerpt}</p>
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </div>
              )}

              {/* CTA */}
              <div className="mt-10 bg-red-50 border border-red-100 rounded-2xl p-8 text-center">
                <h3 className="text-xl font-extrabold text-red-700 mb-2">Muốn học tiếng Trung hiệu quả?</h3>
                <p className="text-gray-600 mb-5 text-sm">Đăng ký tư vấn miễn phí tại Tiếng Trung Hiện Đại ngay hôm nay!</p>
                <button onClick={openRegistrationModal} className="btn-primary">
                  Đăng ký tư vấn →
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
