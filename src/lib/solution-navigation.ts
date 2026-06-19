export type SolutionStoryChapter = {
  eyebrow?: string;
  title: string;
  body: string;
  items?: string[];
  itemsLabel?: string;
  imageSrc?: string;
};

export type SolutionPage = {
  slug: string;
  label: string;
  headline: string;
  description: string;
  kpis?: string[];
  heroImageSrc: string;
  cardImageSrc: string;
  chapters: SolutionStoryChapter[];
  ctaHeadline?: string;
  ctaLabel?: string;
};

export const solutionByRole: SolutionPage[] = [
  {
    slug: "in-house-lawyer",
    label: "In-house lawyer",
    headline: "Run legal across every fund, deal and portfolio company",
    description:
      "Perry gives private capital legal teams one connected view of documents, entities, obligations, legal decisions and external collaboration.",
    kpis: [
      "Less repeated legal research",
      "More consistent negotiation positions",
      "Fewer missed obligations",
      "Faster responses to the business",
      "Better control of external counsel",
      "Stronger institutional knowledge",
    ],
    heroImageSrc: "/images/solutions/in-house-lawyer.jpg",
    cardImageSrc: "/images/solutions/cards/in-house-lawyer.jpg",
    chapters: [
      {
        title: "Make consistent legal decisions",
        body:
          "Use prior negotiations, fund terms and transaction history when reviewing new legal work.",
        imageSrc: "/images/chapters/legal-documents.jpg",
      },
      {
        title: "Stay ahead of obligations",
        body:
          "Turn legal terms into owned, trackable and reportable actions.",
        imageSrc: "/images/chapters/obligations.jpg",
      },
      {
        title: "Scale access to legal knowledge",
        body:
          "Give teams fast, grounded answers while preserving legal oversight.",
        imageSrc: "/images/chapters/knowledge.jpg",
      },
      {
        eyebrow: "How teams use Perry",
        title: "How in-house legal teams use Perry",
        body: "",
        imageSrc: "/images/chapters/collaboration.jpg",
        items: [
          "Review side letters and fund documents",
          "Run MFN processes",
          "Review and negotiate transaction documents",
          "Review diligence materials",
          "Check investments against fund restrictions",
          "Manage ongoing obligations",
          "Answer internal legal questions",
          "Coordinate external counsel",
          "Prepare for exit",
        ],
      },
    ],
    ctaHeadline: "Give your legal team one connected system for every fund and deal",
    ctaLabel: "Book demo",
  },
  {
    slug: "portfolio-company",
    label: "Portfolio company",
    headline: "Complete investor legal work without the email chain",
    description:
      "Respond to requests, share entity records, complete approvals and prepare for transactions through one controlled workspace.",
    heroImageSrc: "/images/solutions/portfolio-company.jpg",
    cardImageSrc: "/images/solutions/cards/portfolio-company.jpg",
    chapters: [
      {
        eyebrow: "Core use cases",
        title: "Everything your investors need, in one place",
        body: "",
        imageSrc: "/images/chapters/governance.jpg",
        items: [
          "Upload corporate records",
          "Respond to legal questions",
          "Complete consent requests",
          "Manage board and shareholder actions",
          "Track investor reporting obligations",
          "Prepare documents for financing or exit",
        ],
      },
      {
        eyebrow: "Focused workspace",
        title: "Show only what matters",
        body: "",
        imageSrc: "/images/chapters/collaboration.jpg",
        itemsLabel: "Show only",
        items: [
          "Requests",
          "Documents",
          "Entities",
          "Approvals",
          "Tasks",
          "Questions",
          "Completed actions",
        ],
      },
      {
        eyebrow: "Outcomes",
        title: "Clearer governance, faster responses",
        body: "",
        imageSrc: "/images/chapters/deal.jpg",
        items: [
          "Clearer requests",
          "Faster responses",
          "Fewer repeated uploads",
          "Better governance records",
          "Stronger transaction readiness",
        ],
      },
    ],
    ctaHeadline: "Respond to investor legal work without the back-and-forth",
    ctaLabel: "Book demo",
  },
  {
    slug: "lps",
    label: "LPs",
    headline: "A clearer way to manage fund legal interactions",
    description:
      "Review fund documents, complete onboarding, make MFN elections and respond to legal requests through one secure investor workspace.",
    heroImageSrc: "/images/solutions/lps.jpg",
    cardImageSrc: "/images/solutions/cards/lps.jpg",
    chapters: [
      {
        eyebrow: "Core use cases",
        title: "From onboarding to ongoing investor actions",
        body: "",
        imageSrc: "/images/chapters/investor.jpg",
        items: [
          "Subscription and onboarding",
          "KYC and AML requests",
          "Side-letter review",
          "MFN elections",
          "Consent requests",
          "Notices and investor communications",
        ],
      },
      {
        eyebrow: "Investor visibility",
        title: "Everything in one secure workspace",
        body: "",
        imageSrc: "/images/chapters/legal-documents.jpg",
        items: [
          "Outstanding actions",
          "Available MFN rights",
          "Submitted information",
          "Fund documents",
          "Elections and consents",
          "Historical communications",
        ],
      },
      {
        eyebrow: "Outcomes",
        title: "A complete investor legal record",
        body: "",
        imageSrc: "/images/chapters/governance.jpg",
        items: [
          "Greater transparency",
          "Faster onboarding",
          "Easier MFN completion",
          "Fewer repeated requests",
          "A complete investor legal record",
        ],
      },
    ],
    ctaHeadline: "Manage fund legal interactions in one secure workspace",
    ctaLabel: "Book demo",
  },
];

export const solutionByIndustry: SolutionPage[] = [
  {
    slug: "vc",
    label: "Venture capital",
    headline: "Legal infrastructure for high-volume investing",
    description:
      "Perry helps lean venture teams review more deals, manage larger portfolios and preserve legal context across repeated investment activity.",
    heroImageSrc: "/images/solutions/venture-capital.jpg",
    cardImageSrc: "/images/solutions/cards/venture-capital.jpg",
    chapters: [
      {
        eyebrow: "Most relevant workflows",
        title: "Built for the pace of venture investing",
        body: "",
        imageSrc: "/images/chapters/deal.jpg",
        items: [
          "Rapid investment document review",
          "High-volume document review",
          "Fund mandate checks",
          "Follow-on financing",
          "Portfolio governance requests",
          "Rights tracking",
          "Exit readiness",
        ],
      },
      {
        eyebrow: "Why Perry fits VC",
        title: "Designed for lean teams and repeated deal structures",
        body: "",
        imageSrc: "/images/chapters/diligence.jpg",
        items: [
          "Repeated deal structures",
          "Large portfolio counts",
          "Lean legal teams",
          "Frequent follow-on rounds",
          "High volume of internal questions",
          "Need for reusable precedent",
        ],
      },
      {
        eyebrow: "Outcomes",
        title: "Scale legal support without scaling headcount",
        body: "",
        imageSrc: "/images/chapters/portfolio.jpg",
        items: [
          "Faster review across more deals",
          "More consistent terms",
          "Better portfolio visibility",
          "Reduced legal administrative load",
          "Scalable access to legal knowledge",
        ],
      },
    ],
    ctaHeadline: "Scale legal support across more deals without scaling headcount",
    ctaLabel: "Book demo",
  },
  {
    slug: "pe",
    label: "Private equity",
    headline: "Legal control across complex ownership structures",
    description:
      "Perry connects fund restrictions, transaction documents, portfolio rights and ongoing obligations from acquisition through exit.",
    heroImageSrc: "/images/solutions/private-equity.jpg",
    cardImageSrc: "/images/solutions/cards/private-equity.jpg",
    chapters: [
      {
        eyebrow: "Most relevant workflows",
        title: "From diligence through exit",
        body: "",
        imageSrc: "/images/chapters/diligence.jpg",
        items: [
          "Fund restriction and mandate checks",
          "Legal diligence",
          "Transaction review and negotiation",
          "Holding structure management",
          "Governance and covenant tracking",
          "Add-ons and refinancings",
          "Exit readiness",
        ],
      },
      {
        eyebrow: "Why Perry fits PE",
        title: "Built for complexity and long hold periods",
        body: "",
        imageSrc: "/images/chapters/governance.jpg",
        items: [
          "Complex transaction structures",
          "Large document sets",
          "Extensive adviser involvement",
          "Multiple holding and acquisition entities",
          "Long-term governance obligations",
          "Repeated portfolio events",
        ],
      },
      {
        eyebrow: "Outcomes",
        title: "Continuity from deal to portfolio to exit",
        body: "",
        imageSrc: "/images/chapters/exit.jpg",
        items: [
          "Better deal-to-portfolio continuity",
          "More consistent legal decisions",
          "Stronger governance oversight",
          "Clearer external counsel coordination",
          "Earlier exit preparation",
        ],
      },
    ],
    ctaHeadline: "Maintain legal control from diligence through exit",
    ctaLabel: "Book demo",
  },
];

export const allSolutionPages = [...solutionByRole, ...solutionByIndustry];

export function getSolutionPage(slug: string) {
  return allSolutionPages.find((page) => page.slug === slug);
}
