export type ProductFeature = {
  slug: string;
  label: string;
  description: string;
  outcomes: string[];
};

export type ProductLifecycle = {
  slug: string;
  label: string;
  description: string;
  heroImageSrc: string;
  features: ProductFeature[];
};

export const productLifecycle: ProductLifecycle[] = [
  {
    slug: "fund-formation",
    label: "Fund Formation",
    description:
      "Every new fund begins with structure, documents, and filings scattered across spreadsheets and email. Perry connects each formation step into one traceable workflow — from entity design through final investor terms.",
    heroImageSrc: "/platform-layers/fund-lifecycle.svg",
    features: [
      {
        slug: "entity-structuring",
        label: "Entity structuring",
        description:
          "Model fund entities, blockers, and carry vehicles in one place — with relationships, ownership, and jurisdiction context that stays current as the structure evolves.",
        outcomes: [
          "Single source of truth for fund entity hierarchies",
          "Fewer errors when structures change mid-formation",
          "Clear handoff from structuring into document generation",
        ],
      },
      {
        slug: "lpa-generation",
        label: "LPA generation",
        description:
          "Draft and iterate fund documents with version control built in. Compare drafts, track redlines, and keep the master agreement authoritative while side negotiations continue.",
        outcomes: [
          "Version history on every material term change",
          "Faster iteration between legal and fund ops",
          "Master agreement stays the anchor for all downstream docs",
        ],
      },
      {
        slug: "regulatory-filings",
        label: "Regulatory filings",
        description:
          "Track formation filings and deadlines across jurisdictions. Know what is due, who owns it, and what evidence sits behind each submission.",
        outcomes: [
          "Deadline visibility across multiple regulators",
          "Audit-ready filing records from day one",
          "No last-minute scramble before first close",
        ],
      },
      {
        slug: "side-letters",
        label: "Side letters",
        description:
          "Manage investor-specific terms without losing the master agreement. Map side letter provisions back to the LPA and surface conflicts before they become operational risk.",
        outcomes: [
          "Side letter terms linked to master fund docs",
          "Conflict detection before commitments go live",
          "Consistent treatment across subsequent closings",
        ],
      },
    ],
  },
  {
    slug: "investment-period",
    label: "Investment Period",
    description:
      "The investment window moves fast — subscriptions, closings, capital calls, and post-close obligations all compete for attention. Perry keeps each handoff visible so nothing falls through the cracks between legal, finance, and operations.",
    heroImageSrc: "/platform-layers/collaboration-layer.svg",
    features: [
      {
        slug: "investor-onboarding",
        label: "Investor onboarding",
        description:
          "Guide LPs through subscription with a single source of truth. Track KYC status, document collection, and approval steps in one coordinated workflow.",
        outcomes: [
          "LPs see exactly what is outstanding and why",
          "Legal and ops work from the same subscription record",
          "Faster closes with fewer back-and-forth emails",
        ],
      },
      {
        slug: "deal-execution",
        label: "Deal execution",
        description:
          "Move from term sheet to closing with coordinated checklists and approvals. Assign owners, track conditions precedent, and keep every party aligned through signing.",
        outcomes: [
          "Closing checklists with clear ownership and status",
          "Condition tracking that survives team changes",
          "Complete closing binder without manual assembly",
        ],
      },
      {
        slug: "capital-calls",
        label: "Capital calls",
        description:
          "Issue notices, track funding, and reconcile commitments in one workflow. Tie each call back to the fund docs and LP records that authorize it.",
        outcomes: [
          "Notices generated from authoritative fund data",
          "Real-time funding status across all LPs",
          "Reconciliation that matches legal and finance records",
        ],
      },
      {
        slug: "post-close-filings",
        label: "Post-close filings",
        description:
          "Capture filing obligations triggered at closing. Route ownership, set deadlines, and store evidence so regulatory follow-up does not depend on memory.",
        outcomes: [
          "Closing-triggered obligations captured automatically",
          "Clear accountability for each filing requirement",
          "Evidence stored alongside the deal record",
        ],
      },
    ],
  },
  {
    slug: "portfolio-management",
    label: "Portfolio Management",
    description:
      "After close, obligations do not pause — covenants renew, boards meet, filings recur, and LPs expect updates. Perry turns ongoing portfolio work into a predictable rhythm with one shared record.",
    heroImageSrc: "/platform-layers/fund-entity-layer.svg",
    features: [
      {
        slug: "covenant-tracking",
        label: "Covenant tracking",
        description:
          "Monitor portfolio company covenants and breach notifications. Surface upcoming tests, waivers, and amendments before they become surprises.",
        outcomes: [
          "Proactive alerts before covenant deadlines",
          "Full history of waivers and amendments",
          "Legal and deal teams aligned on portfolio risk",
        ],
      },
      {
        slug: "board-consents",
        label: "Board consents",
        description:
          "Route, execute, and store consents with full audit trails. From draft resolution through signature collection, every step is visible and attributable.",
        outcomes: [
          "Consent workflows with defined approval paths",
          "Executed documents linked to the company record",
          "Audit trail for governance and LP reporting",
        ],
      },
      {
        slug: "regulatory-reporting",
        label: "Regulatory reporting",
        description:
          "Prepare recurring filings with reusable data and templates. Pull from portfolio records instead of rebuilding spreadsheets each quarter.",
        outcomes: [
          "Reusable data models across reporting cycles",
          "Template-driven filings with less manual rework",
          "Consistent submissions across the portfolio",
        ],
      },
      {
        slug: "portfolio-reporting",
        label: "Portfolio reporting",
        description:
          "Consolidate company updates, valuations, and LP reporting inputs. Give fund ops and legal a shared view of what goes into each LP update.",
        outcomes: [
          "Single pipeline from company data to LP materials",
          "Less duplication between legal and investor relations",
          "Timely reporting without last-minute data hunts",
        ],
      },
    ],
  },
  {
    slug: "exit",
    label: "Exit",
    description:
      "Exit events compress months of work into weeks — sale processes, distribution calculations, wind-down checklists, and final LP communications must stay in sync. Perry orchestrates the full exit arc in one place.",
    heroImageSrc: "/platform-layers/legal-engineering-layer.svg",
    features: [
      {
        slug: "exit-workflows",
        label: "Exit workflows",
        description:
          "Coordinate sale processes, approvals, and closing documentation. Track milestones from LOI through signing with the same rigor as initial deal closings.",
        outcomes: [
          "Structured exit process with clear milestones",
          "Approvals and docs tied to the transaction record",
          "Smooth transition from sale close to distribution",
        ],
      },
      {
        slug: "distributions",
        label: "Distributions",
        description:
          "Calculate and communicate LP distributions with full audit trails. Connect waterfall logic to fund docs and produce notices that match the numbers.",
        outcomes: [
          "Distribution calculations traceable to fund terms",
          "LP notices generated from authoritative data",
          "Finance and legal reconciled before funds move",
        ],
      },
      {
        slug: "fund-wind-down",
        label: "Fund wind-down",
        description:
          "Run dissolution checklists and final regulatory obligations. Track every remaining task from final audit through entity dissolution.",
        outcomes: [
          "Complete wind-down checklist with ownership",
          "Final regulatory filings captured and stored",
          "Clean close with nothing left in email threads",
        ],
      },
      {
        slug: "lp-communications",
        label: "LP communications",
        description:
          "Deliver exit notices and final reporting through a secure portal. LPs get timely, consistent updates without relying on ad hoc distribution lists.",
        outcomes: [
          "Secure delivery of exit and final fund materials",
          "Consistent messaging across all limited partners",
          "Complete communication history for the fund record",
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
