import { CtaSection } from "@/components/cta-section";
import { HeroSection } from "@/components/hero-section";
import { PlatformArchitectureSection } from "@/components/platform-architecture-section";
import { PlatformIntelligenceSection } from "@/components/platform-intelligence-section";
import { SolutionSection } from "@/components/solution-section";
import { TestimonialSection } from "@/components/testimonial-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <PlatformIntelligenceSection />
      <PlatformArchitectureSection />
      <CtaSection
        id={undefined}
        className="bg-white pt-32"
        imageSrc="/images/cta/michael-d-beckwith-soN9dynO5fo-unsplash.jpg"
        title="See how Perry adapts to the way your team works."
        description="From fund formation through deal execution and portfolio governance — see how Perry adapts to the way your team works."
      />
      <SolutionSection />
      <TestimonialSection />
      <CtaSection />
    </>
  );
}
