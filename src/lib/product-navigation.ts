import { platformIntelligenceProductImages } from "@/lib/platform-intelligence-product-images";

export type ProductFeature = {
  slug: string;
  label: string;
  eyebrow?: string;
  description: string;
  items?: string[];
  itemsLabel?: string;
  itemGroups?: { label?: string; items: string[] }[];
  outcome?: string;
  outcomes?: string[];
  imageSrc?: string;
};

export type ProductLifecycle = {
  slug: string;
  label: string;
  headline: string;
  description: string;
  kpis?: string[];
  heroImageSrc: string;
  ctaHeadline?: string;
  ctaLabel?: string;
  features: ProductFeature[];
};

export const productLifecycle: ProductLifecycle[] = [
  {
    slug: "fund-formation",
    label: "Fund Formation",
    headline: "Turn fund documents into a structured operating record",
    description:
      "Review side letters, consolidate investor terms, manage MFN elections and convert fund documents into ongoing obligations. Perry preserves every negotiation position and investor-specific commitment for the life of the fund.",
    kpis: [
      "Reduce time to find an investor term by 70%",
      "Cut MFN election cycle time by 50%",
      "Reduce missed or late fund obligations by 80%",
      "100% of negotiated terms captured in a searchable precedent record for future funds",
    ],
    heroImageSrc: platformIntelligenceProductImages.formation.negotiationReview,
    ctaHeadline: "Build the fund record once. Operate from it throughout the fund lifecycle.",
    ctaLabel: "Book demo",
    features: [
      {
        slug: "fund-document-review",
        label: "Know whether a side-letter term is acceptable before you agree to it",
        description:
          "Perry reviews each proposed side letter against the LPA, existing investor terms and the fund's historical negotiation positions. It helps the legal team understand whether a provision is standard, operationally burdensome or inconsistent with existing commitments.",
        imageSrc: platformIntelligenceProductImages.formation.negotiationReview,
        itemsLabel: "Capabilities",
        items: [
          "Compare proposed terms against the LPA",
          "Benchmark terms against prior side letters",
          "Identify unusual or operationally difficult provisions",
          "Suggest negotiation positions based on fund history",
          "Preserve comments and decisions for future negotiations",
        ],
        outcome:
          "Make more consistent negotiation decisions without manually reconstructing precedent.",
      },
      {
        slug: "master-investor-terms",
        label: "See similar terms, differences and commitments across all side letters",
        description:
          "Perry consolidates negotiated side-letter provisions into a structured master record. Similar terms are grouped together, differences are highlighted and each provision remains linked to the relevant investor and source document.",
        imageSrc: platformIntelligenceProductImages.formation.termConsolidation,
        itemsLabel: "Outputs",
        items: [
          "Consolidated term library",
          "Similarity and variance analysis",
          "Investor-specific rights",
          "Exceptions and non-standard terms",
          "Searchable negotiation history",
        ],
        outcome:
          "Replace fragmented side-letter summaries with one connected view across the fund.",
      },
      {
        slug: "mfn-workflow",
        label: "Run the full MFN process in one workspace",
        description:
          "Perry identifies which terms may be available to each LP, supports the legal review of eligible provisions and manages the communication and confirmation process.",
        imageSrc: platformIntelligenceProductImages.formation.mfnWorkflow,
        itemsLabel: "Workflow",
        items: [
          "Identify eligible terms",
          "Review availability",
          "Prepare investor options",
          "Share with the LP",
          "Record elections",
          "Update obligations",
        ],
        outcome:
          "Maintain a clear record of what was offered, selected and ultimately applied.",
      },
      {
        slug: "operational-obligations",
        label: "Turn LPAs and side letters into active operational tasks",
        description:
          "Perry identifies provisions that require action, notice, approval, reporting or recurring monitoring. Each requirement can be assigned, scheduled, tracked and reported without losing the underlying legal context.",
        imageSrc: platformIntelligenceProductImages.formation.operationalHandoff,
        itemsLabel: "Outputs",
        items: [
          "Recurring reporting obligations",
          "Notice requirements",
          "Consent workflows",
          "Key dates and deadlines",
          "Investor-specific restrictions",
          "Assigned operational tasks",
        ],
        outcome: "Move from static fund documents to a live obligation system.",
      },
      {
        slug: "collaboration",
        label: "Coordinate legal, investor relations and fund operations around the same terms",
        description:
          "Share selected provisions, review issues, investor records and actions with internal teams and external counsel. Each team sees the information relevant to its role, while legal retains control of the central record.",
        imageSrc: platformIntelligenceProductImages.management.teamCollaboration,
      },
    ],
  },
  {
    slug: "capital-deployment",
    label: "Capital Deployment",
    headline: "Review, negotiate and execute transactions with the full fund context",
    description:
      "Perry connects diligence, document review, negotiation and post-closing obligations in one legal workspace. Every deal benefits from the fund documents, prior decisions and transaction history already held in the platform.",
    kpis: [
      "Improve transaction consistency by 60%",
      "Reduce diligence review time by 50%",
      "Reduce time to surface fund restrictions by 90%",
      "Reduce missed post-closing obligations by 75%",
    ],
    heroImageSrc: platformIntelligenceProductImages.deployment.transactionWorkflow,
    ctaHeadline: "Run every deal with the legal context already in place",
    ctaLabel: "Book demo",
    features: [
      {
        slug: "review-negotiation",
        label: "Manage every transaction document through review, negotiation and approval",
        description:
          "Perry keeps comments, review issues, negotiation positions and approvals linked to the transaction. Because the platform understands prior transactions, it can help the team assess whether proposed terms are consistent with previous deals.",
        imageSrc: platformIntelligenceProductImages.deployment.transactionWorkflow,
        itemGroups: [
          {
            label: "Workflow",
            items: ["Review", "Compare", "Negotiate", "Approve", "Sign"],
          },
          {
            label: "Capabilities",
            items: [
              "Identify material deviations",
              "Compare against prior transactions",
              "Suggest accepted negotiation positions",
              "Assign review issues",
              "Track unresolved points",
              "Preserve final legal decisions",
            ],
          },
        ],
        outcome:
          "Maintain consistency without treating every deal as entirely new.",
      },
      {
        slug: "due-diligence",
        label: "Turn diligence materials into clear findings and actions",
        description:
          "Perry reviews legal documents, connects findings to the relevant target entities and organises issues according to severity, workstream and required action.",
        imageSrc: platformIntelligenceProductImages.deployment.diligenceToAction,
        itemsLabel: "Outputs",
        items: [
          "Review findings",
          "Legal risks",
          "Missing information",
          "Required follow-up",
          "Conditions to investment",
          "Diligence report",
        ],
      },
      {
        slug: "post-closing-obligations",
        eyebrow: "Closing is not the end",
        label: "Turn transaction terms into long-term actions",
        description:
          "Perry identifies covenants, information rights, consent rights, governance requirements and other post-closing obligations. These become owned, dated and trackable tasks linked to the deal and portfolio company.",
        imageSrc: platformIntelligenceProductImages.deployment.postClosingObligations,
        itemsLabel: "Outputs",
        items: [
          "Governance rights",
          "Reporting requirements",
          "Consent obligations",
          "Covenants",
          "Renewal and notice dates",
          "Follow-on actions",
        ],
      },
    ],
  },
  {
    slug: "fund-portfolio-management",
    label: "Fund & Portfolio Management",
    headline: "Turn legal history into continuous oversight",
    description:
      "Perry brings together obligations, transaction rights, legal decisions and portfolio information in one active operating view. Know what needs attention, what rights exist and what the fund has previously decided.",
    kpis: [
      "Cut legal question response time by 65%",
      "Reduce manual legal research by 70%",
      "100% of obligations visible in one operating view",
      "100% of legal decisions preserved in a searchable fund record",
    ],
    heroImageSrc: platformIntelligenceProductImages.management.ongoingWork,
    ctaHeadline: "Make the fund's legal context usable every day",
    ctaLabel: "Book demo",
    features: [
      {
        slug: "obligation-management",
        eyebrow: "One obligation system",
        label: "Manage ongoing work created during formation and investment",
        description:
          "Perry brings together tasks created from LPAs, side letters, transaction documents and portfolio agreements. Every task stays connected to the provision, document, entity and legal decision that created it.",
        imageSrc: platformIntelligenceProductImages.management.ongoingWork,
        itemsLabel: "Capabilities",
        items: [
          "Track recurring and one-off obligations",
          "Assign owners and deadlines",
          "Manage approvals and evidence of completion",
          "Escalate overdue actions",
          "Filter by fund, investor, deal or entity",
          "Report across the full obligation portfolio",
        ],
        outcome: "Replace separate legal trackers with one connected system.",
      },
      {
        slug: "legal-decision-dashboard",
        label: "Understand rights, restrictions and decisions across the portfolio",
        description:
          "Perry turns legal documents and transaction history into dashboards that help legal and investment teams see the fund's current position.",
        imageSrc: platformIntelligenceProductImages.management.portfolioVisibility,
        itemsLabel: "Example views",
        items: [
          "Transaction rights heatmap",
          "Consent and approval map",
          "Investor restriction overview",
          "Governance rights by portfolio company",
          "Upcoming legal deadlines",
          "Open review issues",
          "Historical legal decisions",
        ],
        outcome:
          "Make legal context visible without repeatedly rereading the underlying documents.",
      },
      {
        slug: "legal-question-centre",
        eyebrow: "Answers grounded in the fund record",
        label: "Give teams fast answers without turning legal into a help desk",
        description:
          "Internal teams can ask questions across the fund's documents, entities, transactions and obligations. Perry searches the relevant legal record, generates a grounded response and shows the source material behind the answer.",
        imageSrc: platformIntelligenceProductImages.management.legalQAndA,
        itemGroups: [
          {
            label: "Example questions",
            items: [
              "Does this transaction require LPAC consent?",
              "Which investors have this reporting right?",
              "What board rights do we hold in this company?",
              "Has the fund previously accepted this provision?",
              "What obligations are due this quarter?",
            ],
          },
          {
            label: "Controls",
            items: [
              "Source-linked answers",
              "Role-based access",
              "Legal review where required",
              "Preserved question and response history",
              "Escalation of uncertain questions",
            ],
          },
        ],
        outcome:
          "Scale access to legal knowledge while keeping the legal team in control.",
      },
    ],
  },
  {
    slug: "exit",
    label: "Exit",
    headline: "Enter every exit with the legal record already prepared",
    description:
      "Perry carries documents, entity records, legal decisions, obligations and transaction history from acquisition through ownership and into exit. Know what is ready, what is missing and what needs attention before diligence begins.",
    kpis: [
      "Reduce legal gaps before exit by 80%",
      "Cut exit diligence prep time by 55%",
      "Reduce buyer diligence response time by 65%",
      "Track 100% of post-exit obligations from close",
    ],
    heroImageSrc: platformIntelligenceProductImages.exit.legalContinuity,
    ctaHeadline: "Make exit readiness part of the investment lifecycle",
    ctaLabel: "Book demo",
    features: [
      {
        slug: "exit-readiness",
        eyebrow: "Prepare before the process starts",
        label: "Assess the legal readiness of every portfolio company",
        description:
          "Perry reviews the existing entity and legal record to identify missing documents, unresolved obligations, approval requirements and potential transaction issues.",
        imageSrc: platformIntelligenceProductImages.exit.exitReadiness,
        itemsLabel: "Outputs",
        items: [
          "Missing document list",
          "Outstanding corporate actions",
          "Unresolved legal issues",
          "Required consents",
          "Open obligations",
          "Recommended next steps",
        ],
        outcome: "Identify legal gaps before they slow down the transaction.",
      },
      {
        slug: "transaction-document-review",
        label: "Make sure you have a clean exit",
        description:
          "Perry reviews exit transaction documents against the fund's legal record, prior decisions and outstanding obligations — surfacing issues before they reach the buyer.",
        imageSrc: platformIntelligenceProductImages.exit.continuationNegotiation,
      },
      {
        slug: "post-exit-tracking",
        eyebrow: "Continue after completion",
        label: "Track retained obligations after the transaction closes",
        description:
          "Perry turns warranties, indemnities, escrow terms, earn-outs and retained responsibilities into trackable post-exit actions.",
        imageSrc: platformIntelligenceProductImages.exit.obligationTracking,
        itemsLabel: "Outputs",
        items: [
          "Warranty and indemnity periods",
          "Escrow deadlines",
          "Earn-out milestones",
          "Claims and notices",
          "Retained liabilities",
          "Post-completion deliverables",
        ],
      },
    ],
  },
];

export const primaryProductLifecycleHref = `/product/${productLifecycle[0].slug}`;

export function getProductLifecycle(slug: string) {
  return productLifecycle.find((stage) => stage.slug === slug);
}

export function getProductFeature(lifecycleSlug: string, featureSlug: string) {
  const lifecycle = getProductLifecycle(lifecycleSlug);
  if (!lifecycle) return undefined;

  const feature = lifecycle.features.find((item) => item.slug === featureSlug);
  if (!feature) return undefined;

  return { lifecycle, feature };
}
