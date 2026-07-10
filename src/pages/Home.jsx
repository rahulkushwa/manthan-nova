import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats";
import Features from "../components/home/Features";
import Courses from "../components/home/Courses";
import TeachingMethod from "../components/home/TeachingMethod";
import Testimonials from "../components/home/Testimonials";
import Gallery from "../components/home/Gallery";
import CTA from "../components/home/CTA";
import Footer from "../components/layout/Footer";
import WhatsAppButton from "../components/common/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <Courses />
      <TeachingMethod />
      <Testimonials />
      <Gallery />
      <CTA />
      <Footer />
      <WhatsAppButton />
    </>
  );
}