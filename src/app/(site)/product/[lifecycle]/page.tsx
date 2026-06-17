import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { StoryChapter } from "@/components/story-chapter";
import { StoryPageHero } from "@/components/story-page-hero";
import { getProductLifecycle, productLifecycle } from "@/lib/product-navigation";

type LifecyclePageProps = {
  params: Promise<{ lifecycle: string }>;
};

export async function generateStaticParams() {
  return productLifecycle.map((stage) => ({ lifecycle: stage.slug }));
}

export async function generateMetadata({
  params,
}: LifecyclePageProps): Promise<Metadata> {
  const { lifecycle: lifecycleSlug } = await params;
  const lifecycle = getProductLifecycle(lifecycleSlug);

  if (!lifecycle) {
    return { title: "Product" };
  }

  return {
    title: lifecycle.label,
    description: lifecycle.description,
  };
}

export default async function LifecyclePage({ params }: LifecyclePageProps) {
  const { lifecycle: lifecycleSlug } = await params;
  const lifecycle = getProductLifecycle(lifecycleSlug);

  if (!lifecycle) {
    notFound();
  }

  return (
    <div className="border-t border-border/60">
      <StoryPageHero
        eyebrow="Product"
        title={lifecycle.label}
        description={lifecycle.description}
        imageSrc={lifecycle.heroImageSrc}
        imageAlt={`${lifecycle.label} overview`}
      />

      {lifecycle.features.map((feature, index) => (
        <StoryChapter
          key={feature.slug}
          id={feature.slug}
          index={index + 1}
          title={feature.label}
          description={feature.description}
          outcomes={feature.outcomes}
        />
      ))}
    </div>
  );
}
