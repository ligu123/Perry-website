import Image from "@/components/asset-image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ClientBanner } from "@/components/client-banner";
import { Button } from "@/components/ui/button";
import { bookDemoUrl } from "@/lib/navigation";

export function HeroSection() {
  return (
    <section
      data-header-theme="dark"
      className="relative isolate -mt-16 min-h-svh overflow-hidden"
    >
      <Image
        src="/images/hero/urban-hero.avif"
        alt=""
        fill
        priority
        className="-z-20 object-cover object-center"
        sizes="100vw"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-emerald-950/12"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(0_0_0/0.82)_0%,rgb(0_0_0/0.55)_28%,rgb(0_0_0/0.25)_48%,transparent_72%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(0_0_0/0.35)_0%,transparent_40%,rgb(0_0_0/0.2)_100%)]"
      />

      <div className="section-container flex min-h-svh flex-col px-6 pb-12 pt-24">
        <div className="flex flex-1 items-center">
          <div className="w-full text-left">
            <h1 className="font-source-serif text-4xl font-medium tracking-tight text-balance text-white sm:text-5xl md:text-6xl">
              The Legal OS
              <br />
              for Private Capital
            </h1>

            <p className="mt-6 max-w-xl text-medium text-white/90 text-pretty sm:text-lg">
              Unify fund formation, deal execution, and portfolio governance in
              one platform built for in-house legal teams.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-white/90"
                render={
                  <Link
                    href={bookDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                Book a demo
                <ArrowRight />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/80 bg-transparent text-white hover:bg-white/10 hover:text-white"
                render={<Link href="/#platform" />}
              >
                Explore product
              </Button>
            </div>
          </div>
        </div>

        <ClientBanner embedded variant="hero" />
      </div>
    </section>
  );
}
