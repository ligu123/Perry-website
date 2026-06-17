"use client";

import { useRef } from "react";

import { PlatformArchitectureExplorer } from "@/components/platform-architecture-explorer";

type PlatformArchitectureSectionProps = {
  showHeader?: boolean;
  className?: string;
};

export function PlatformArchitectureSection({
  showHeader = true,
  className,
}: PlatformArchitectureSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="platform"
      ref={sectionRef}
      className={`bg-[#111113] px-6 pb-24 pt-0 text-white ${className ?? ""}`}
      aria-labelledby={showHeader ? "platform-architecture-heading" : undefined}
    >
      <div className="mx-auto max-w-7xl">
        <PlatformArchitectureExplorer sectionRef={sectionRef} showHeader={showHeader} />
      </div>
    </section>
  );
}
