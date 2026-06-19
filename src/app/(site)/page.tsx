import { CtaSection } from "@/components/cta-section";
import { EnterpriseSafetySection } from "@/components/enterprise-safety-section";
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
      <SolutionSection />
      <EnterpriseSafetySection />
      <TestimonialSection />
      <CtaSection />
    </>
  );
}
