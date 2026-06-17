export type IntelligenceFlowStage = {
  id: string;
  tabLabel: string;
  documents: string[];
  outputs: string[];
  collaboration: string[];
};

export const intelligenceFlowStages: IntelligenceFlowStage[] = [
  {
    id: "formation",
    tabLabel: "Fund Formation",
    documents: ["LPA", "Side Letters"],
    outputs: ["Investor Rights", "Obligations"],
    collaboration: ["Legal Team", "Fund Ops", "Counsel"],
  },
  {
    id: "deployment",
    tabLabel: "Capital Deployment",
    documents: ["SPA", "DD Documents"],
    outputs: ["Review Issues", "Closing Actions"],
    collaboration: ["Deal Team", "Legal", "Counsel"],
  },
  {
    id: "management",
    tabLabel: "Fund/Portfolio Management",
    documents: ["Board Consents", "Covenant Schedules"],
    outputs: ["Compliance Alerts", "Reporting Obligations"],
    collaboration: ["Legal Team", "Portfolio Ops", "Counsel"],
  },
  {
    id: "exit",
    tabLabel: "Exit",
    documents: ["Transaction Docs", "Distribution Notices"],
    outputs: ["Closing Checklist", "LP Distributions"],
    collaboration: ["Legal Team", "Finance", "Counsel"],
  },
];

export const intelligenceLayerSteps = ["Extract", "Structure", "Analyse"] as const;
