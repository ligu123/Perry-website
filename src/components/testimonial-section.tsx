"use client";

import { useState } from "react";
import Image from "@/components/asset-image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "“Great to find a product that matched many known and unknown uses for us and a team so energised to help us fix our problems. Excited to watch your business grow.”",
    name: "Max Neuberger",
    role: "General Counsel",
    firm: "Entrepreneurs First",
    avatarSrc: "/testimonials/max-neuberger.png",
  },
  {
    quote:
      "“Something that would take a senior lawyer 30–45 minutes — or a junior two hours — Perry got the bulk of it done in 10 to 15 minutes. That's a remarkable time saving.”",
    name: "Sarah Yen",
    role: "Deputy General Counsel",
    firm: "Entrepreneurs First",
    avatarSrc: "/testimonials/sarah-yen.jpg",
  },
  {
    quote:
      "“From our early work with the Perry team, it's clear they have the product ambition and the domain understanding to build something important in this space. Perry's understanding of private equity deal structures and processes goes beyond template-filling — it helps in streamlining routine mechanics and frees the team to focus on the commercial judgement calls.”",
    name: "Rohan Paliwal",
    role: "Senior Associate",
    firm: "Stakeboat Capital",
    avatarSrc: "/testimonials/rohan-paliwal.jpg",
  },
];

export function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToPrevious = () => {
    setActiveIndex((current) => (current === 0 ? testimonials.length - 1 : current - 1));
  };

  const goToNext = () => {
    setActiveIndex((current) => (current === testimonials.length - 1 ? 0 : current + 1));
  };

  return (
    <section className="bg-white px-6 pt-32 pb-48">
      <div className="section-container">
        <div className="max-w-3xl">
          <p className="flex items-center gap-2 text-sm font-medium tracking-wide text-muted-foreground">
            <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-emerald-500" />
            Testimonials
          </p>
          <h2 className="mt-1 font-source-serif text-3xl font-medium tracking-tight text-balance sm:text-4xl">
            More words from legal teams who trust Perry.
          </h2>
        </div>

        <div className="mt-12 md:grid md:grid-cols-3 md:gap-3">
          <div className="md:contents">
            {testimonials.map((item, index) => (
              <figure
                key={item.name}
                className={`flex min-h-[26rem] flex-col items-start rounded-md bg-muted/60 p-8 text-left sm:min-h-[28rem] ${
                  index === activeIndex ? "flex" : "hidden md:flex"
                }`}
              >
                <blockquote className="flex flex-1 items-start text-lg font-base leading-relaxed text-foreground/80 text-pretty">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-3">
                  <Image
                    src={item.avatarSrc}
                    alt=""
                    width={48}
                    height={48}
                    className="size-12 shrink-0 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-source-serif text-xl font-medium">{item.name}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {item.role} at {item.firm}
                    </p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-3 md:hidden">
          <button
            type="button"
            onClick={goToPrevious}
            aria-label="Previous testimonial"
            className="flex size-10 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
          >
            <ChevronLeft className="size-5" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={goToNext}
            aria-label="Next testimonial"
            className="flex size-10 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
          >
            <ChevronRight className="size-5" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
