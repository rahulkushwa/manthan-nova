import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats";
import Features from "../components/home/Features";
import Courses from "../components/home/Courses";
import TeachingMethod from "../components/home/TeachingMethod";
import Testimonials from "../components/home/Testimonials";
import Gallery from "../components/home/Gallery";
import CTA from "../components/home/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <Courses />
      <TeachingMethod />
      <Testimonials />
      <Gallery />
      <CTA />
    </>
  );
}