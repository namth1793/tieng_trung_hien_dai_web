'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5006/api';

const levels = [
  'Mới bắt đầu (chưa biết gì)',
  'Cơ bản (HSK 1-2)',
  'Trung cấp (HSK 3-4)',
  'Nâng cao (HSK 5-6)',
  'Tiếng Trung Thương Mại',
  'Thiếu nhi',
  'Lớp 1-1 cá nhân',
];

const OPEN_EVENT = 'openRegModal';

// Call this from anywhere to open the modal
export function openRegistrationModal() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(OPEN_EVENT));
  }
}

export default function RegistrationModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    level: '',
    contact_method: '',
    study_format: 'Online',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const overlayRef = useRef(null);

  // Listen for open event from anywhere
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, handler);
    return () => window.removeEventListener(OPEN_EVENT, handler);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const close = () => {
    setOpen(false);
    setSuccess(false);
    setError('');
  };

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      setError('Vui lòng điền họ tên và số điện thoại.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/registrations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          contact_method: form.contact_method || 'Zalo',
          study_format: form.study_format,
          message: `Trình độ: ${form.level || 'Chưa chọn'}. ${form.message}`,
        }),
      });
      if (res.ok) {
        setSuccess(true);
        setForm({ name: '', email: '', phone: '', level: '', contact_method: '', study_format: 'Online', message: '' });
      } else {
        const data = await res.json();
        setError(data.error || 'Có lỗi xảy ra. Vui lòng thử lại.');
      }
    } catch {
      setError('Không thể kết nối server. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        // Backdrop
        <motion.div
          ref={overlayRef}
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
          onClick={(e) => { if (e.target === overlayRef.current) close(); }}
        >
          {/* Modal panel */}
          <motion.div
            key="modal-panel"
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 20 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
          >
            {/* Close button */}
            <button
              onClick={close}
              className="absolute top-3 right-3 z-10 w-8 h-8 bg-gray-800 hover:bg-gray-900 text-white rounded-full flex items-center justify-center transition-colors"
              aria-label="Đóng"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="px-8 py-8">
              {success ? (
                /* ── Success state ── */
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Đăng ký thành công!</h3>
                  <p className="text-gray-500 text-sm mb-6">
                    Chúng tôi đã nhận được thông tin và sẽ liên hệ với bạn trong vòng 30 phút.
                  </p>
                  <button
                    onClick={close}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2.5 rounded-lg transition-colors text-sm"
                  >
                    Đóng
                  </button>
                </div>
              ) : (
                /* ── Form ── */
                <>
                  {/* Title */}
                  <h2 className="text-red-600 font-extrabold text-center text-lg uppercase tracking-wide mb-1">
                    ĐĂNG KÝ TƯ VẤN VÀ HỌC THỬ MIỄN PHÍ
                  </h2>
                  <div className="h-0.5 bg-red-600 mb-4" />

                  {/* Description */}
                  <p className="text-gray-600 text-sm text-center leading-relaxed mb-5">
                    Trung tâm tự hào về đội ngũ giáo viên kiến thức chuyên môn vững về chuyên môn, chắc về kĩ năng sư phạm, nhiệt tình và tâm huyết với học viên.
                  </p>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-2.5 text-xs mb-4">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-3">
                    {/* Name */}
                    <input
                      type="text" name="name" value={form.name} onChange={handleChange}
                      placeholder="Tên của bạn"
                      className="w-full bg-gray-100 rounded-full px-5 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:bg-white transition-all"
                      required
                    />

                    {/* Email */}
                    <input
                      type="email" name="email" value={form.email} onChange={handleChange}
                      placeholder="Email của bạn"
                      className="w-full bg-gray-100 rounded-full px-5 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:bg-white transition-all"
                    />

                    {/* Phone */}
                    <input
                      type="tel" name="phone" value={form.phone} onChange={handleChange}
                      placeholder="Số điện thoại của bạn"
                      className="w-full bg-gray-100 rounded-full px-5 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:bg-white transition-all"
                      required
                    />

                    {/* Level select */}
                    <div className="relative">
                      <select
                        name="level" value={form.level} onChange={handleChange}
                        className="w-full bg-gray-100 rounded-full px-5 py-3 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:bg-white transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Chọn trình độ</option>
                        {levels.map((l) => (
                          <option key={l} value={l}>{l}</option>
                        ))}
                      </select>
                      {/* Chevron */}
                      <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>

                    {/* Contact method */}
                    <input
                      type="text" name="contact_method" value={form.contact_method} onChange={handleChange}
                      placeholder="Phương thức liên lạc (Zalo, Facebook, ...)"
                      className="w-full bg-gray-100 rounded-full px-5 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:bg-white transition-all"
                    />

                    {/* Study format */}
                    <div>
                      <p className="text-sm font-bold text-gray-800 text-center mb-2">Hình thức học tập:</p>
                      <div className="flex justify-center gap-8">
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

                    {/* Message textarea */}
                    <textarea
                      name="message" value={form.message} onChange={handleChange}
                      placeholder=""
                      rows={4}
                      className="w-full bg-gray-100 rounded-2xl px-5 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:bg-white transition-all resize-none"
                    />

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gray-900 hover:bg-black disabled:bg-gray-600 text-white font-extrabold py-3.5 rounded-full transition-colors uppercase tracking-widest text-sm"
                    >
                      {loading ? 'Đang gửi...' : 'GỬI YÊU CẦU TƯ VẤN'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
