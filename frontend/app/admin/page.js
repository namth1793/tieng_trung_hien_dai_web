'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5006/api';

const statCards = [
  { key: 'new_registrations', label: 'Đăng ký mới', icon: '🔔', color: 'bg-red-500', href: '/admin/dang-ky' },
  { key: 'registrations', label: 'Tổng đăng ký', icon: '📋', color: 'bg-blue-500', href: '/admin/dang-ky' },
  { key: 'courses', label: 'Khóa học', icon: '📚', color: 'bg-green-500', href: '/admin/khoa-hoc' },
  { key: 'articles', label: 'Bài viết', icon: '📰', color: 'bg-yellow-500', href: '/admin/bai-viet' },
  { key: 'teachers', label: 'Giáo viên', icon: '👨‍🏫', color: 'bg-purple-500', href: '/admin/giao-vien' },
  { key: 'videos', label: 'Video', icon: '🎬', color: 'bg-pink-500', href: '/admin/video' },
];

const quickLinks = [
  { label: 'Thêm khóa học mới', href: '/admin/khoa-hoc?action=new', icon: '➕' },
  { label: 'Thêm bài viết mới', href: '/admin/bai-viet?action=new', icon: '✏️' },
  { label: 'Thêm giáo viên mới', href: '/admin/giao-vien?action=new', icon: '👤' },
  { label: 'Xem đăng ký tư vấn', href: '/admin/dang-ky', icon: '📋' },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    fetch(`${API_URL}/admin/stats`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then(setStats)
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Tổng quan nội dung website</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {statCards.map((card) => (
          <Link key={card.key} href={card.href}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-center gap-4 group">
            <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center text-xl flex-shrink-0`}>
              {card.icon}
            </div>
            <div>
              <div className="text-2xl font-extrabold text-gray-900 group-hover:text-red-600 transition-colors">
                {stats ? stats[card.key] : '—'}
              </div>
              <div className="text-xs text-gray-500">{card.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick links */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h2 className="font-extrabold text-gray-900 mb-4">Thao tác nhanh</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quickLinks.map((link) => (
            <Link key={link.label} href={link.href}
              className="flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-xl hover:border-red-300 hover:bg-red-50 transition-all group text-sm font-medium text-gray-700 hover:text-red-600">
              <span className="text-lg">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
