const testimonials = [
  {
    quote:
      "Perry replaced three disconnected tools for our fund legal team. We finally have one place for LPAs, side letters, and closing checklists.",
    name: "Sarah Chen",
    role: "General Counsel",
    firm: "Placeholder Capital Partners",
  },
  {
    quote:
      "Our portfolio companies used to chase signatures over email. Now consents and reporting requests go through a portal — everyone knows what's pending.",
    name: "Marcus Webb",
    role: "VP, Legal Operations",
    firm: "Placeholder Ventures",
  },
  {
    quote:
      "LP onboarding used to take weeks of back-and-forth. With Perry, subscription docs and KYC status are visible to our IR team in real time.",
    name: "Elena Rodriguez",
    role: "Head of Investor Relations",
    firm: "Placeholder Equity",
  },
];

export function TestimonialSection() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
            Testimonials
          </p>
          <h2 className="mt-3 font-source-serif text-3xl font-medium tracking-tight text-balance sm:text-4xl">
            Trusted by legal teams at leading firms
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <figure
              key={item.name}
              className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <blockquote className="text-sm leading-relaxed text-pretty">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-border/60 pt-4">
                <p className="font-medium">{item.name}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {item.role}, {item.firm}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
