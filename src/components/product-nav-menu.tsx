import Link from "next/link";

import type { HeaderContrast } from "@/hooks/use-adaptive-header";
import { productLifecycle } from "@/lib/product-navigation";
import { cn } from "@/lib/utils";

type ProductNavMenuProps = {
  contrast?: HeaderContrast;
};

export function ProductNavMenu({ contrast = "on-light" }: ProductNavMenuProps) {
  const onDark = contrast === "on-dark";

  return (
    <ul className="space-y-0.5 p-2">
      {productLifecycle.map((stage) => (
        <li key={stage.slug}>
          <Link
            href={`/product/${stage.slug}`}
            className={cn(
              "block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors",
              onDark
                ? "text-white/70 hover:bg-white/10 hover:text-white"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {stage.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
