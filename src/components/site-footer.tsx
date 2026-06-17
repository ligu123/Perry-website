import Link from "next/link";
import { Separator } from "@/components/ui/separator";

import { footerNavLinks } from "@/lib/navigation";

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-semibold tracking-tight">Perry</p>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Building products that help teams move faster with clarity and confidence.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {footerNavLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <Separator className="my-8" />

        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Perry. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
