"use client";

import Image from "@/components/asset-image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SiteMobileNav } from "@/components/site-mobile-nav";
import { SiteNav } from "@/components/site-nav";
import { Button } from "@/components/ui/button";
import { useAdaptiveHeader } from "@/hooks/use-adaptive-header";
import { bookDemoUrl, loginUrl } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const { visible, contrast, hasSurface } = useAdaptiveHeader();
  const onDark = contrast === "on-dark";

  return (
    <header
      data-visible={visible ? "true" : "false"}
      className={cn(
        "site-header fixed inset-x-0 top-0 z-50",
        !hasSurface && "border-b border-transparent bg-transparent backdrop-blur-none",
        hasSurface &&
          onDark &&
          "border-b border-white/10 bg-black/45 backdrop-blur-md",
        hasSurface &&
          !onDark &&
          "border-b border-border/60 bg-background/80 backdrop-blur-md",
        onDark ? "text-white" : "text-foreground",
      )}
    >
      <div className="section-container flex h-16 items-center gap-3 px-6 md:grid md:grid-cols-[1fr_auto_1fr]">
        <div className="flex items-center gap-2 justify-self-start">
          <div className="md:hidden">
            <SiteMobileNav contrast={contrast} />
          </div>
          <Link href="/" className="hidden h-6 shrink-0 items-center md:flex">
            <Image
              src={onDark ? "/perry-logo-white.png" : "/perry-logo.png"}
              alt="Perry"
              width={onDark ? 1419 : 355}
              height={onDark ? 384 : 96}
              priority
              className="h-6 w-auto transition-opacity duration-300"
            />
          </Link>
        </div>

        <div className="hidden justify-self-center md:flex">
          <SiteNav contrast={contrast} />
        </div>

        <div className="ml-auto flex items-center gap-2 justify-self-end sm:gap-3 md:ml-0">
          <Button
            variant="outline"
            size="sm"
            className={cn(
              onDark &&
                "border-white/70 bg-transparent text-white hover:bg-white/10 hover:text-white",
            )}
            render={
              <Link
                href={loginUrl}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            Log in
          </Button>
          <Button
            size="sm"
            className={cn(
              onDark && "bg-white text-black hover:bg-white/90",
            )}
            render={
              <Link
                href={bookDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            Book a demo
            <ArrowRight />
          </Button>
        </div>
      </div>
    </header>
  );
}
