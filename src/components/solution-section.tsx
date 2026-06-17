import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { solutionByRole } from "@/lib/solution-navigation";

export function SolutionSection() {
  return (
    <section id="solution" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
            Solution
          </p>
          <h2 className="mt-3 font-source-serif text-3xl font-medium tracking-tight text-balance sm:text-4xl">
            Purpose-built for every stakeholder
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            Purpose-built experiences for every stakeholder in the private capital ecosystem.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {solutionByRole.map((item) => (
            <Link
              key={item.slug}
              href={`/solution/${item.slug}`}
              className="group flex aspect-[2/3] flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:bg-muted/40"
            >
              <div
                aria-hidden
                className="flex min-h-0 flex-1 items-center justify-center border-b border-border/60 bg-muted/40"
              >
                <span className="text-[11px] font-medium tracking-wide text-muted-foreground/70 uppercase">
                  {item.label} preview
                </span>
              </div>

              <div className="shrink-0 p-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-medium tracking-tight">{item.label}</h3>
                  <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </div>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
