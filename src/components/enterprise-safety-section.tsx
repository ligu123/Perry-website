import { Lock, Server, ShieldCheck, UserCheck } from "lucide-react";

const safetyItems = [
  {
    icon: ShieldCheck,
    title: "Enterprise-grade security",
    description:
      "SOC 2 Type II certified infrastructure with encryption at rest and in transit.",
  },
  {
    icon: Lock,
    title: "Role-based access control",
    description:
      "Granular permissions for legal, finance, and external counsel — audit every action.",
  },
  {
    icon: Server,
    title: "Data residency options",
    description:
      "Deploy in regions that meet your regulatory and LP reporting requirements.",
  },
  {
    icon: UserCheck,
    title: "SSO & SCIM provisioning",
    description:
      "Integrate with your identity provider for seamless onboarding and offboarding.",
  },
];

export function EnterpriseSafetySection() {
  return (
    <section className="border-y border-border/60 bg-muted/20 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
              Enterprise safety
            </p>
            <h2 className="mt-3 font-source-serif text-3xl font-medium tracking-tight text-balance sm:text-4xl">
              Security your LPs and counsel can trust
            </h2>
            <p className="mt-4 text-muted-foreground text-pretty">
              Private capital firms handle sensitive fund documents, investor data, and
              regulatory filings. Perry is built with the controls and audit trails
              enterprise legal teams expect.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {safetyItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-xl border border-border bg-card p-5 shadow-sm"
                >
                  <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                    <Icon className="size-4 text-muted-foreground" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-3 font-medium tracking-tight">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground text-pretty">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
