"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { ProductNavMenu } from "@/components/product-nav-menu";
import { SolutionNavMenu } from "@/components/solution-nav-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { simpleNavLinks } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const navTriggerClassName =
  "inline-flex h-9 items-center gap-1 rounded-lg px-2.5 text-sm text-muted-foreground transition-colors outline-none hover:bg-muted hover:text-foreground data-popup-open:bg-muted/50 data-popup-open:text-foreground";

export function SiteNav() {
  return (
    <nav className="hidden items-center gap-1 md:flex">
      <Popover>
        <PopoverTrigger className={navTriggerClassName}>
          Product
          <ChevronDown className="size-3" />
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <ProductNavMenu />
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger className={navTriggerClassName}>
          Solution
          <ChevronDown className="size-3" />
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-2.5">
          <SolutionNavMenu />
        </PopoverContent>
      </Popover>

      {simpleNavLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "inline-flex h-9 items-center rounded-lg px-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
