import { ClientBanner } from "@/components/client-banner";
import { EnterpriseSafetySection } from "@/components/enterprise-safety-section";
import { HeroSection } from "@/components/hero-section";
import { PlatformArchitectureSection } from "@/components/platform-architecture-section";
import { PlatformIntelligenceSection } from "@/components/platform-intelligence-section";
import { ProductFeatureBentoSection } from "@/components/product-feature-bento-section";
import { SolutionSection } from "@/components/solution-section";
import { TestimonialSection } from "@/components/testimonial-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <div className="mx-auto mt-16 max-w-7xl border-t border-border/40 pt-12">
        <ClientBanner embedded />
      </div>
      <PlatformIntelligenceSection />
      <PlatformArchitectureSection />
      <ProductFeatureBentoSection />
      <SolutionSection />
      <EnterpriseSafetySection />
      <TestimonialSection />
    </>
  );
}
