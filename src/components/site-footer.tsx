import Image from "@/components/asset-image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

import { legalPages } from "@/lib/legal-pages";
import { productLifecycle } from "@/lib/product-navigation";

export function SiteFooter() {
  return (
    <footer id="contact" className="bg-muted/100">
      <div className="section-container px-6 pt-20 pb-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,2fr)] lg:items-start">
          <div>
            <Link href="/" className="inline-flex h-6 shrink-0 items-center">
              <Image
                src="/perry-logo.png"
                alt="Perry"
                width={355}
                height={96}
                className="h-8 w-auto"
              />
            </Link>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Perry is the Legal OS for private capital
            </p>
            <div className="mt-6 flex items-center gap-4">
              <Image
                src="/compliance/gdpr.png"
                alt="GDPR compliance"
                width={48}
                height={48}
                className="size-12 object-contain"
              />
              <Image
                src="/compliance/iso-27001.png"
                alt="ISO 27001 compliance"
                width={48}
                height={48}
                className="size-12 object-contain"
              />
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-sm font-medium">Product</p>
              <nav className="mt-3 flex flex-col gap-2">
                {productLifecycle.map((stage) => (
                  <Link
                    key={stage.slug}
                    href={`/product/${stage.slug}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {stage.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <p className="text-sm font-medium">About</p>
              <nav className="mt-3 flex flex-col gap-2">
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  About
                </Link>
              </nav>
            </div>

            <div>
              <p className="text-sm font-medium">Legal</p>
              <nav className="mt-3 flex flex-col gap-2">
                {legalPages.map((page) => (
                  <Link
                    key={page.slug}
                    href={page.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {page.title}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Perry. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
