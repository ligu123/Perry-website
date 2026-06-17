import { Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const clients = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  label: `Client logo ${(index % 6) + 1}`,
}));

function ClientLogos({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <>
      {clients.map((client) => (
        <li key={client.id} className="shrink-0">
          <Circle
            aria-hidden={ariaHidden}
            className="size-9 text-foreground/25"
            strokeWidth={1.25}
          />
          {!ariaHidden && <span className="sr-only">{client.label}</span>}
        </li>
      ))}
    </>
  );
}

type ClientBannerProps = {
  embedded?: boolean;
};

export function ClientBanner({ embedded = false }: ClientBannerProps) {
  const content = (
    <>
      <p className="text-center text-sm font-medium text-muted-foreground">
        Trusted by leading private capital firms
      </p>

      <div className="relative mt-8">
        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_12%,black_88%,transparent_100%)]">
          <div className="flex w-max animate-client-marquee motion-reduce:animate-none">
            <ul className="flex shrink-0 items-center gap-16 pr-16 sm:gap-20 sm:pr-20">
              <ClientLogos />
            </ul>
            <ul
              className="flex shrink-0 items-center gap-16 pr-16 sm:gap-20 sm:pr-20"
              aria-hidden={true}
            >
              <ClientLogos ariaHidden />
            </ul>
          </div>
        </div>
      </div>
    </>
  );

  if (embedded) {
    return (
      <div aria-label="Trusted by" className="w-full">
        {content}
      </div>
    );
  }

  return (
    <section
      aria-label="Trusted by"
      className={cn("bg-gradient-to-b from-muted/40 via-muted/20 to-background py-14")}
    >
      {content}
    </section>
  );
}
