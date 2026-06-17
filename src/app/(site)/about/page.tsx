import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Perry and our mission to modernize legal operations for private capital.",
};

export default function AboutPage() {
  return (
    <div className="border-t border-border/60">
      <PageHeader
        title="About"
        description="We're building the legal operating system for private capital — so firms can move faster with clarity and confidence."
      />

      <div className="mx-auto grid max-w-7xl gap-6 px-6 pb-24 sm:grid-cols-2">
        {[
          { value: "10x", label: "Faster time to launch" },
          { value: "99.9%", label: "Platform uptime" },
          { value: "50+", label: "Funds supported" },
          { value: "24/7", label: "Support for teams" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card p-6 shadow-sm"
          >
            <p className="text-3xl font-semibold tracking-tight">{stat.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
