export type WhyPerryItem = {
  title: string;
  description: string;
};

export type WhyPerryContent = {
  heading: string;
  items: WhyPerryItem[];
};

const defaultWhyPerry: WhyPerryContent = {
  heading: "Why funds need Perry",
  items: [
    {
      title: "Mitigate risk exposure",
      description: "Track obligations, restrictions and governance before they become issues.",
    },
    {
      title: "Institutional knowledge",
      description: "Keep negotiation history and fund terms with the firm.",
    },
    {
      title: "Take control of data",
      description: "Documents, entities and records in one system you own.",
    },
    {
      title: "Take control of external legal spend",
      description: "Clear mandates and shared context for external counsel.",
    },
  ],
};

export const whyPerryByPersona: Record<string, WhyPerryContent> = {
  "in-house-lawyer": {
    heading: "Why in-house legal teams need Perry",
    items: [
      {
        title: "Mitigate risk exposure",
        description: "Track obligations, restrictions and governance before they become issues.",
      },
      {
        title: "Institutional knowledge",
        description: "Keep negotiation history and fund terms with the firm.",
      },
      {
        title: "Take control of data",
        description: "Documents, entities and records in one system you own.",
      },
      {
        title: "Take control of external legal spend",
        description: "Clear mandates and shared context for external counsel.",
      },
    ],
  },
  "portfolio-company": {
    heading: "Why portfolio companies need Perry",
    items: [
      {
        title: "Clear investor requests",
        description: "See exactly what your fund needs and what has already been shared.",
      },
      {
        title: "End the email chain",
        description: "Respond once in a shared workspace instead of repeating uploads.",
      },
      {
        title: "Governance you can prove",
        description: "Board actions, consents and records in one auditable place.",
      },
      {
        title: "Ready for the next round",
        description: "Corporate records and approvals prepared before financing or exit.",
      },
    ],
  },
  lps: {
    heading: "Why LPs need Perry",
    items: [
      {
        title: "Complete investor visibility",
        description: "Fund documents, elections and consents in one secure workspace.",
      },
      {
        title: "Faster onboarding",
        description: "Complete subscription, KYC and side-letter review without back-and-forth.",
      },
      {
        title: "MFN made manageable",
        description: "See available rights and complete elections with full context.",
      },
      {
        title: "Fewer repeated asks",
        description: "Submit information once and keep a complete investor legal record.",
      },
    ],
  },
  vc: {
    heading: "Why venture funds need Perry",
    items: [
      {
        title: "Keep pace with deal volume",
        description: "Review more term sheets and follow-ons without adding headcount.",
      },
      {
        title: "Reuse what worked",
        description: "Apply prior negotiations and precedent across repeated deal structures.",
      },
      {
        title: "Portfolio at scale",
        description: "Preserve legal context across governance requests and follow-on rounds.",
      },
      {
        title: "Lean team, full coverage",
        description: "Give the business grounded answers without buried institutional knowledge.",
      },
    ],
  },
  pe: {
    heading: "Why private equity funds need Perry",
    items: [
      {
        title: "Continuity across the hold",
        description: "Connect diligence, acquisition documents and portfolio obligations.",
      },
      {
        title: "Complex structures, one view",
        description: "Holding entities, covenants and adviser work in one system.",
      },
      {
        title: "Governance that lasts",
        description: "Track long-term obligations from close through add-ons and exit.",
      },
      {
        title: "Earlier exit readiness",
        description: "Assemble legal context before the exit process starts.",
      },
    ],
  },
};

export function getWhyPerryContent(persona: string): WhyPerryContent {
  return whyPerryByPersona[persona] ?? defaultWhyPerry;
}
