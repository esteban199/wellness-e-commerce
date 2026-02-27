import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
