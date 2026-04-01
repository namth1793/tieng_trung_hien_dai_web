'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5006/api';

export default function RegistrationForm() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    contact_method: 'Zalo',
    study_format: 'Offline',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      setError('Vui lòng điền đầy đủ họ tên và số điện thoại.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/registrations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setForm({ name: '', email: '', phone: '', contact_method: 'Zalo', study_format: 'Offline', message: '' });
      } else {
        setError(data.error || 'Có lỗi xảy ra. Vui lòng thử lại.');
      }
    } catch {
      setError('Không thể kết nối đến server. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section ref={ref} id="lien-he" className="py-0 border-t border-gray-100">
      <div className="max-w-screen-xl mx-auto">

        {/* ── Section title (above the 2-col block) ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center py-10 px-4"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="h-px w-12 bg-red-300" />
            <span className="text-red-600 font-bold text-xs uppercase tracking-widest">SỐ ĐĂNG KÝ TƯ VẤN VÀ HỌC THỬ MIỄN PHÍ</span>
            <div className="h-px w-12 bg-red-300" />
          </div>
        </motion.div>

        {/* ── 2-col layout (image left, form right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">

          {/* Left: Red panel + classroom photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative bg-red-600 flex flex-col justify-end overflow-hidden min-h-[300px] lg:min-h-[520px]"
          >
            {/* Background classroom photo */}
            <Image
              src="https://picsum.photos/seed/classroom-register/800/600"
              alt="Lớp học Tiếng Trung"
              fill
              className="object-cover opacity-50"
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-red-800/90 via-red-700/50 to-red-600/30" />

            {/* Content */}
            <div className="relative z-10 p-8 md:p-12">
              <h3 className="text-white font-black text-2xl md:text-3xl leading-tight mb-2">
                Lịch khai giảng
              </h3>
              <h4 className="text-yellow-300 font-bold text-xl md:text-2xl mb-4">
                Online và Offline
              </h4>
              <p className="text-white/80 text-sm leading-relaxed mb-6">
                Trung tâm tư hào và đội ngũ giáo viên kinh nghiệm chuyên môn vững và chuyên môn,
                nhiệt tâm và tận tình làm học viên của mình.
              </p>

              {/* Contact info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white">
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                  <span className="font-bold text-sm">0868 851 331</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm">54 Đường Số 28, Phường Bình Phú, Q6 TPHCM</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white p-8 md:p-12 flex flex-col justify-center"
          >
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Đăng ký thành công!</h3>
                <p className="text-gray-500 text-sm mb-6">
                  Chúng tôi sẽ liên hệ với bạn trong vòng 30 phút.
                </p>
                <button onClick={() => setSuccess(false)} className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-lg transition-colors text-sm">
                  Đăng ký thêm
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">
                    {error}
                  </div>
                )}

                {/* Name */}
                <div>
                  <input
                    type="text" name="name" value={form.name} onChange={handleChange}
                    placeholder="Tên bạn"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email" name="email" value={form.email} onChange={handleChange}
                    placeholder="Email"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                {/* Phone */}
                <div>
                  <input
                    type="tel" name="phone" value={form.phone} onChange={handleChange}
                    placeholder="Số điện thoại"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Contact method: radio buttons */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phương thức liên lạc qua (Zalo, Facebook)
                  </label>
                  <div className="flex gap-6">
                    {['Zalo', 'Facebook'].map((opt) => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio" name="contact_method" value={opt}
                          checked={form.contact_method === opt}
                          onChange={handleChange}
                          className="w-4 h-4 accent-red-600"
                        />
                        <span className="text-sm text-gray-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Study format: radio buttons */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Hình thức học tập</label>
                  <div className="flex gap-6">
                    {['Online', 'Offline'].map((opt) => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio" name="study_format" value={opt}
                          checked={form.study_format === opt}
                          onChange={handleChange}
                          className="w-4 h-4 accent-red-600"
                        />
                        <span className="text-sm text-gray-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <textarea
                    name="message" value={form.message} onChange={handleChange}
                    placeholder="Nội dung yêu cầu"
                    rows={3}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-bold py-3.5 rounded-lg transition-all duration-200 hover:shadow-lg text-sm uppercase tracking-wide"
                >
                  {loading ? 'Đang gửi...' : 'Gửi yêu cầu tư vấn'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
