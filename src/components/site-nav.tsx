"use client";

import Link from "next/link";
import { useState } from "react";

import { ProductNavMenu } from "@/components/product-nav-menu";
import { SolutionNavMenu } from "@/components/solution-nav-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import type { HeaderContrast } from "@/hooks/use-adaptive-header";
import { simpleNavLinks } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type SiteNavProps = {
  contrast?: HeaderContrast;
};

export function SiteNav({ contrast = "on-light" }: SiteNavProps) {
  const onDark = contrast === "on-dark";
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const navTriggerClassName = cn(
    "h-9 gap-1 px-2.5 py-0 text-sm font-normal transition-colors",
    onDark
      ? "text-white/80 hover:bg-white/10 hover:text-white focus:bg-white/10 data-popup-open:bg-white/10 data-popup-open:hover:bg-white/10 data-popup-open:text-white data-open:bg-white/10 data-open:hover:bg-white/10 data-open:focus:bg-white/10 data-open:text-white"
      : "text-muted-foreground hover:bg-muted hover:text-foreground focus:bg-muted data-popup-open:bg-muted/50 data-popup-open:hover:bg-muted data-popup-open:text-foreground data-open:bg-muted/50 data-open:hover:bg-muted data-open:focus:bg-muted data-open:text-foreground",
  );

  const navLinkClassName = cn(
    "inline-flex h-9 items-center rounded-sm px-2.5 text-sm transition-colors",
    onDark
      ? "text-white/80 hover:bg-white/10 hover:text-white focus:bg-white/10"
      : "text-muted-foreground hover:bg-muted hover:text-foreground focus:bg-muted",
  );

  const menuPopupClassName = onDark
    ? "border border-white/10 bg-black/70 text-white shadow-none ring-0 backdrop-blur-md"
    : undefined;

  return (
    <NavigationMenu
      value={activeItem}
      onValueChange={(nextValue, eventDetails) => {
        if (eventDetails.reason === "trigger-press") {
          return;
        }
        setActiveItem(nextValue);
      }}
      className="hidden max-w-none flex-none justify-start md:flex"
      align="start"
      delay={100}
      closeDelay={250}
      popupClassName={menuPopupClassName}
    >
      <NavigationMenuList className="gap-4">
        <NavigationMenuItem value="product">
          <NavigationMenuTrigger className={navTriggerClassName}>
            Product
          </NavigationMenuTrigger>
          <NavigationMenuContent className="p-0">
            <ProductNavMenu contrast={contrast} />
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem value="solution">
          <NavigationMenuTrigger className={navTriggerClassName}>
            Solution
          </NavigationMenuTrigger>
          <NavigationMenuContent className="p-0">
            <div className="p-2.5">
              <SolutionNavMenu contrast={contrast} />
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {simpleNavLinks.map((link) => (
          <NavigationMenuItem key={link.href}>
            <Link href={link.href} className={navLinkClassName}>
              {link.label}
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
