export type SolutionStoryChapter = {
  title: string;
  body: string;
};

export type SolutionPage = {
  slug: string;
  label: string;
  description: string;
  chapters: SolutionStoryChapter[];
};

export const solutionByRole: SolutionPage[] = [
  {
    slug: "in-house-lawyer",
    label: "In-house lawyer",
    description:
      "Run fund legal operations from a single workspace — fewer tools, fewer handoffs, full visibility.",
    chapters: [
      {
        title: "Centralize fund documents and approvals",
        body:
          "Stop chasing versions across email and shared drives. Perry gives in-house legal teams one workspace for fund docs, approval chains, and execution status — so you always know which version is live and who signed off.",
      },
      {
        title: "Automate recurring compliance workflows",
        body:
          "Formation filings, recurring regulatory submissions, and portfolio obligations follow predictable patterns. Perry turns them into repeatable workflows with deadlines, owners, and evidence — reducing manual tracking without losing control.",
      },
      {
        title: "Collaborate with finance and operations in one system",
        body:
          "Capital calls, distributions, and LP communications depend on legal accuracy. When finance and ops work from the same fund record, reconciliations happen faster and disputes about terms become rare.",
      },
    ],
  },
  {
    slug: "portfolio-company",
    label: "Portfolio company",
    description:
      "Respond to investor requests, consents, and reporting obligations without email chaos.",
    chapters: [
      {
        title: "Clear portals for document requests and signatures",
        body:
          "Investors send requests; legal teams need responses. Portfolio companies get structured portals for document uploads, consent execution, and status tracking — no more lost attachments or unclear deadlines.",
      },
      {
        title: "Track covenant and reporting deadlines",
        body:
          "Loan covenants and investor reporting obligations pile up quietly. Perry surfaces upcoming deadlines with context on what is due and who needs to act, so portfolio teams stay ahead of breaches and missed submissions.",
      },
      {
        title: "Maintain a shared record with your investors",
        body:
          "Every consent, filing, and report becomes part of a shared record accessible to authorized stakeholders. When investors ask what happened and when, the answer is already documented.",
      },
    ],
  },
  {
    slug: "lps",
    label: "LPs",
    description:
      "Give limited partners a transparent view into subscriptions, notices, and fund communications.",
    chapters: [
      {
        title: "Self-serve access to subscription and KYC status",
        body:
          "Limited partners should not need to email for updates on their subscription progress. Perry provides secure self-serve access to KYC status, outstanding items, and next steps — reducing friction for both LPs and fund teams.",
      },
      {
        title: "Timely capital call and distribution notices",
        body:
          "Capital events require precision and timeliness. LPs receive notices generated from authoritative fund data, with clear amounts, deadlines, and supporting documentation in one secure location.",
      },
      {
        title: "Secure document room for fund materials",
        body:
          "Quarterly reports, side letters, and fund updates belong in a controlled environment. LPs access materials through a secure portal with a complete history — not scattered across inboxes.",
      },
    ],
  },
];

export const solutionByIndustry: SolutionPage[] = [
  {
    slug: "vc",
    label: "Venture capital",
    description:
      "Purpose-built workflows for venture capital firms across fund formation, deals, and portfolio support.",
    chapters: [
      {
        title: "Streamline early-stage deal closings and SAFE conversions",
        body:
          "Venture deals move quickly with lightweight documentation. Perry supports fast closings and SAFE conversions with checklists, version control, and condition tracking sized for early-stage velocity.",
      },
      {
        title: "Manage fund docs across multiple vintage vehicles",
        body:
          "VC firms often run parallel funds and SPVs. Perry keeps entity structures, LPAs, and side letters organized across vehicles — so terms stay consistent and teams do not rebuild context for each fund.",
      },
      {
        title: "Support portfolio companies with investor-ready portals",
        body:
          "Portfolio support scales when companies have clear channels for consents, reporting, and document requests. Perry gives VC legal teams portals they can extend to portfolio companies without custom tooling.",
      },
    ],
  },
  {
    slug: "pe",
    label: "Private equity",
    description:
      "Legal infrastructure for private equity firms managing complex transactions and portfolio oversight.",
    chapters: [
      {
        title: "Coordinate LBO closings with granular condition tracking",
        body:
          "LBO closings involve dozens of conditions across legal, finance, and advisors. Perry provides granular condition tracking with ownership and status — so nothing blocks signing without visibility.",
      },
      {
        title: "Monitor portfolio covenants and board governance",
        body:
          "PE portfolio oversight spans credit agreements, board actions, and recurring compliance. Perry connects covenant monitoring to governance workflows, giving legal teams early warning and structured response paths.",
      },
      {
        title: "Prepare LP reporting and regulatory filings at scale",
        body:
          "Large PE platforms produce reporting at volume. Perry reuses portfolio data across LP reports and regulatory filings — reducing duplication and keeping legal, finance, and IR aligned on the numbers.",
      },
    ],
  },
];

export const allSolutionPages = [...solutionByRole, ...solutionByIndustry];

export function getSolutionPage(slug: string) {
  return allSolutionPages.find((page) => page.slug === slug);
}
