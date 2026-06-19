import Image from "@/components/asset-image";

import { getImageAspectRatio } from "@/lib/image-aspect-ratios";
import { cn } from "@/lib/utils";

type StoryChapterVisualProps = {
  index: number;
  title: string;
  imageSrc?: string;
};

function StoryChapterVisual({ index, title, imageSrc }: StoryChapterVisualProps) {
  const isSquareImage = imageSrc?.includes("/platform-intelligence-square/");
  const intrinsicAspectRatio = imageSrc ? getImageAspectRatio(imageSrc) : undefined;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-sm border border-border bg-muted/30 shadow-sm",
        intrinsicAspectRatio === undefined && (isSquareImage ? "aspect-square" : "aspect-[4/5]"),
      )}
      style={intrinsicAspectRatio ? { aspectRatio: intrinsicAspectRatio } : undefined}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt=""
          fill
          unoptimized={
            imageSrc.includes("/platform-intelligence/") ||
            imageSrc.includes("/platform-intelligence-square/")
          }
          className={cn(
            "object-center",
            intrinsicAspectRatio ? "object-cover" : "object-contain",
          )}
          sizes="(max-width: 1024px) 100vw, 560px"
        />
      ) : (
        <>
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.4)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.4)_1px,transparent_1px)] bg-size-[24px_24px] opacity-40"
          />
          <div className="relative flex h-full flex-col items-center justify-center p-8 text-center">
            <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground/60 uppercase">
              Figure {String(index).padStart(2, "0")}
            </p>
            <p className="mt-4 max-w-xs text-sm font-medium text-muted-foreground text-pretty">
              {title}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export type StoryItemGroup = {
  label?: string;
  items: string[];
};

type StoryChapterProps = {
  id?: string;
  index: number;
  eyebrow?: string;
  title: string;
  description: string;
  items?: string[];
  itemsLabel?: string;
  itemGroups?: StoryItemGroup[];
  outcome?: string;
  outcomes?: string[];
  imageSrc?: string;
  className?: string;
};

export function StoryChapter({
  id,
  index,
  eyebrow,
  title,
  description,
  items,
  itemsLabel,
  itemGroups,
  outcome,
  outcomes,
  imageSrc,
  className,
}: StoryChapterProps) {
  const imageOnLeft = index % 2 === 0;

  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 border-t border-border/60 px-6 py-16 sm:py-20",
        index % 2 === 0 ? "bg-background" : "bg-muted/20",
        className,
      )}
    >
      <div className="section-container grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className={cn("flex flex-col justify-center", !imageOnLeft && "lg:order-2")}>
          <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground/60 uppercase">
            {eyebrow ?? `Chapter ${String(index).padStart(2, "0")}`}
          </p>
          <h2 className="mt-3 font-source-serif text-2xl font-medium tracking-tight text-balance sm:text-3xl">
            {title}
          </h2>
          {description && (
            <p className="mt-5 text-base leading-relaxed text-muted-foreground text-pretty">
              {description}
            </p>
          )}
          {items && items.length > 0 && (
            <div className="mt-6">
              {itemsLabel && (
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  {itemsLabel}
                </p>
              )}
              <ul className={cn("space-y-2.5", itemsLabel && "mt-3")}>
                {items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground">
                    <span
                      aria-hidden
                      className="mt-2 size-1 shrink-0 rounded-full bg-foreground/35"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {itemGroups?.map((group) => (
            <div key={group.label ?? group.items[0]} className="mt-6">
              {group.label && (
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  {group.label}
                </p>
              )}
              <ul className={cn("space-y-2.5", group.label && "mt-3")}>
                {group.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground">
                    <span
                      aria-hidden
                      className="mt-2 size-1 shrink-0 rounded-full bg-foreground/35"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {outcome && (
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground text-pretty">
              {outcome}
            </p>
          )}
          {outcomes && outcomes.length > 0 && (
            <ul className="mt-6 space-y-2.5">
              {outcomes.map((outcome) => (
                <li key={outcome} className="flex gap-3 text-sm leading-relaxed text-foreground">
                  <span
                    aria-hidden
                    className="mt-2 size-1 shrink-0 rounded-full bg-foreground/35"
                  />
                  {outcome}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={cn(!imageOnLeft && "lg:order-1")}>
          <StoryChapterVisual index={index} title={title} imageSrc={imageSrc} />
        </div>
      </div>
    </section>
  );
}
