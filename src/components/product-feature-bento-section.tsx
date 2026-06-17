import Link from "next/link";
import { ArrowRight, FileText, GitBranch, Shield, Users, Zap } from "lucide-react";

import { cn } from "@/lib/utils";

const bentoItems = [
  {
    slug: "fund-formation/lpa-generation",
    label: "LPA generation",
    description: "Draft and iterate fund documents with version control built in.",
    icon: FileText,
    className: "sm:col-span-2 sm:row-span-2",
    featured: true,
  },
  {
    slug: "investment-period/deal-execution",
    label: "Deal execution",
    description: "Move from term sheet to closing with coordinated checklists.",
    icon: Zap,
    className: "sm:col-span-1",
  },
  {
    slug: "portfolio-management/covenant-tracking",
    label: "Covenant tracking",
    description: "Monitor portfolio covenants and breach notifications.",
    icon: Shield,
    className: "sm:col-span-1",
  },
  {
    slug: "investment-period/capital-calls",
    label: "Capital calls",
    description: "Issue notices, track funding, and reconcile commitments.",
    icon: GitBranch,
    className: "sm:col-span-1",
  },
  {
    slug: "investment-period/investor-onboarding",
    label: "Investor onboarding",
    description: "Guide LPs through subscription with a single source of truth.",
    icon: Users,
    className: "sm:col-span-1",
  },
];

export function ProductFeatureBentoSection() {
  return (
    <section className="border-y border-border/60 bg-muted/20 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
            Features
          </p>
          <h2 className="mt-3 font-source-serif text-3xl font-medium tracking-tight text-balance sm:text-4xl">
            Built for the work legal teams do every day
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            Deep workflows for document generation, deal closings, investor relations,
            and portfolio oversight — not another generic project tracker.
          </p>
        </div>

        <div className="mt-12 grid auto-rows-[minmax(180px,auto)] gap-4 sm:grid-cols-3">
          {bentoItems.map((item) => {
            const Icon = item.icon;
            const [lifecycle, feature] = item.slug.split("/");

            return (
              <Link
                key={item.slug}
                href={`/product/${lifecycle}#${feature}`}
                className={cn(
                  "group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors hover:bg-muted/40",
                  item.className,
                )}
              >
                <div>
                  <div
                    className={cn(
                      "flex size-10 items-center justify-center rounded-lg bg-muted",
                      item.featured && "size-12",
                    )}
                  >
                    <Icon className="size-5 text-muted-foreground" strokeWidth={1.5} />
                  </div>
                  <h3
                    className={cn(
                      "mt-4 font-medium tracking-tight",
                      item.featured && "text-xl",
                    )}
                  >
                    {item.label}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground text-pretty">
                    {item.description}
                  </p>
                </div>

                <span className="mt-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                  Learn more
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>

                {item.featured && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-8 -bottom-8 size-40 rounded-full bg-primary/5"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
