import Header from '../components/Header';
import Hero from '../components/Hero';
import Activities from '../components/Activities';
import WhyChooseUs from '../components/WhyChooseUs';
import Courses from '../components/Courses';
import Blog from '../components/Blog';
import VideoLessons from '../components/VideoLessons';
import Teachers from '../components/Teachers';
import Testimonials from '../components/Testimonials';
import RegistrationForm from '../components/RegistrationForm';
import Footer from '../components/Footer';
import FloatingContact from '../components/FloatingContact';

export default function Home() {
  return (
    <main>
      <Header />

      {/* 1. Hero — white bg, split layout */}
      <section id="trang-chu">
        <Hero />
      </section>

      {/* 2. Activities + Quick-access buttons */}
      <Activities />

      {/* 3. Why Choose Us — numbered list + logo */}
      <section id="gioi-thieu">
        <WhyChooseUs />
      </section>

      {/* 4. Courses — red overlay card grid */}
      <section id="khoa-hoc">
        <Courses />
      </section>

      {/* 5. Blog / News */}
      <section id="tin-tuc">
        <Blog />
      </section>

      {/* 6. Video Lessons */}
      <VideoLessons />

      {/* 7. Teachers */}
      <section id="giao-vien">
        <Teachers />
      </section>

      {/* 8. Testimonials — FB-style grid */}
      <section id="cam-nhan">
        <Testimonials />
      </section>

      {/* 9. Registration Form */}
      <section id="lien-he">
        <RegistrationForm />
      </section>

      <Footer />
      <FloatingContact />
    </main>
  );
}
