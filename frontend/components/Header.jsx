'use client';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { openRegistrationModal } from './RegistrationModal';

// ── Data ────────────────────────────────────────────────────────────────────

const topNavLinks = [
  { label: 'Trang chủ', href: '#trang-chu' },
  { label: 'Album ảnh', href: '/album' },
  { label: 'Khuyến mãi', href: '/khuyen-mai' },
  { label: 'Liên hệ', href: '/lien-he' },
];

const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61577436837901',
    icon: (
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@TiengTrungHienDai',
    icon: (
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@user7306614520635',
    icon: (
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
];

const navItems = [
  { label: 'TRANG CHỦ', href: '#trang-chu' },
  {
    label: 'GIỚI THIỆU',
    href: '#gioi-thieu',
    dropdown: [
      { label: 'Về trung tâm', href: '/gioi-thieu/ve-trung-tam' },
      { label: 'Về đội ngũ giáo viên', href: '/gioi-thieu/doi-ngu-giao-vien' },
    ],
  },
  {
    label: 'KHÓA HỌC',
    href: '#khoa-hoc',
    dropdown: [
      { label: 'Tiếng Trung Cơ Bản HSK1 2 3 (3.0)', href: '/khoa-hoc/hsk-1-2' },
      { label: 'HSK4 + HSKK', href: '/khoa-hoc/hsk-4' },
      { label: 'HSK5 + HSKK', href: '/khoa-hoc/hsk-5' },
      { label: 'HSK6 + HSKK', href: '/khoa-hoc/hsk-6' },
      { label: 'Ôn Thi THPTQG D4', href: '/khoa-hoc/on-thi-d4' },
      { label: 'Tiếng Trung VIP 1-1', href: '/khoa-hoc/ca-nhan-1-1' },
      { label: 'Gia sư tiếng Trung', href: '/khoa-hoc/gia-su' },
      { label: 'Tiếng Trung Trẻ Em', href: '/khoa-hoc/tre-em' },
    ],
  },
  { label: 'CẢM NHẬN HỌC VIÊN', href: '/cam-nhan' },
  { label: 'HỌC BỔNG', href: '/hoc-bong' },
  {
    label: 'TIN TỨC',
    href: '#tin-tuc',
    dropdown: [
      { label: 'Thông tin VĂN HÓA', href: '/tin-tuc/van-hoa' },
      { label: 'Thông tin ƯU ĐÃI', href: '/tin-tuc/uu-dai' },
      { label: 'Thông tin HỮU ÍCH', href: '/tin-tuc/huu-ich' },
    ],
  },
  {
    label: 'KIỂM TRA ĐẦU VÀO',
    href: '#kiem-tra',
    dropdown: [
      { label: 'HSK2', href: '/kiem-tra/hsk2' },
      { label: 'HSK3', href: '/kiem-tra/hsk3' },
      { label: 'HSK4', href: '/kiem-tra/hsk4' },
      { label: 'HSK5', href: '/kiem-tra/hsk5' },
      { label: 'HSK6', href: '/kiem-tra/hsk6' },
    ],
  },
  {
    label: 'THƯ VIỆN',
    href: '#thu-vien',
    dropdown: [
      { label: 'Chia sẻ kiến thức', href: '/thu-vien/chia-se-kien-thuc' },
      { label: 'Tài liệu HSK2', href: '/thu-vien/tai-lieu-hsk2' },
      { label: 'Tài liệu HSK3', href: '/thu-vien/tai-lieu-hsk3' },
      { label: 'Tài liệu HSK4', href: '/thu-vien/tai-lieu-hsk4' },
      { label: 'Tài liệu HSK5', href: '/thu-vien/tai-lieu-hsk5' },
      { label: 'Tài liệu HSK6', href: '/thu-vien/tai-lieu-hsk6' },
      { label: 'Tiếng Trung thương mại', href: '/thu-vien/thuong-mai' },
      { label: 'Tiếng Trung du lịch', href: '/thu-vien/du-lich' },
      { label: 'Học liệu khác', href: '/thu-vien/hoc-lieu-khac' },
    ],
  },
];

// ── Sub-components ───────────────────────────────────────────────────────────

function DropdownMenu({ items }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scaleY: 0.95 }}
      animate={{ opacity: 1, y: 0, scaleY: 1 }}
      exit={{ opacity: 0, y: 8, scaleY: 0.95 }}
      transition={{ duration: 0.15 }}
      style={{ transformOrigin: 'top' }}
      className="absolute top-full left-0 min-w-[220px] bg-white shadow-2xl rounded-b-xl border-t-2 border-red-600 z-50 overflow-hidden"
    >
      {items.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="block px-5 py-3 text-sm text-gray-700 hover:bg-red-600 hover:text-white transition-colors duration-150 border-b border-gray-50 last:border-0 font-medium"
        >
          {item.label}
        </Link>
      ))}
    </motion.div>
  );
}

function NavItem({ item, mobile, onClose }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const navigate = (href) => {
    if (onClose) onClose();
    setOpen(false);
    if (href.startsWith('#')) {
      const id = href.slice(1);
      if (pathname === '/') {
        // On homepage — smooth scroll
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        // On subpage — navigate to homepage with hash
        router.push('/' + href);
      }
    } else {
      router.push(href);
    }
  };

  if (mobile) {
    return (
      <div>
        <button
          onClick={() => {
            if (item.dropdown) { setOpen(!open); } else { navigate(item.href); }
          }}
          className="w-full flex items-center justify-between px-4 py-3 text-gray-800 font-semibold text-sm hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
        >
          {item.label}
          {item.dropdown && (
            <svg className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </button>
        {item.dropdown && open && (
          <div className="ml-4 border-l-2 border-red-200 pl-3 mt-1 space-y-1">
            {item.dropdown.map((sub) => (
              <button
                key={sub.label}
                onClick={() => navigate(sub.href)}
                className="block w-full text-left py-2 px-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
              >
                {sub.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => item.dropdown && setOpen(true)}
      onMouseLeave={() => item.dropdown && setOpen(false)}
    >
      <button
        onClick={() => navigate(item.href)}
        className="flex items-center gap-1 px-3 py-3 text-white font-bold text-xs tracking-wide hover:bg-white/20 transition-colors duration-150 whitespace-nowrap h-full"
      >
        {item.label}
        {item.dropdown && (
          <svg className="w-3 h-3 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>
      <AnimatePresence>
        {item.dropdown && open && <DropdownMenu items={item.dropdown} />}
      </AnimatePresence>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navigate = (href) => {
    setMobileOpen(false);
    if (href.startsWith('#')) {
      const id = href.slice(1);
      if (pathname === '/') {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        router.push('/' + href);
      }
    } else {
      router.push(href);
    }
  };

  return (
    <>
      {/* ── Spacer (prevents content jump) ── */}
      <div className={`transition-all duration-300 ${scrolled ? 'h-[140px]' : 'h-[175px]'}`} />

      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}>

        {/* ══════════════════════════════════════
            LAYER 1 — Top Info Bar
        ══════════════════════════════════════ */}
        <div
          className={`bg-red-600 overflow-hidden transition-all duration-300 ${
            scrolled ? 'max-h-0 opacity-0' : 'max-h-[40px] opacity-100'
          }`}
        >
          <div className="max-w-screen-xl mx-auto px-4 h-[35px] flex items-center justify-between gap-4">
            {/* Slogan */}
            <p className="text-white text-xs font-semibold tracking-wide truncate hidden sm:block">
              TIẾNG TRUNG HIỆN ĐẠI – CHẤT LƯỢNG ĐÀO TẠO CHUẨN ĐẠI HỌC HÀNG ĐẦU
            </p>
            <p className="text-white text-xs font-semibold sm:hidden truncate">
              TIẾNG TRUNG HIỆN ĐẠI
            </p>

            {/* Right side: nav links + socials */}
            <div className="flex items-center gap-0 flex-shrink-0">
              {/* Links */}
              <div className="hidden md:flex items-center">
                {topNavLinks.map((link, i) => (
                  <button
                    key={link.label}
                    onClick={() => navigate(link.href)}
                    className="text-white/90 hover:text-white text-xs px-3 py-1 hover:bg-white/15 transition-colors rounded font-medium"
                  >
                    {link.label}
                  </button>
                ))}
                <span className="w-px h-4 bg-white/30 mx-1" />
              </div>

              {/* Social icons */}
              <div className="flex items-center gap-1 ml-1">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-6 h-6 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 rounded transition-all duration-150"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════
            LAYER 2 — Main Header
        ══════════════════════════════════════ */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-screen-xl mx-auto px-4 h-[90px] flex items-center gap-4">

            {/* Logo */}
            <button
              onClick={() => navigate('#trang-chu')}
              className="flex items-center gap-3 flex-shrink-0 group"
            >
              <img src="/logo.png" alt="Tiếng Trung Hiệp Lâm" className="h-20 w-auto object-contain" />
            </button>

            {/* Search bar — center, grows */}
            <div className="flex-1 mx-4 hidden md:block">
              <div
                className={`relative transition-all duration-300 ${
                  searchFocused ? 'scale-[1.02]' : ''
                }`}
              >
                <input
                  type="text"
                  placeholder="Search..."
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className={`w-full h-11 pl-5 pr-12 rounded-full border-2 text-sm outline-none transition-all duration-300 ${
                    searchFocused
                      ? 'border-red-500 shadow-lg shadow-red-100 bg-white'
                      : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                  }`}
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right: CTA + Phone + Mobile controls */}
            <div className="flex items-center gap-2 ml-auto md:ml-0 flex-shrink-0">
              {/* Mobile search toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="md:hidden w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* CTA Button */}
              <button
                onClick={openRegistrationModal}
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2.5 rounded-full text-xs tracking-wide uppercase transition-all duration-200 hover:shadow-lg hover:shadow-red-200 hover:-translate-y-0.5 hidden sm:flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
                ĐĂNG KÝ TƯ VẤN
              </button>

              {/* Phone button */}
              <a
                href="tel:0985651306"
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2.5 rounded-full text-xs tracking-wide transition-all duration-200 hover:shadow-lg hover:shadow-red-200 hover:-translate-y-0.5 hidden md:flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                0868 851 331
              </a>

              {/* Hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-9 h-9 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile search bar */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden overflow-hidden border-t border-gray-100"
              >
                <div className="px-4 py-3">
                  <div className="relative">
                    <input
                      autoFocus
                      type="text"
                      placeholder="Search..."
                      className="w-full h-10 pl-4 pr-10 rounded-full border-2 border-red-400 text-sm outline-none bg-white"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-red-600 rounded-full flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ══════════════════════════════════════
            LAYER 3 — Main Navigation
        ══════════════════════════════════════ */}
        <nav className="bg-red-600 hidden lg:block">
          <div className="max-w-screen-xl mx-auto px-4">
            <div className="flex items-stretch h-[50px]">
              {navItems.map((item) => (
                <NavItem key={item.label} item={item} />
              ))}
            </div>
          </div>
        </nav>
      </div>

      {/* ══════════════════════════════════════
          MOBILE MENU DRAWER
      ══════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[80vw] max-w-xs bg-white z-50 overflow-y-auto shadow-2xl lg:hidden"
            >
              {/* Drawer header */}
              <div className="bg-red-600 p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg" style={{ fontFamily: 'serif' }}>中</span>
                  </div>
                  <div className="text-white">
                    <div className="font-black text-sm">TIẾNG TRUNG HIỆN ĐẠI</div>
                    <div className="text-white/80 text-xs">Menu chính</div>
                  </div>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/20 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* CTA + Phone (mobile) */}
              <div className="p-3 bg-gray-50 border-b flex gap-2">
                <button
                  onClick={() => { setMobileOpen(false); openRegistrationModal(); }}
                  className="flex-1 bg-red-600 text-white text-xs font-bold py-2.5 rounded-full text-center hover:bg-red-700 transition-colors"
                >
                  ĐĂNG KÝ TƯ VẤN
                </button>
                <a
                  href="tel:0985651306"
                  className="flex-1 bg-red-600 text-white text-xs font-bold py-2.5 rounded-full text-center hover:bg-red-700 transition-colors"
                >
                  📞 0868 851 331
                </a>
              </div>

              {/* Nav items */}
              <div className="p-3 space-y-1">
                {navItems.map((item) => (
                  <NavItem key={item.label} item={item} mobile onClose={() => setMobileOpen(false)} />
                ))}
              </div>

              {/* Social links */}
              <div className="p-4 border-t mt-4">
                <p className="text-xs text-gray-400 mb-2 font-medium">Theo dõi chúng tôi</p>
                <div className="flex gap-2">
                  {socialLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      aria-label={s.label}
                      className="w-9 h-9 bg-red-600 text-white rounded-lg flex items-center justify-center hover:bg-red-700 transition-colors"
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
