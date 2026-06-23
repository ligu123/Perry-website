import Image from "@/components/asset-image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { bookDemoUrl } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type CtaSectionProps = {
  className?: string;
  id?: string;
  imageSrc?: string;
  title?: string;
  description?: string;
};

const defaultTitle = "Run your fund's legal work from one connected platform.";
const defaultDescription =
  "Book a demo to see how Perry helps in-house teams unify fund formation, deal execution, and portfolio governance.";
const defaultImageSrc = "/images/cta/jaanus-jagomagi-unsplash.jpg";

export function CtaSection({
  className,
  id = "contact",
  imageSrc = defaultImageSrc,
  title = defaultTitle,
  description = defaultDescription,
}: CtaSectionProps) {
  return (
    <section id={id} className={cn("px-6 pb-24", className)}>
      <div className="relative mx-auto h-[260px] max-w-8xl overflow-hidden rounded-sm border border-border shadow-sm sm:h-[340px] md:h-[400px]">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <Image
            src={imageSrc}
            alt=""
            fill
            className="object-cover object-center"
            sizes="(max-width: 896px) 100vw, 896px"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(0_0_0/0.25)_0%,transparent_45%,rgb(0_0_0/0.35)_100%)]" />
        </div>

        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center text-white sm:px-16">
          <h2 className="font-source-serif text-2xl font-medium tracking-tight text-balance sm:text-3xl md:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-white/80 text-pretty sm:mt-4 sm:text-base">
            {description}
          </p>
          <div className="mt-4 flex justify-center sm:mt-8">
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
              Book demo
              <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
