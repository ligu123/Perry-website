import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights and updates from the Perry team.",
};

const posts = [
  {
    slug: "legal-os-for-private-capital",
    title: "Why private capital needs a legal OS",
    description: "How modern funds are replacing fragmented tools with a single system of record.",
    date: "Mar 12, 2026",
  },
  {
    slug: "fund-formation-checklist",
    title: "The fund formation checklist for 2026",
    description: "A practical guide to launching a new fund without legal bottlenecks.",
    date: "Feb 28, 2026",
  },
  {
    slug: "compliance-at-scale",
    title: "Compliance at scale",
    description: "What breaks when your AUM doubles — and how to prepare your legal stack.",
    date: "Feb 10, 2026",
  },
];

export default function BlogPage() {
  return (
    <div className="border-t border-border/60">
      <PageHeader
        title="Blog"
        description="Industry insights, product updates, and best practices for private capital legal teams."
      />

      <div className="mx-auto grid max-w-4xl gap-6 px-6 pb-24">
        {posts.map((post) => (
          <Card key={post.slug}>
            <CardHeader>
              <p className="text-sm text-muted-foreground">{post.date}</p>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>{post.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
