'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5006/api';

const categories = [
  { label: 'Khóa học', href: '/#khoa-hoc' },
  { label: 'Giới thiệu', href: '/gioi-thieu/ve-trung-tam' },
  { label: 'Văn hóa', href: '/tin-tuc/van-hoa' },
  { label: 'Thông tin học bổng', href: '/#hoc-bong' },
  { label: 'Ngữ pháp', href: '/thu-vien/chia-se-kien-thuc' },
  { label: 'Ưu đãi', href: '/tin-tuc/uu-dai' },
  { label: 'Thông tin hữu ích', href: '/tin-tuc/huu-ich' },
  { label: 'Chia sẻ kiến thức', href: '/thu-vien/chia-se-kien-thuc' },
];

function formatDateBadge(dateStr) {
  if (!dateStr) return { day: '--', month: '--' };
  const d = new Date(dateStr);
  return {
    day: String(d.getDate()).padStart(2, '0'),
    month: `Th${d.getMonth() + 1}`,
  };
}

export default function Sidebar() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/articles/recent`)
      .then((r) => r.json())
      .then((data) => setArticles(data.slice(0, 3)))
      .catch(console.error);
  }, []);

  return (
    <aside className="space-y-8">

      {/* ── CHUYÊN MỤC ── */}
      <div>
        <h3 className="font-extrabold text-gray-900 text-sm uppercase tracking-wider mb-2">
          CHUYÊN MỤC
        </h3>
        <div className="h-0.5 bg-gray-200 mb-4" />
        <ul>
          {categories.map((cat) => (
            <li key={cat.label}>
              <Link
                href={cat.href}
                className="block py-2.5 text-sm text-red-600 hover:text-red-700 hover:pl-2 transition-all duration-150 border-b border-gray-100"
              >
                {cat.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* ── TIN MỚI NHẤT ── */}
      <div>
        <h3 className="font-extrabold text-gray-900 text-sm uppercase tracking-wider mb-2">
          TIN MỚI NHẤT
        </h3>
        <div className="h-0.5 bg-gray-200 mb-4" />
        <ul className="space-y-4">
          {articles.map((article) => {
            const badge = formatDateBadge(article.created_at);
            return (
              <li key={article.id}>
                <Link href={`/bai-viet/${article.slug}`} className="flex items-start gap-3 group">
                  {/* Thumbnail + date badge */}
                  <div className="relative w-[70px] h-[70px] flex-shrink-0 rounded overflow-hidden bg-gray-200">
                    {article.image && (
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                    {/* Date badge overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-red-600 text-white text-center leading-tight py-0.5">
                      <div className="font-extrabold text-xs">{badge.day}</div>
                      <div className="text-[10px] font-medium">{badge.month}</div>
                    </div>
                  </div>

                  {/* Title */}
                  <p className="text-xs font-bold text-gray-800 uppercase leading-snug group-hover:text-red-600 transition-colors line-clamp-3 flex-1">
                    {article.title}
                  </p>
                </Link>
                <div className="h-px bg-gray-100 mt-4" />
              </li>
            );
          })}
        </ul>
      </div>

      {/* ── CTA box ── */}
      <div className="bg-red-600 rounded-xl p-6 text-center text-white">
        <div className="text-2xl mb-2">📞</div>
        <p className="font-bold text-sm mb-1">Tư vấn miễn phí</p>
        <a href="tel:0985651306" className="block text-xl font-extrabold hover:text-yellow-300 transition-colors">
          098 565 1306
        </a>
      </div>
    </aside>
  );
}
