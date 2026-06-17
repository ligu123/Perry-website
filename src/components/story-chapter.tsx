import Image from "next/image";

import { cn } from "@/lib/utils";

type StoryChapterVisualProps = {
  index: number;
  title: string;
  imageSrc?: string;
};

function StoryChapterVisual({ index, title, imageSrc }: StoryChapterVisualProps) {
  const accents = [
    "from-primary/8 via-muted/60 to-background",
    "from-foreground/6 via-muted/50 to-background",
    "from-primary/6 via-muted/40 to-muted/20",
    "from-foreground/5 via-background to-muted/30",
  ] as const;

  return (
    <div
      className={cn(
        "relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-gradient-to-br shadow-sm",
        accents[index % accents.length],
      )}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt=""
          fill
          className="object-contain p-8"
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

type StoryChapterProps = {
  id?: string;
  index: number;
  title: string;
  description: string;
  outcomes?: string[];
  imageSrc?: string;
  className?: string;
};

export function StoryChapter({
  id,
  index,
  title,
  description,
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
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className={cn("flex flex-col justify-center", !imageOnLeft && "lg:order-2")}>
          <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground/60 uppercase">
            Chapter {String(index).padStart(2, "0")}
          </p>
          <h2 className="mt-3 font-source-serif text-2xl font-medium tracking-tight text-balance sm:text-3xl">
            {title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground text-pretty">
            {description}
          </p>
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
