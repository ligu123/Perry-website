type PageHeaderProps = {
  title: string;
  description: string;
};

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 text-center sm:py-24">
      <h1 className="font-source-serif text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        {title}
      </h1>
      <p className="mt-4 text-lg text-muted-foreground text-pretty">{description}</p>
    </div>
  );
}
