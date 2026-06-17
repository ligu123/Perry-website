"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  getPrimaryTile,
  platformLayers,
  platformLayersByElevation,
  type PlatformLayer,
  type PlatformTile,
} from "@/lib/platform-architecture";
import { primaryProductLifecycleHref } from "@/lib/product-navigation";

/** Matches site-header `h-16` — sticky pins below the nav bar. */
const SITE_HEADER_OFFSET = "4rem";
const SITE_HEADER_OFFSET_PX = 64;
/** Extra document scroll while the pinned block stays fixed (layer transitions). */
const SCROLL_HIJACK_DISTANCE = "200vh";
/** Runway height = available viewport (below header) + hijack distance. */
const SCROLL_RUNWAY_HEIGHT = `calc(100vh - ${SITE_HEADER_OFFSET} + ${SCROLL_HIJACK_DISTANCE})`;
/** Negative overlap between stacked layer images (fraction of container width). */
const LAYER_OVERLAP_RATIO = 0.62;

function getRunwayScrollProgress(runway: HTMLElement) {
  const viewportHeight = window.innerHeight;
  const scrollable = runway.offsetHeight - viewportHeight + SITE_HEADER_OFFSET_PX;
  if (scrollable <= 0) return 0;

  const rect = runway.getBoundingClientRect();
  const scrolled = Math.min(
    Math.max(SITE_HEADER_OFFSET_PX - rect.top, 0),
    scrollable,
  );
  return scrolled / scrollable;
}

function getScrollYForRunwayProgress(runway: HTMLElement, progress: number) {
  const scrollable = runway.offsetHeight - window.innerHeight + SITE_HEADER_OFFSET_PX;
  return runway.offsetTop - SITE_HEADER_OFFSET_PX + progress * scrollable;
}

type LayerImageProps = {
  layer: PlatformLayer;
  isActive: boolean;
  opacity: number;
  scale: number;
  onSelect: () => void;
};

function LayerImage({ layer, isActive, opacity, scale, onSelect }: LayerImageProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={layer.label}
      aria-pressed={isActive}
      className="group/layer relative block w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      style={{
        opacity,
        transform: `scale(${scale})`,
        transition: "opacity 0.45s ease, transform 0.45s ease",
      }}
    >
      <Image
        src={layer.imageSrc}
        alt=""
        width={560}
        height={280}
        draggable={false}
        className={cn(
          "h-auto w-full select-none",
          isActive && "drop-shadow-[0_12px_40px_rgba(200,184,240,0.15)]",
        )}
      />
    </button>
  );
}

type LayerStackProps = {
  activeLayerId: string;
  scrollFloatIndex: number;
  onSelectLayer: (layerId: string) => void;
};

function LayerStack({ activeLayerId, scrollFloatIndex, onSelectLayer }: LayerStackProps) {
  const sortedLayers = useMemo(
    () => [...platformLayers].sort((a, b) => a.elevation - b.elevation),
    [],
  );

  const layerIndexById = useMemo(() => {
    const map = new Map<string, number>();
    platformLayersByElevation.forEach((layer, index) => {
      map.set(layer.id, index);
    });
    return map;
  }, []);

  return (
    <div className="relative flex w-full min-h-[360px] flex-col items-center justify-center pb-4 sm:min-h-[400px]">
      <div className="flex w-full max-w-md flex-col items-center sm:max-w-lg">
        {sortedLayers.map((layer, stackIndex) => {
          const sidebarIndex = layerIndexById.get(layer.id) ?? 0;
          const distance = Math.max(0, sidebarIndex - scrollFloatIndex);
          const isPassedLayer = sidebarIndex < scrollFloatIndex;
          const isActiveLayer = layer.id === activeLayerId;
          const opacity = isPassedLayer ? 0 : Math.max(0.6, 1 - distance * 0.05);
          const scale = Math.max(0.94, 1 - distance * 0.02);

          return (
            <div
              key={layer.id}
              className="relative w-full"
              style={{
                marginTop: stackIndex === 0 ? 0 : `-${LAYER_OVERLAP_RATIO * 100}%`,
                zIndex: isActiveLayer ? 20 : stackIndex + 1,
                transition: "z-index 0s",
              }}
            >
              <LayerImage
                layer={layer}
                isActive={isActiveLayer}
                opacity={opacity}
                scale={scale}
                onSelect={() => onSelectLayer(layer.id)}
              />
            </div>
          );
        })}
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-24 w-64 -translate-x-1/2 rounded-full bg-[#c8b8f0]/10 blur-3xl"
      />
    </div>
  );
}

type SidebarProps = {
  activeLayerId: string;
  onSelectLayer: (layerId: string) => void;
};

function Sidebar({ activeLayerId, onSelectLayer }: SidebarProps) {
  return (
    <nav aria-label="Platform layers" className="flex flex-col gap-1">
      {platformLayersByElevation.map((layer) => {
        const isActive = layer.id === activeLayerId;
        return (
          <button
            key={layer.id}
            type="button"
            onClick={() => onSelectLayer(layer.id)}
            className="group text-left"
          >
            <div className="flex items-start gap-3 py-2.5">
              <div
                className={cn(
                  "mt-2 h-px shrink-0 transition-all duration-300",
                  isActive
                    ? "w-6 bg-white"
                    : "w-3 bg-white/30 group-hover:w-5 group-hover:bg-white/50",
                )}
              />
              <div className="min-w-0">
                <p
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isActive ? "text-white" : "text-white/50 group-hover:text-white/80",
                  )}
                >
                  {layer.label}
                </p>
                {isActive && (
                  <p className="mt-1.5 text-sm leading-relaxed text-white/45">
                    {layer.sidebarDescription}
                  </p>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </nav>
  );
}

type DetailPanelProps = {
  layer: PlatformLayer;
  tile: PlatformTile;
};

function DetailPanel({ layer, tile }: DetailPanelProps) {
  const Icon = tile.icon;
  const isLayerPrimary = tile.id === layer.id;

  return (
    <div className="flex flex-col">
      <div className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/5">
        <Icon className="size-4 text-white/80" strokeWidth={1.5} />
      </div>
      <p className="mt-5 text-[11px] font-medium tracking-wide text-white/40 uppercase">
        {layer.label}
      </p>
      <h3 className="mt-1 text-lg font-medium text-white">
        {isLayerPrimary ? layer.label : tile.label}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-white/50">
        {isLayerPrimary ? layer.sidebarDescription : tile.description}
      </p>
      {tile.href ? (
        <Button
          variant="outline"
          size="sm"
          className="mt-6 w-fit border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
          render={<Link href={tile.href} />}
        >
          Learn more
        </Button>
      ) : (
        <Button
          variant="outline"
          size="sm"
          className="mt-6 w-fit border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
          render={<Link href={primaryProductLifecycleHref} />}
        >
          Learn more
        </Button>
      )}
    </div>
  );
}

type PlatformArchitectureHeaderProps = {
  className?: string;
};

function PlatformArchitectureHeader({ className }: PlatformArchitectureHeaderProps) {
  return (
    <div className={cn("mx-auto max-w-2xl shrink-0 text-center", className)}>
      <h2
        id="platform-architecture-heading"
        className="font-source-serif text-3xl font-medium tracking-tight text-balance text-white sm:text-4xl md:text-5xl"
      >
        The Perry Platform
      </h2>
      <p className="mt-5 text-base leading-relaxed text-white/50 text-pretty sm:text-lg">
        Private capital legal work sits at the center of every fund lifecycle event.
        Perry was built from first principles for in-house legal teams managing
        formation, deals, portfolio, and exit.
      </p>
    </div>
  );
}

type PlatformArchitectureExplorerProps = {
  sectionRef: RefObject<HTMLElement | null>;
  showHeader?: boolean;
  className?: string;
};

export function PlatformArchitectureExplorer({
  sectionRef,
  showHeader = true,
  className,
}: PlatformArchitectureExplorerProps) {
  const scrollRunwayRef = useRef<HTMLDivElement>(null);
  const [activeLayerId, setActiveLayerId] = useState(platformLayersByElevation[0].id);
  const [scrollFloatIndex, setScrollFloatIndex] = useState(0);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const layerCount = platformLayersByElevation.length;

  const activeLayer = useMemo(
    () => platformLayers.find((layer) => layer.id === activeLayerId) ?? platformLayersByElevation[0],
    [activeLayerId],
  );

  const activeTile = useMemo(() => getPrimaryTile(activeLayer), [activeLayer]);

  const scrollToLayer = useCallback(
    (layerId: string) => {
      const runway = scrollRunwayRef.current;
      if (!runway || !scrollEnabled) return;

      const index = platformLayersByElevation.findIndex((layer) => layer.id === layerId);
      if (index < 0) return;

      const progress = layerCount <= 1 ? 0 : index / (layerCount - 1);
      const targetTop = getScrollYForRunwayProgress(runway, progress);

      window.scrollTo({ top: targetTop, behavior: "smooth" });
    },
    [layerCount, scrollEnabled],
  );

  const handleSelectLayer = useCallback(
    (layerId: string) => {
      setActiveLayerId(layerId);
      const index = platformLayersByElevation.findIndex((layer) => layer.id === layerId);
      if (index >= 0) setScrollFloatIndex(index);
      scrollToLayer(layerId);
    },
    [scrollToLayer],
  );

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setScrollEnabled(false);
      return;
    }
    setScrollEnabled(true);
  }, []);

  useEffect(() => {
    if (!scrollEnabled) return;

    const updateFromScroll = () => {
      const runway = scrollRunwayRef.current;
      const section = sectionRef.current;
      if (!runway || !section) return;

      // Only drive layers once the section has entered the viewport.
      const sectionRect = section.getBoundingClientRect();
      if (sectionRect.bottom <= 0 || sectionRect.top >= window.innerHeight) return;

      const progress = getRunwayScrollProgress(runway);
      const floatIndex = progress * Math.max(layerCount - 1, 0);
      const index = Math.min(layerCount - 1, Math.round(floatIndex));

      setScrollFloatIndex(floatIndex);
      setActiveLayerId(platformLayersByElevation[index].id);
    };

    updateFromScroll();
    window.addEventListener("scroll", updateFromScroll, { passive: true });
    window.addEventListener("resize", updateFromScroll);

    return () => {
      window.removeEventListener("scroll", updateFromScroll);
      window.removeEventListener("resize", updateFromScroll);
    };
  }, [layerCount, scrollEnabled, sectionRef]);

  const explorerContent = (
    <div
      className={cn(
        "grid flex-1 items-start gap-10 lg:grid-cols-[minmax(0,220px)_1fr_minmax(0,240px)] lg:gap-8 xl:gap-12",
        className,
      )}
    >
      <Sidebar activeLayerId={activeLayerId} onSelectLayer={handleSelectLayer} />

      <div className="flex w-full justify-start items-start overflow-visible">
        <LayerStack
          activeLayerId={activeLayerId}
          scrollFloatIndex={scrollFloatIndex}
          onSelectLayer={handleSelectLayer}
        />
      </div>

      <div className="hidden lg:block">
        <DetailPanel layer={activeLayer} tile={activeTile} />
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 lg:hidden">
        <DetailPanel layer={activeLayer} tile={activeTile} />
      </div>
    </div>
  );

  if (!scrollEnabled) {
    return (
      <>
        {showHeader && <PlatformArchitectureHeader className="mb-16" />}
        {explorerContent}
      </>
    );
  }

  return (
    <div ref={scrollRunwayRef} className="relative" style={{ height: SCROLL_RUNWAY_HEIGHT }}>
      <div
        className="sticky flex flex-col overflow-hidden pt-24"
        style={{
          top: SITE_HEADER_OFFSET,
          height: `calc(100vh - ${SITE_HEADER_OFFSET})`,
          maxHeight: `calc(100vh - ${SITE_HEADER_OFFSET})`,
        }}
      >
        {showHeader && <PlatformArchitectureHeader className="mb-12 sm:mb-16" />}
        <div className="min-h-0 flex-1 overflow-show">{explorerContent}</div>
      </div>
    </div>
  );
}
