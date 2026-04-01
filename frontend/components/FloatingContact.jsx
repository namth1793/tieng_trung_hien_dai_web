'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { openRegistrationModal } from './RegistrationModal';

// ── Side floating contact widget (top-right) ────────────────────────────────

function SideFloating() {
  const [open, setOpen] = useState(false);

  const contacts = [
    {
      label: 'Zalo',
      href: 'https://zalo.me/0985651306',
      color: 'bg-blue-500 hover:bg-blue-600',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 48 48" fill="white">
          <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm9.6 28.8c-.4.4-1 .6-1.6.6-.3 0-.6-.1-.9-.2l-4.2-2.1c-1.3.3-2.6.5-3.9.5C15.1 31.6 9 28.1 9 24s6.1-7.6 14-7.6 14 3.5 14 7.6c0 2.1-1.3 4-3.4 5.4l.4 2.2c.1.5-.1 1-.4 1.2z" />
        </svg>
      ),
    },
    {
      label: 'Messenger',
      href: 'https://m.me/tiengtrungthayhung',
      color: 'bg-purple-500 hover:bg-purple-600',
      icon: (
        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
          <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.44 3.14 7.17.16.13.26.35.26.57l.05 1.77c.02.56.59.92 1.1.69l1.98-.87c.17-.08.36-.1.53-.05.88.24 1.82.37 2.79.37 5.64 0 10-4.13 10-9.7C22 6.13 17.64 2 12 2zm5.98 7.52l-2.94 4.64c-.47.73-1.47.93-2.18.42l-2.34-1.75c-.21-.16-.5-.16-.71 0l-3.16 2.4c-.42.32-.97-.19-.69-.64l2.94-4.64c.47-.73 1.47-.93 2.18-.42l2.34 1.75c.21.16.5.16.71 0l3.16-2.4c.42-.32.97.19.69.64z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="fixed bottom-28 right-5 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && contacts.map((contact, i) => (
          <motion.a
            key={contact.label}
            href={contact.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.5, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.5, x: 20 }}
            transition={{ duration: 0.2, delay: i * 0.05 }}
            className={`flex items-center gap-2 ${contact.color} text-white text-sm font-semibold px-4 py-2.5 rounded-full shadow-lg transition-all duration-200`}
          >
            {contact.icon}
            {contact.label}
          </motion.a>
        ))}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-colors duration-200"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.svg key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}
              className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}
              className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

// ── Bottom-center floating CTA bar ──────────────────────────────────────────

function BottomCTABar() {
  const scrollToForm = () => {
    document.getElementById('lien-he')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-7 left-0 right-0 z-40 flex justify-center px-2 pointer-events-none">
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.5, type: 'spring', damping: 20 }}
      className="flex items-center gap-3"
      style={{ pointerEvents: 'none' }}
    >
      {/* Phone button */}
      <motion.a
        href="tel:0985651306"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-3 rounded-full shadow-xl shadow-orange-300/50 transition-colors duration-200 text-sm whitespace-nowrap"
        style={{ pointerEvents: 'auto' }}
      >
        {/* Phone icon */}
        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
        </svg>
        <span>0868 851 331</span>
      </motion.a>

      {/* Register button */}
      <motion.button
        onClick={openRegistrationModal}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-2.5 bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-3 rounded-full shadow-xl shadow-red-300/50 transition-colors duration-200 text-sm whitespace-nowrap"
        style={{ pointerEvents: 'auto' }}
      >
        {/* Edit/pen icon */}
        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        <span>Đăng ký tư vấn</span>
      </motion.button>
    </motion.div>
    </div>
  );
}

// ── Combined export ──────────────────────────────────────────────────────────

export default function FloatingContact() {
  return (
    <>
      <SideFloating />
      <BottomCTABar />
    </>
  );
}
