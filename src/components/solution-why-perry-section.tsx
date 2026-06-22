import { getWhyPerryContent } from "@/lib/solution-why-perry-content";

type SolutionWhyPerrySectionProps = {
  persona: string;
};

export function SolutionWhyPerrySection({ persona }: SolutionWhyPerrySectionProps) {
  const { heading, items } = getWhyPerryContent(persona);

  return (
    <section className="border-b border-border/60 bg-background px-6 py-20 sm:py-24">
      <div className="section-container">
        <div className="max-w-sm">
          <p className="flex items-center gap-2 text-sm font-medium tracking-wide text-muted-foreground">
            <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-emerald-500" />
            Why Perry
          </p>
          <h2 className="mt-1 text-xl font-medium tracking-tight text-balance sm:text-2xl">
            {heading}
          </h2>
        </div>

        <div className="mt-12 grid gap-10 divide-y divide-border/80 sm:grid-cols-2 sm:gap-x-8 sm:divide-y-0 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-y-0">
          {items.map((item, index) => (
            <div
              key={item.title}
              className="py-10 first:pt-0 last:pb-0 sm:py-0 lg:px-8 lg:first:pl-0 lg:last:pr-0"
            >
              <p className="font-source-serif text-5xl font-medium tracking-tight sm:text-6xl">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 text-base font-medium tracking-tight text-pretty">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
