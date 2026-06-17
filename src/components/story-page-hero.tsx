import Image from "next/image";

import { cn } from "@/lib/utils";

type StoryPageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

export function StoryPageHero({
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
  className,
}: StoryPageHeroProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden border-b border-border/60",
        className,
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(900px_circle_at_15%_0%,hsl(var(--primary)/0.12),transparent_55%),radial-gradient(700px_circle_at_85%_20%,hsl(var(--foreground)/0.06),transparent_60%),linear-gradient(to_bottom,hsl(var(--muted)/0.5),hsl(var(--background)))]"
      />

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 sm:py-24 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-28">
        <div className="max-w-xl">
          {eyebrow && (
            <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-3 font-source-serif text-4xl font-medium tracking-tight text-balance sm:text-5xl">
            {title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">
            {description}
          </p>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-muted/40 shadow-sm">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAlt ?? title}
              fill
              className="object-contain p-8"
              priority
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-muted/80 to-background p-8 text-center">
              <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground/60 uppercase">
                Overview
              </p>
              <p className="mt-4 max-w-xs text-sm font-medium text-muted-foreground text-pretty">
                {title}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
