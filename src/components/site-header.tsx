import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SiteNav } from "@/components/site-nav";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Perry
        </Link>

        <SiteNav />

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" render={<Link href="/#contact" />}>
            Get started
          </Button>
          <Button size="sm" render={<Link href="/#contact" />}>
            Book a demo
            <ArrowRight />
          </Button>
        </div>
      </div>
    </header>
  );
}
