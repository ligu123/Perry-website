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
      data-header-theme="dark"
      className={`bg-[#111113] px-6 pb-24 pt-16 text-white lg:pt-0 ${className ?? ""}`}
      aria-labelledby={showHeader ? "platform-architecture-heading" : undefined}
    >
      <div className="section-container">
        <PlatformArchitectureExplorer sectionRef={sectionRef} showHeader={showHeader} />
      </div>
    </section>
  );
}
