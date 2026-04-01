'use client';
import { usePathname } from 'next/navigation';
import FloatingContact from './FloatingContact';
import RegistrationModal from './RegistrationModal';

export default function PublicWidgets() {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;
  return (
    <>
      <FloatingContact />
      <RegistrationModal />
    </>
  );
}
