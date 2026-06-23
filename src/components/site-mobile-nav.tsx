"use client";

import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useCallback, useEffect, useId, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

import { ProductNavMenu } from "@/components/product-nav-menu";
import { SolutionNavMenu } from "@/components/solution-nav-menu";
import { Button } from "@/components/ui/button";
import type { HeaderContrast } from "@/hooks/use-adaptive-header";
import { simpleNavLinks } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type SiteMobileNavProps = {
  contrast?: HeaderContrast;
};

function MobileNavSection({
  title,
  open,
  onToggle,
  onDark,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  onDark: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "border-b last:border-b-0",
        onDark ? "border-white/10" : "border-border/60",
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className={cn(
          "flex w-full items-center justify-between py-3 text-sm font-medium transition-colors",
          onDark ? "text-white" : "text-foreground",
        )}
      >
        {title}
        <ChevronDown
          className={cn(
            "size-4 shrink-0 transition-transform",
            open && "rotate-180",
            onDark ? "text-white/60" : "text-muted-foreground",
          )}
        />
      </button>
      {open ? <div className="pb-3">{children}</div> : null}
    </div>
  );
}

export function SiteMobileNav({ contrast = "on-light" }: SiteMobileNavProps) {
  const onDark = contrast === "on-dark";
  const panelId = useId();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [solutionOpen, setSolutionOpen] = useState(false);

  const close = useCallback(() => {
    setOpen(false);
    setProductOpen(false);
    setSolutionOpen(false);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  const navLinkClassName = cn(
    "block rounded-lg px-3 py-2 text-sm transition-colors",
    onDark
      ? "text-white/70 hover:bg-white/10 hover:text-white"
      : "text-muted-foreground hover:bg-muted hover:text-foreground",
  );

  const overlay = (
    <div
      className={cn(
        "fixed inset-0 z-[60] transition-opacity duration-300 md:hidden",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      )}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label="Close menu"
        className="absolute inset-0 bg-black/50"
        onClick={close}
        tabIndex={open ? 0 : -1}
      />

      <nav
        id={panelId}
        aria-label="Mobile navigation"
        aria-hidden={!open}
        inert={!open ? true : undefined}
        className={cn(
          "absolute inset-y-0 left-0 flex w-[min(100vw-3rem,320px)] flex-col shadow-xl transition-transform duration-300 ease-out",
          onDark ? "bg-[#111113] text-white" : "bg-background text-foreground",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div
          className={cn(
            "flex items-center justify-end border-b p-3",
            onDark ? "border-white/10" : "border-border/60",
          )}
        >
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Close menu"
            onClick={close}
            className={cn(
              onDark && "text-white hover:bg-white/10 hover:text-white",
            )}
          >
            <X />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2">
          <div
            className={cn(
              "border-b py-1",
              onDark ? "border-white/10" : "border-border/60",
            )}
          >
            <Link href="/" className={navLinkClassName} onClick={close}>
              Homepage
            </Link>
          </div>

          <MobileNavSection
            title="Product"
            open={productOpen}
            onToggle={() => setProductOpen((current) => !current)}
            onDark={onDark}
          >
            <div
              onClick={(event) => {
                if ((event.target as HTMLElement).closest("a")) close();
              }}
            >
              <ProductNavMenu contrast={contrast} />
            </div>
          </MobileNavSection>

          <MobileNavSection
            title="Solution"
            open={solutionOpen}
            onToggle={() => setSolutionOpen((current) => !current)}
            onDark={onDark}
          >
            <div
              className="flex flex-col"
              onClick={(event) => {
                if ((event.target as HTMLElement).closest("a")) close();
              }}
            >
              <SolutionNavMenu contrast={contrast} className="flex-col gap-4" />
            </div>
          </MobileNavSection>

          {simpleNavLinks.map((link) => (
            <div
              key={link.href}
              className={cn(
                "border-b py-1 last:border-b-0",
                onDark ? "border-white/10" : "border-border/60",
              )}
            >
              <Link href={link.href} className={navLinkClassName} onClick={close}>
                {link.label}
              </Link>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((current) => !current)}
        className={cn(
          onDark &&
            "text-white hover:bg-white/10 hover:text-white aria-expanded:bg-white/10",
        )}
      >
        {open ? <X /> : <Menu />}
      </Button>

      {mounted ? createPortal(overlay, document.body) : null}
    </>
  );
}
