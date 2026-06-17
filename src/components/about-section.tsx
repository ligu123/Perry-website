export function AboutSection() {
  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Built for teams who care about craft
          </h2>
          <p className="mt-4 text-muted-foreground">
            Perry was founded on a simple idea: marketing sites should be fast to ship,
            easy to maintain, and beautiful by default. We combine modern tooling with
            thoughtful defaults so you can focus on your message—not your infrastructure.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {[
            { value: "10x", label: "Faster time to launch" },
            { value: "99.9%", label: "Uptime on Vercel" },
            { value: "50+", label: "Components available" },
            { value: "24/7", label: "Support for teams" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-card p-6 shadow-sm"
            >
              <p className="text-3xl font-semibold tracking-tight">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
