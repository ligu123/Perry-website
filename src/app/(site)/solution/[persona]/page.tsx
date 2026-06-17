import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { StoryChapter } from "@/components/story-chapter";
import { StoryPageHero } from "@/components/story-page-hero";
import { allSolutionPages, getSolutionPage } from "@/lib/solution-navigation";

type SolutionDetailPageProps = {
  params: Promise<{ persona: string }>;
};

export async function generateStaticParams() {
  return allSolutionPages.map((page) => ({ persona: page.slug }));
}

export async function generateMetadata({
  params,
}: SolutionDetailPageProps): Promise<Metadata> {
  const { persona: slug } = await params;
  const page = getSolutionPage(slug);

  if (!page) {
    return { title: "Solution" };
  }

  return {
    title: page.label,
    description: page.description,
  };
}

export default async function SolutionDetailPage({
  params,
}: SolutionDetailPageProps) {
  const { persona: slug } = await params;
  const page = getSolutionPage(slug);

  if (!page) {
    notFound();
  }

  return (
    <div className="border-t border-border/60">
      <StoryPageHero
        eyebrow="Solution"
        title={page.label}
        description={page.description}
      />

      {page.chapters.map((chapter, index) => (
        <StoryChapter
          key={chapter.title}
          index={index + 1}
          title={chapter.title}
          description={chapter.body}
        />
      ))}
    </div>
  );
}
