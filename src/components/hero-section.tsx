import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(1200px_circle_at_20%_0%,hsl(var(--primary)/0.25),transparent_55%),radial-gradient(900px_circle_at_80%_10%,hsl(var(--foreground)/0.18),transparent_60%),linear-gradient(to_bottom,hsl(var(--foreground)/0.15),hsl(var(--background)))]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-black/35" />

      <div className="flex min-h-[74vh] items-end px-16 pb-14 pt-24 sm:min-h-[82vh] sm:pb-20">
        <div className="w-full text-left">
          <h1 className="font-source-serif text-4xl font-medium tracking-tight text-balance text-white drop-shadow sm:text-5xl md:text-6xl">
            The Legal OS for Private Capital
          </h1>

          <p className="mt-6 text-base text-white/80 text-pretty drop-shadow sm:text-lg">
            Unify fund formation, deal execution, portfolio governance, and LP
            communications in one platform built for in-house legal teams.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" render={<Link href="#contact" />}>
              Book a demo
              <ArrowRight />
            </Button>
            <Button size="lg" variant="outline" render={<Link href="/#platform" />}>
              Explore product
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
