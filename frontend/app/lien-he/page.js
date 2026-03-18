'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import RegistrationModal, { openRegistrationModal } from '../../components/RegistrationModal';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5006/api';

const branches = [
  {
    name: 'Cơ sở 1 — Trung tâm Đà Nẵng',
    address: '123 Nguyễn Văn Linh, Q. Thanh Khê, Đà Nẵng',
    phone: '098 565 1306',
    hours: 'T2–T7: 8:00–21:00 | CN: 8:00–17:00',
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.1!2d108.1!3d16.06!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDAzJzM2LjAiTiAxMDjCsDA2JzAwLjAiRQ!5e0!3m2!1svi!2s!4v1',
  },
  {
    name: 'Cơ sở 2 — Hải Châu',
    address: '456 Lê Duẩn, Q. Hải Châu, Đà Nẵng',
    phone: '098 565 1307',
    hours: 'T2–T7: 8:00–21:00 | CN: Nghỉ',
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.1!2d108.21!3d16.07!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDA0JzEyLjAiTiAxMDjCsDEyJzM2LjAiRQ!5e0!3m2!1svi!2s!4v1',
  },
];

const contactMethods = [
  { icon: '📞', label: 'Hotline', value: '098 565 1306', href: 'tel:0985651306', color: 'bg-red-100 text-red-700' },
  { icon: '💬', label: 'Zalo', value: '098 565 1306', href: 'https://zalo.me/0985651306', color: 'bg-blue-100 text-blue-700' },
  { icon: '📘', label: 'Facebook', value: 'Tiếng Trung Hiện Đại', href: '#', color: 'bg-indigo-100 text-indigo-700' },
  { icon: '📧', label: 'Email', value: 'info@tiengtrunghiendai.vn', href: 'mailto:info@tiengtrunghiendai.vn', color: 'bg-green-100 text-green-700' },
];

export default function LienHePage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', method: 'Zalo' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await fetch(`${API_URL}/registrations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, course: 'Liên hệ chung', study_format: 'Offline' }),
      });
      setStatus('success');
      setForm({ name: '', email: '', phone: '', message: '', method: 'Zalo' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <div className="relative h-48 md:h-60 overflow-hidden bg-red-600">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(https://picsum.photos/seed/contact-bg/1200/400)', backgroundSize: 'cover' }} />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <p className="text-white/60 text-sm mb-2">
              <Link href="/" className="hover:text-white">Trang chủ</Link> / Liên hệ
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">📬 Liên Hệ Với Chúng Tôi</h1>
            <p className="text-red-100">Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7</p>
          </div>
        </div>

        <div className="container-custom py-12">
          {/* Contact methods */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {contactMethods.map(c => (
              <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer"
                className={`${c.color} rounded-xl p-4 text-center hover:scale-105 transition-transform`}>
                <div className="text-2xl mb-1">{c.icon}</div>
                <p className="font-bold text-sm">{c.label}</p>
                <p className="text-xs mt-0.5 font-medium">{c.value}</p>
              </a>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact form */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="text-xl font-extrabold text-gray-900 mb-6">Gửi Tin Nhắn Cho Chúng Tôi</h2>
              {status === 'success' ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
                  <div className="text-4xl mb-3">✅</div>
                  <h3 className="font-extrabold text-green-700 text-lg mb-2">Đã gửi thành công!</h3>
                  <p className="text-green-600 text-sm mb-5">Chúng tôi sẽ liên hệ lại trong vòng 30 phút trong giờ làm việc.</p>
                  <button onClick={() => setStatus('idle')} className="btn-primary text-sm">Gửi tin nhắn khác</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Họ và tên *</label>
                      <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="Nguyễn Văn A"
                        className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 outline-none text-sm transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Số điện thoại *</label>
                      <input required value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        placeholder="098 765 4321"
                        className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 outline-none text-sm transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
                    <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="email@example.com"
                      className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 outline-none text-sm transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phương thức liên lạc</label>
                    <div className="flex gap-3">
                      {['Zalo', 'Facebook', 'Gọi điện', 'Email'].map(m => (
                        <label key={m} className="flex items-center gap-1.5 cursor-pointer">
                          <input type="radio" name="method" value={m} checked={form.method === m}
                            onChange={() => setForm(f => ({ ...f, method: m }))} className="accent-red-600" />
                          <span className="text-sm text-gray-700">{m}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nội dung cần hỏi</label>
                    <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="Ví dụ: Tôi muốn hỏi về khóa HSK 3, học phí và lịch học..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 outline-none text-sm transition-all resize-none" />
                  </div>
                  <button type="submit" disabled={status === 'loading'}
                    className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white font-bold py-3.5 rounded-xl transition-colors text-sm">
                    {status === 'loading' ? 'Đang gửi...' : 'Gửi tin nhắn →'}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Branches */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <h2 className="text-xl font-extrabold text-gray-900 mb-6">Địa Chỉ Các Cơ Sở</h2>
              <div className="space-y-6">
                {branches.map((b, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-5">
                      <h3 className="font-extrabold text-gray-900 text-base mb-3">{b.name}</h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>📍 {b.address}</p>
                        <p>📞 <a href={`tel:${b.phone.replace(/\s/g, '')}`} className="text-red-600 font-semibold hover:underline">{b.phone}</a></p>
                        <p>🕐 {b.hours}</p>
                      </div>
                    </div>
                    <iframe
                      src={b.map}
                      className="w-full h-40 border-0"
                      allowFullScreen loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
      <RegistrationModal />
    </>
  );
}
