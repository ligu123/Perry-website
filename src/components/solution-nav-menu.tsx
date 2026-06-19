import Link from "next/link";

import type { HeaderContrast } from "@/hooks/use-adaptive-header";
import {
  solutionByIndustry,
  solutionByRole,
} from "@/lib/solution-navigation";
import { cn } from "@/lib/utils";

function SolutionNavSection({
  title,
  items,
  contrast = "on-light",
}: {
  title: string;
  items: { slug: string; label: string }[];
  contrast?: HeaderContrast;
}) {
  const onDark = contrast === "on-dark";

  return (
    <div className="min-w-36">
      <p
        className={cn(
          "px-2 pb-2 text-xs",
          onDark ? "text-white/50" : "text-muted-foreground",
        )}
      >
        {title}
      </p>
      <ul className="space-y-0.5">
        {items.map((item) => (
          <li key={item.slug}>
            <Link
              href={`/solution/${item.slug}`}
              className={cn(
                "block rounded-lg px-2 py-1.5 text-sm transition-colors",
                onDark
                  ? "text-white/70 hover:bg-white/10 hover:text-white"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

type SolutionNavMenuProps = {
  contrast?: HeaderContrast;
};

export function SolutionNavMenu({ contrast = "on-light" }: SolutionNavMenuProps) {
  return (
    <div className="flex gap-8">
      <SolutionNavSection title="By role" items={solutionByRole} contrast={contrast} />
      <SolutionNavSection
        title="By industry"
        items={solutionByIndustry}
        contrast={contrast}
      />
    </div>
  );
}
