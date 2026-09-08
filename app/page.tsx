import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import LaunchScrubber from "@/components/LaunchScrubber";
import ValueProps from "@/components/ValueProps";
import SocialProof from "@/components/SocialProof";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <LaunchScrubber />
      <ValueProps />
      <SocialProof />
      <Pricing />
      <FAQ />
      <CTASection />
      <Footer />
    </main>
  );
}
