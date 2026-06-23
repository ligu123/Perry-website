import Image from "@/components/asset-image";

import { solutionByIndustry, solutionByRole } from "@/lib/solution-navigation";

const personaCards = [
  ...solutionByRole,
  ...solutionByIndustry.filter((item) => item.slug === "vc" || item.slug === "pe"),
];

export function SolutionSection() {
  return (
    <section id="solution" className="overflow-x-hidden pt-12 pb-32">
      <div className="section-container px-6">
        <div className="max-w-2xl">
          <p className="flex items-center gap-2 text-sm font-medium tracking-wide text-muted-foreground">
            <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-emerald-500" />
            Ecosystem
          </p>
          <h2 className="mt-1 font-source-serif text-3xl font-medium tracking-tight text-balance sm:text-4xl">
            Connect every stakeholder around the fund
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            One connected workflow that brings in-house teams, portfolio
            companies, LPs, and advisers into the fund's legal work.
          </p>
        </div>
      </div>

      <div className="scrollbar-hide mt-16 w-full max-w-full overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max flex-nowrap gap-2 pl-[max(1.5rem,calc((100vw-var(--container-8xl))/2+1.5rem))] pr-6">
          {personaCards.map((item) => (
              <article
                key={item.slug}
                className="group flex aspect-[2/4] h-[560px] w-[320px] shrink-0 snap-start flex-col overflow-hidden rounded-none border border-border bg-card"
              >
                <div className="relative min-h-0 flex-1">
                  <Image
                    src={item.cardImageSrc}
                    alt=""
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>

                <div className="shrink-0 p-4">
                  <h3 className="text-sm font-medium tracking-tight">{item.label}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {item.cardDescription}
                  </p>
                </div>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}
