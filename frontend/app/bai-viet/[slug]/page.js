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

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export default function ArticleDetail() {
  const { slug } = useParams();
  const router = useRouter();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/articles/${slug}`)
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((data) => { setArticle(data); setLoading(false); })
      .catch(() => { setLoading(false); router.push('/'); });
  }, [slug, router]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
  if (!article) return null;

  return (
    <>
      <Header />
      <main>
        {/* Cover */}
        <div className="relative h-52 md:h-80 overflow-hidden">
          <Image src={article.image} alt={article.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
          <div className="absolute bottom-0 left-0 right-0 p-6 container-custom">
            <p className="text-white/60 text-xs mb-2">
              <Link href="/" className="hover:text-white">Trang chủ</Link>
              {' / '}
              <Link href="/#tin-tuc" className="hover:text-white">Tin tức</Link>
              {' / '}
              <span className="text-white/80">{article.title}</span>
            </p>
            <div className="flex items-center gap-3 mb-2 text-sm text-white/70">
              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium">{article.category}</span>
              <span>{formatDate(article.created_at)}</span>
              <span>✍️ {article.author}</span>
            </div>
            <h1 className="text-xl md:text-3xl font-extrabold text-white leading-tight">{article.title}</h1>
          </div>
        </div>

        {/* Body: article + sidebar */}
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">

            {/* Article content */}
            <article>
              <p className="text-gray-500 text-lg italic border-l-4 border-red-600 pl-5 mb-8">{article.excerpt}</p>
              <div
                className="prose prose-sm md:prose max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: article.content || `<p>${article.excerpt}</p>` }}
              />

              {/* CTA block */}
              <div className="mt-10 bg-red-50 border border-red-100 rounded-2xl p-6">
                <h3 className="text-lg font-extrabold text-red-700 mb-2">Muốn học tiếng Trung hiệu quả?</h3>
                <p className="text-gray-600 text-sm mb-4">Đăng ký tư vấn miễn phí tại Tiếng Trung Hiện Đại ngay hôm nay!</p>
                <button onClick={openRegistrationModal} className="btn-primary">
                  Đăng ký tư vấn →
                </button>
              </div>
            </article>

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
