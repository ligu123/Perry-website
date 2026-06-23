import type { Metadata } from "next";
import Image from "@/components/asset-image";
import Link from "next/link";

import { CtaSection } from "@/components/cta-section";
import { StoryPageHero } from "@/components/story-page-hero";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { aboutImages } from "@/lib/about-images";

export const metadata: Metadata = {
  title: "About",
  description:
    "Perry is built by private capital lawyers who spent years inside firms and fund teams—and built the platform they wished they had.",
};

const teamMembers = [
  {
    name: "Shashwat Patel",
    role: "Founder & CEO",
    intro:
      "Former Big Law leader with 15+ years as a funds-focused corporate lawyer at Debevoise and Simmons & Simmons, qualified in New York, England & Wales, and India.",
    imageSrc: aboutImages.team.shashwatPatel,
    linkedinUrl: "https://www.linkedin.com/in/shashwatpatel/",
  },
  {
    name: "Jaco Koenig",
    role: "Founder & CTO",
    intro:
      "Serial founder and CTO with 14 years building products at startups including Doshi, Whering, and Binary Mango.",
    imageSrc: aboutImages.team.jacoboKonig,
    linkedinUrl: "https://www.linkedin.com/in/jacobok/",
  },
  {
    name: "Vaneesa Agrawal",
    role: "Founder & CPO",
    intro:
      "Senior funds and venture capital lawyer with 15+ years on cross-border deals, founder of award-winning boutique Thinking Legal, and builder of AI-powered legal workflows.",
    imageSrc: aboutImages.team.vaneesaAgrawal,
    linkedinUrl: "https://www.linkedin.com/in/vaneesaagrawal/",
  },
];

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <div className="border-t border-border/60">
      <StoryPageHero
        eyebrow="About Perry"
        title="Built by seasoned private capital lawyers"
        description="Perry comes from years spent inside firms and fund teams—negotiating deals, closing funds, and managing portfolio obligations. We built the platform we wished we had."
        belowContent={
          <div className="grid gap-6 sm:grid-cols-3">
            {teamMembers.map((member) => (
              <Card key={member.name} className="overflow-hidden rounded-sm pt-0">
                <div className="relative h-[600px] w-full bg-muted/30">
                  <Image
                    src={member.imageSrc}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 100vw, 320px"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                  <CardAction>
                    <Link
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on LinkedIn`}
                      className="inline-flex size-8 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <LinkedInIcon className="size-4" />
                    </Link>
                  </CardAction>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
                    {member.intro}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        }
      />

      <CtaSection className="pt-20 sm:pt-24" />
    </div>
  );
}
