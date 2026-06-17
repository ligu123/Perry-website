import Link from "next/link";

import { productLifecycle } from "@/lib/product-navigation";

export function ProductNavMenu() {
  return (
    <ul className="space-y-0.5 p-2">
      {productLifecycle.map((stage) => (
        <li key={stage.slug}>
          <Link
            href={`/product/${stage.slug}`}
            className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {stage.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
