import Image from "@/components/asset-image";

import { getImageAspectRatio } from "@/lib/image-aspect-ratios";
import { cn } from "@/lib/utils";

type StoryPageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  kpis?: string[];
  imageSrc?: string;
  imageAlt?: string;
  imageAspect?: "portrait" | "landscape" | "square";
  className?: string;
};

export function StoryPageHero({
  eyebrow,
  title,
  description,
  kpis,
  imageSrc,
  imageAlt,
  imageAspect = "portrait",
  className,
}: StoryPageHeroProps) {
  const intrinsicAspectRatio = imageSrc ? getImageAspectRatio(imageSrc) : undefined;

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

      <div className="section-container grid gap-10 px-6 py-20 sm:py-24 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-28">
        <div className="max-w-xl">
          {eyebrow && (
            <p className="flex items-center gap-2 text-sm font-medium tracking-wide text-muted-foreground">
              <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-emerald-500" />
              {eyebrow}
            </p>
          )}
          <h1 className="mt-3 font-source-serif text-4xl font-medium tracking-tight text-balance sm:text-5xl">
            {title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">
            {description}
          </p>
          {kpis && kpis.length > 0 && (
            <ul className="mt-8 grid gap-2.5 sm:grid-cols-2">
              {kpis.map((kpi) => (
                <li key={kpi} className="flex gap-3 text-sm leading-relaxed text-foreground">
                  <span
                    aria-hidden
                    className="mt-2 size-1 shrink-0 rounded-full bg-foreground/35"
                  />
                  {kpi}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div
          className={cn(
            "relative overflow-hidden rounded-sm border border-border bg-muted/30 shadow-sm",
            intrinsicAspectRatio === undefined &&
              (imageAspect === "square" || imageSrc?.includes("/platform-intelligence-square/")
                ? "aspect-square"
                : imageAspect === "landscape"
                  ? "aspect-[3/2]"
                  : "aspect-[4/5]"),
          )}
          style={intrinsicAspectRatio ? { aspectRatio: intrinsicAspectRatio } : undefined}
        >
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAlt ?? title}
              fill
              unoptimized={
                imageSrc.includes("/platform-intelligence/") ||
                imageSrc.includes("/platform-intelligence-square/")
              }
              className={cn(
                "object-center",
                intrinsicAspectRatio || imageAspect === "landscape"
                  ? "object-cover"
                  : "object-contain",
              )}
              sizes="(max-width: 1024px) 100vw, 560px"
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
