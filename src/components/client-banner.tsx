import Image from "@/components/asset-image";

import { cn } from "@/lib/utils";

const clients = [
  { name: "Antler", src: "/clients/antler.png", width: 420, height: 87 },
  { name: "Stakeboat Capital", src: "/clients/stakeboat-capital.png", width: 354, height: 87 },
  { name: "Kae Capital", src: "/clients/kae-capital.png", width: 354, height: 87 },
  { name: "ETP", src: "/clients/etp.png", width: 354, height: 87 },
] as const;

const MARQUEE_REPEATS = 3;

const marqueeClients = Array.from({ length: MARQUEE_REPEATS }, () => clients).flat();

function ClientLogos({
  ariaHidden = false,
  variant = "default",
}: {
  ariaHidden?: boolean;
  variant?: "default" | "hero";
}) {
  return (
    <>
      {marqueeClients.map((client, index) => (
        <li key={`${client.name}-${index}`} className="shrink-0">
          <Image
            src={client.src}
            alt={ariaHidden ? "" : client.name}
            width={client.width}
            height={client.height}
            aria-hidden={ariaHidden}
            className={cn(
              "h-7 w-auto max-w-[9.5rem] object-contain object-left",
              variant === "hero" ? "opacity-55" : "opacity-70",
            )}
          />
        </li>
      ))}
    </>
  );
}

type ClientBannerProps = {
  embedded?: boolean;
  variant?: "default" | "hero";
};

export function ClientBanner({ embedded = false, variant = "default" }: ClientBannerProps) {
  const isHero = variant === "hero";

  const content = (
    <>
      <p
        className={cn(
          "text-center text-sm font-medium",
          isHero ? "text-white/55" : "text-muted-foreground",
        )}
      >
        Trusted by leading private capital firms
      </p>

      <div className="relative mt-6 sm:mt-8">
        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_12%,black_88%,transparent_100%)]">
          <div className="flex w-max gap-12 sm:gap-16 animate-client-marquee motion-reduce:animate-none">
            <ul className="flex shrink-0 items-center gap-12 sm:gap-16">
              <ClientLogos variant={variant} />
            </ul>
            <ul
              className="flex shrink-0 items-center gap-12 sm:gap-16"
              aria-hidden
            >
              <ClientLogos ariaHidden variant={variant} />
            </ul>
          </div>
        </div>
      </div>
    </>
  );

  if (embedded) {
    return (
      <div aria-label="Trusted by" className={cn("w-full", isHero && "mx-auto max-w-4xl")}>
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
