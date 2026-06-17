import Link from "next/link";

import {
  solutionByIndustry,
  solutionByRole,
} from "@/lib/solution-navigation";

function SolutionNavSection({
  title,
  items,
}: {
  title: string;
  items: { slug: string; label: string }[];
}) {
  return (
    <div className="min-w-36">
      <p className="px-2 pb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {title}
      </p>
      <ul className="space-y-0.5">
        {items.map((item) => (
          <li key={item.slug}>
            <Link
              href={`/solution/${item.slug}`}
              className="block rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SolutionNavMenu() {
  return (
    <div className="flex gap-8">
      <SolutionNavSection title="By role" items={solutionByRole} />
      <SolutionNavSection title="By industry" items={solutionByIndustry} />
    </div>
  );
}
