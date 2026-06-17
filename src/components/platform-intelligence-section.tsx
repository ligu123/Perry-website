"use client";

import { useEffect, useState, type ComponentType } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  intelligenceFlowStages,
  intelligenceLayerSteps,
} from "@/lib/platform-intelligence-flow";
import { cn } from "@/lib/utils";

type IllustrationProps = {
  className?: string;
};

function DocumentsIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 120 80"
      fill="none"
      aria-hidden
      className={cn("h-20 w-28 text-foreground/25", className)}
    >
      <path d="M20 58 L60 38 L100 58" stroke="currentColor" strokeWidth="0.75" />
      <path d="M20 50 L60 30 L100 50" stroke="currentColor" strokeWidth="0.75" />
      <path d="M20 42 L60 22 L100 42" stroke="currentColor" strokeWidth="0.75" />
      <path d="M60 22 L60 38" stroke="currentColor" strokeWidth="0.75" />
      <path d="M20 42 L20 58" stroke="currentColor" strokeWidth="0.75" />
      <path d="M100 42 L100 58" stroke="currentColor" strokeWidth="0.75" />
    </svg>
  );
}

function IntelligenceIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 120 80"
      fill="none"
      aria-hidden
      className={cn("h-20 w-28 text-foreground/25", className)}
    >
      <path d="M30 52 L50 42 L70 52 L50 62 Z" stroke="currentColor" strokeWidth="0.75" />
      <path d="M50 42 L50 28" stroke="currentColor" strokeWidth="0.75" />
      <path d="M30 52 L30 66 L50 76 L70 66 L70 52" stroke="currentColor" strokeWidth="0.75" />
      <path d="M50 62 L50 76" stroke="currentColor" strokeWidth="0.75" />
      <path d="M78 36 L92 44 L92 60 L78 68 L64 60 L64 44 Z" stroke="currentColor" strokeWidth="0.75" />
      <path d="M78 36 L78 20" stroke="currentColor" strokeWidth="0.75" />
    </svg>
  );
}

function OutputsIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 120 80"
      fill="none"
      aria-hidden
      className={cn("h-20 w-28 text-foreground/25", className)}
    >
      <path d="M28 68 L28 32" stroke="currentColor" strokeWidth="0.75" />
      <path d="M48 68 L48 24" stroke="currentColor" strokeWidth="0.75" />
      <path d="M68 68 L68 40" stroke="currentColor" strokeWidth="0.75" />
      <path d="M88 68 L88 18" stroke="currentColor" strokeWidth="0.75" />
      <path d="M22 68 L94 68" stroke="currentColor" strokeWidth="0.75" />
      <path d="M28 32 L48 24 L68 40 L88 18" stroke="currentColor" strokeWidth="0.75" />
    </svg>
  );
}

function CollaborationIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 120 80"
      fill="none"
      aria-hidden
      className={cn("h-20 w-28 text-foreground/25", className)}
    >
      <circle cx="40" cy="40" r="10" stroke="currentColor" strokeWidth="0.75" />
      <circle cx="80" cy="28" r="10" stroke="currentColor" strokeWidth="0.75" />
      <circle cx="80" cy="56" r="10" stroke="currentColor" strokeWidth="0.75" />
      <path d="M48 36 L72 32" stroke="currentColor" strokeWidth="0.75" />
      <path d="M48 44 L72 50" stroke="currentColor" strokeWidth="0.75" />
      <path d="M80 38 L80 46" stroke="currentColor" strokeWidth="0.75" />
    </svg>
  );
}

const pipelineColumns = [
  {
    fig: "FIG 01",
    label: "Documents & entities",
    Illustration: DocumentsIllustration,
    getItems: (stage: (typeof intelligenceFlowStages)[number]) => stage.documents,
  },
  {
    fig: "FIG 02",
    label: "Legal intelligence",
    Illustration: IntelligenceIllustration,
    getItems: () => intelligenceLayerSteps,
  },
  {
    fig: "FIG 03",
    label: "Actionable outputs",
    Illustration: OutputsIllustration,
    getItems: (stage: (typeof intelligenceFlowStages)[number]) => stage.outputs,
  },
  {
    fig: "FIG 04",
    label: "Collaboration",
    Illustration: CollaborationIllustration,
    getItems: (stage: (typeof intelligenceFlowStages)[number]) => stage.collaboration,
  },
] as const;

type PipelineColumnProps = {
  fig: string;
  label: string;
  items: readonly string[];
  Illustration: ComponentType<IllustrationProps>;
  animateKey?: string;
};

function PipelineColumn({
  fig,
  label,
  items,
  Illustration,
  animateKey,
}: PipelineColumnProps) {
  return (
    <div className="grid min-h-0 grid-rows-[auto_minmax(0,1fr)_auto_auto] px-6 py-8 lg:row-span-4 lg:grid-rows-subgrid sm:px-8">
      <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground/60 uppercase">
        {fig}
      </p>

      <div className="flex min-h-0 items-center justify-center">
        <Illustration />
      </div>

      <h4 className="text-base font-semibold tracking-tight text-foreground">{label}</h4>

      <ul
        key={animateKey}
        className={cn(
          "space-y-1.5",
          animateKey && "animate-in fade-in slide-in-from-bottom-1 duration-300",
        )}
      >
        {items.map((item) => (
          <li key={item} className="text-sm leading-relaxed text-muted-foreground">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function IntelligencePipeline({ stageId }: { stageId: string }) {
  const stage =
    intelligenceFlowStages.find((item) => item.id === stageId) ??
    intelligenceFlowStages[0];

  return (
    <div className="grid h-full grid-cols-1 grid-rows-4 divide-y divide-border/50 lg:grid-cols-4 lg:grid-rows-[auto_minmax(0,1fr)_auto_auto] lg:divide-x lg:divide-y-0">
      {pipelineColumns.map((column) => {
        const items = column.getItems(stage);
        const animates = column.fig !== "FIG 02";

        return (
          <PipelineColumn
            key={column.fig}
            fig={column.fig}
            label={column.label}
            items={items}
            Illustration={column.Illustration}
            animateKey={animates ? `${stageId}-${column.fig}` : undefined}
          />
        );
      })}
    </div>
  );
}

const TAB_AUTO_ADVANCE_MS = 8000;

export function PlatformIntelligenceSection() {
  const [activeTab, setActiveTab] = useState(intelligenceFlowStages[0].id);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const interval = window.setInterval(() => {
      setActiveTab((current) => {
        const currentIndex = intelligenceFlowStages.findIndex((stage) => stage.id === current);
        const nextIndex = (currentIndex + 1) % intelligenceFlowStages.length;
        return intelligenceFlowStages[nextIndex].id;
      });
    }, TAB_AUTO_ADVANCE_MS);

    return () => window.clearInterval(interval);
  }, [activeTab]);

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-source-serif text-3xl font-medium tracking-tight text-balance sm:text-4xl md:text-5xl">
            One platform. Every stage of the fund lifecycle.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
            Legal documents and entity data move through one intelligence layer and become
            actions, insights and collaboration.
          </p>
        </div>

        <div className="mt-12">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex h-[650px] flex-col gap-0 overflow-hidden border border-border bg-card shadow-sm"
          >
            <div className="flex h-16 shrink-0 items-stretch border-b border-border px-3">
              <TabsList className="flex h-full w-full items-stretch gap-3 bg-transparent p-0">
                {intelligenceFlowStages.map((stage) => (
                  <TabsTrigger
                    key={stage.id}
                    value={stage.id}
                    className={cn(
                      "relative flex h-full min-h-16 flex-1 items-center justify-center self-stretch overflow-hidden bg-transparent px-2 sm:px-3",
                      "data-active:bg-background data-active:text-foreground data-active:shadow-md",
                    )}
                  >
                    <span className="relative z-10 truncate">{stage.tabLabel}</span>
                    {activeTab === stage.id && (
                      <span
                        aria-hidden
                        className="absolute inset-x-2 bottom-0 h-0.5 bg-muted"
                      >
                        <span
                          key={activeTab}
                          className="block h-full bg-foreground animate-tab-progress motion-reduce:animate-none"
                          style={{ animationDuration: `${TAB_AUTO_ADVANCE_MS}ms` }}
                        />
                      </span>
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {intelligenceFlowStages.map((stage) => (
              <TabsContent
                key={stage.id}
                value={stage.id}
                className="min-h-0 flex-1 bg-background p-0"
              >
                <IntelligencePipeline stageId={stage.id} />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
