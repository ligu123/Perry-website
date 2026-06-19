const imageAspectRatios: Record<string, readonly [number, number]> = {
  "/images/solutions/in-house-lawyer.jpg": [6000, 4000],
  "/images/solutions/lps.jpg": [5184, 3456],
  "/images/solutions/portfolio-company.jpg": [5472, 3648],
  "/images/solutions/private-equity.jpg": [6000, 4000],
  "/images/solutions/venture-capital.jpg": [4800, 3840],
  "/images/chapters/collaboration.jpg": [1600, 1067],
  "/images/chapters/deal.jpg": [1600, 1068],
  "/images/chapters/diligence.jpg": [1600, 1060],
  "/images/chapters/exit.jpg": [1600, 1067],
  "/images/chapters/governance.jpg": [1600, 1068],
  "/images/chapters/investor.jpg": [1600, 1152],
  "/images/chapters/knowledge.jpg": [1600, 2400],
  "/images/chapters/legal-documents.jpg": [1600, 1067],
  "/images/chapters/obligations.jpg": [1600, 1060],
  "/images/chapters/portfolio.jpg": [1600, 1060],
};

export function getImageAspectRatio(src: string): number | undefined {
  const dimensions = imageAspectRatios[src];

  if (!dimensions) {
    return undefined;
  }

  const [width, height] = dimensions;
  return width / height;
}
