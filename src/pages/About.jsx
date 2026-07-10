import PageHero from "../components/shared/PageHero";
import AboutStory from "../components/about/AboutStory";
import MissionVision from "../components/about/MissionVision";
import Timeline from "../components/about/Timeline";
import CoreValues from "../components/about/CoreValues";
import WhyChooseUs from "../components/about/WhyChooseUs";
import CTA from "../components/home/CTA";

export default function About() {
  return (
    <>
      <PageHero
        badge="About Manthan Nova"
        title="Building Strong Foundations For Future Success"
        subtitle="At Manthan Nova, we believe every student has the potential to excel with the right guidance, personal attention and concept-based learning."
      />

      <AboutStory />

      <MissionVision />

      <Timeline />

      <CoreValues />

      <WhyChooseUs />

      <CTA />
    </>
  );
}