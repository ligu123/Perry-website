import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card px-8 py-16 text-center shadow-sm sm:px-16">
        <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          Ready to build with Perry?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Tell us about your company and we&apos;ll help you get started with a site
          that reflects your brand and converts visitors into customers.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button size="lg" render={<Link href="mailto:hello@perry.com" />}>
            Contact sales
            <ArrowRight />
          </Button>
          <Button size="lg" variant="outline" render={<Link href="/#platform" />}>
            View product
          </Button>
        </div>
      </div>
    </section>
  );
}
