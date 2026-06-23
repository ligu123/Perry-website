"use client";

import Image from "@/components/asset-image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  getBlendedPanelTint,
  getPrimaryTile,
  panelTintOverlay,
  platformInactiveLayerHeight,
  platformInactiveLayerImageSrc,
  platformInactiveLayerWidth,
  platformLayers,
  platformLayersByElevation,
  type PlatformLayer,
} from "@/lib/platform-architecture";
import { primaryProductLifecycleHref } from "@/lib/product-navigation";

/* -------------------------------------------------------------------------- */
/*  Tunable constants                                                         */
/* -------------------------------------------------------------------------- */

/** Matches site-header `h-16` — sticky pins below the nav bar. */
const SITE_HEADER_OFFSET = "4rem";
const SITE_HEADER_OFFSET_PX = 64;
/** Document scroll budget per layer transition (vh). Bigger = longer slide. */
const PER_LAYER_VH = 95;
/** Scroll dead zone at runway start/end where floatIndex stays pinned (px). */
const SCROLL_BUFFER_PX = 400;
/** Gap from active bottom to first inactive slab (× inactive height). */
const ACTIVE_INACTIVE_GAP = -0.7;
/** Vertical step between inactive slabs (× inactive height). */
const INACTIVE_STEP = 0.16;
/** Push the whole stack down in the center column (× container width). 0 = rely on grid centering. */
const STACK_OFFSET_Y = 0;
/** Upward travel while a layer exits (fraction of its own height). */
const EXIT_TRAVEL = 0.55;
/** Exit fade rate — higher = transparent sooner within the same scroll span (1 = linear). */
const EXIT_FADE_SPEED = 2;
/** Sidebar nav vertical drift per index away from the scroll position (px). */
const NAV_ITEM_SLIDE_PX = 20;
/** Gap between title block and three-column grid (Tailwind margin-bottom classes). */
const HEADER_GRID_GAP = "mb-16";
/** Max width of the center layer stack — smaller = shorter stack height. */
const LAYER_STACK_MAX_WIDTH = "max-w-2xl";
/** Vertical padding on the three-column glass panel grid. */
const GRID_SECTION_PY = "py-8";
/** Opacity of inactive layer slabs at rest (0–1). */
const INACTIVE_LAYER_OPACITY = 0.6;
/** Glass panel layer-tint overlay strength (0–1). */
const PANEL_TINT_ALPHA = 0.09;
/** Fraction of bottom slack applied as downward offset at the final layer (0–1). */
const END_STACK_CENTER_BIAS = 0.5;

const LAYER_COUNT = platformLayersByElevation.length;

const INACTIVE_ASPECT =
  platformInactiveLayerHeight / platformInactiveLayerWidth;

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getLayerAspectRatio(layer: PlatformLayer) {
  const width = layer.imageWidth ?? 1024;
  const height = layer.imageHeight ?? 480;
  return height / width;
}

/** Total document scroll while the runway is pinned. */
function getRunwayScrollable(runway: HTMLElement) {
  return runway.offsetHeight - window.innerHeight + SITE_HEADER_OFFSET_PX;
}

/** Map 0..1 animation progress to raw scrolled px (includes start/end buffers). */
function animationProgressToScrolled(progress: number, scrollable: number) {
  const activeScrollable = scrollable - 2 * SCROLL_BUFFER_PX;
  if (activeScrollable <= 0) {
    return clamp(progress, 0, 1) * scrollable;
  }
  return SCROLL_BUFFER_PX + clamp(progress, 0, 1) * activeScrollable;
}

/** Map raw scrolled px to 0..1 animation progress (buffers hold at 0 and 1). */
function scrolledToAnimationProgress(scrolled: number, scrollable: number) {
  const activeScrollable = scrollable - 2 * SCROLL_BUFFER_PX;
  if (activeScrollable <= 0) {
    return clamp(scrolled / Math.max(scrollable, 1), 0, 1);
  }
  if (scrolled <= SCROLL_BUFFER_PX) return 0;
  if (scrolled >= scrollable - SCROLL_BUFFER_PX) return 1;
  return (scrolled - SCROLL_BUFFER_PX) / activeScrollable;
}

/** Document scroll position that lands the runway at a given 0..1 progress. */
function getScrollYForProgress(runway: HTMLElement, progress: number) {
  const scrollable = getRunwayScrollable(runway);
  const scrolled = animationProgressToScrolled(progress, scrollable);
  return runway.offsetTop - SITE_HEADER_OFFSET_PX + scrolled;
}

/** Current 0..1 progress of the runway through its pinned travel. */
function getRunwayProgress(runway: HTMLElement) {
  const scrollable = getRunwayScrollable(runway);
  if (scrollable <= 0) return 0;
  const rect = runway.getBoundingClientRect();
  const scrolled = clamp(SITE_HEADER_OFFSET_PX - rect.top, 0, scrollable);
  return scrolledToAnimationProgress(scrolled, scrollable);
}

type SlotVisualState = {
  contentOpacity: number;
  baseOpacity: number;
  hidden: boolean;
};

function getContentAspect(layer: PlatformLayer) {
  return Math.max(getLayerAspectRatio(layer), INACTIVE_ASPECT);
}

/** Unified active-layer aspect — tallest layer slot for consistent carousel height. */
function getMaxContentAspect() {
  return Math.max(
    INACTIVE_ASPECT,
    ...platformLayersByElevation.map((layer) => getContentAspect(layer)),
  );
}

/** Slot height — inactive slab at rest; interpolates to full content while rising. */
function getSlotAspect(layer: PlatformLayer, rel: number) {
  const fullAspect = getContentAspect(layer);
  if (rel >= 1) return INACTIVE_ASPECT;
  if (rel <= 0) return fullAspect;
  const t = easeInOutCubic(1 - rel);
  return INACTIVE_ASPECT + (fullAspect - INACTIVE_ASPECT) * t;
}

/**
 * Layer whose active slot defines inactive-stack spacing for the current scroll
 * segment. Locked to floor(floatIndex) so firstInactiveY stays stable while
 * the next layer rises from its inactive anchor.
 */
function getAnchorLayer(floatIndex: number) {
  const clamped = clamp(floatIndex, 0, LAYER_COUNT - 1);
  const anchorIndex = Math.min(Math.floor(clamped), LAYER_COUNT - 1);
  return platformLayersByElevation[anchorIndex];
}

function getFirstInactiveY(floatIndex: number, width: number) {
  const anchorLayer = getAnchorLayer(floatIndex);
  const activeBottom = width * getContentAspect(anchorLayer);
  const inactiveHeight = width * INACTIVE_ASPECT;
  return activeBottom + ACTIVE_INACTIVE_GAP * inactiveHeight;
}

/** Vertical offset in px — spacing anchored to inactive positions for the segment. */
function getStackOffsetY(
  rel: number,
  layer: PlatformLayer,
  floatIndex: number,
  width: number,
) {
  const inactiveHeight = width * INACTIVE_ASPECT;
  const firstInactiveY = getFirstInactiveY(floatIndex, width);

  if (rel < 0) {
    const exitHeight = width * getContentAspect(layer);
    return rel * EXIT_TRAVEL * exitHeight;
  }

  if (rel <= 1) return easeInOutCubic(rel) * firstInactiveY;

  return firstInactiveY + (rel - 1) * INACTIVE_STEP * inactiveHeight;
}

/** Opacity for content vs inactive base from scroll position in the stack. */
function getSlotVisualState(rel: number, animate: boolean): SlotVisualState {
  if (!animate) {
    const active = Math.abs(rel) < 0.01;
    return {
      contentOpacity: active ? 1 : 0,
      baseOpacity: active ? 0 : 1,
      hidden: rel <= -1,
    };
  }

  if (rel <= -1) {
    return { contentOpacity: 0, baseOpacity: 0, hidden: true };
  }

  // Exiting — full layer slides up and fades (does not morph into inactive).
  if (rel < 0) {
    return {
      contentOpacity: Math.max(0, 1 + rel * EXIT_FADE_SPEED),
      baseOpacity: 0,
      hidden: false,
    };
  }

  // Active peak.
  if (Math.abs(rel) < 0.0001) {
    return { contentOpacity: 1, baseOpacity: 0, hidden: false };
  }

  // Rising from inactive stack into active slot — content crossfades onto base.
  if (rel <= 1) {
    const t = easeInOutCubic(1 - rel);
    return {
      contentOpacity: t,
      baseOpacity: 1 - t,
      hidden: false,
    };
  }

  // Deep inactive — thin slab only.
  return { contentOpacity: 0, baseOpacity: 1, hidden: false };
}

/** Layers still on screen (exiting layer kept until rel <= -1). */
function getVisibleLayers(floatIndex: number, discreteOnly = false) {
  const clamped = clamp(floatIndex, 0, LAYER_COUNT - 1);
  if (discreteOnly) {
    const layer = platformLayersByElevation[clamped];
    return [{ layer, layerIndex: clamped, rel: 0 }];
  }
  return platformLayersByElevation
    .map((layer, layerIndex) => ({
      layer,
      layerIndex,
      rel: layerIndex - clamped,
    }))
    .filter(({ rel }) => rel > -1);
}

/** Container height to fit the current stack without clipping. */
function getStackHeight(width: number, floatIndex: number) {
  const clamped = clamp(floatIndex, 0, LAYER_COUNT - 1);
  const bottomIndex = LAYER_COUNT - 1;
  const bottomRel = bottomIndex - clamped;
  if (bottomRel <= -1) {
    return width * getContentAspect(getAnchorLayer(clamped));
  }

  const bottomLayer = platformLayersByElevation[bottomIndex];
  const bottomOffset = getStackOffsetY(bottomRel, bottomLayer, clamped, width);
  const bottomHeight = width * getSlotAspect(bottomLayer, bottomRel);
  return bottomOffset + bottomHeight;
}

/** Tallest stack (floatIndex 0 — active + full inactive deck). Fixed middle column height. */
function getMaxStackHeight(width: number) {
  return getStackHeight(width, 0);
}

/** Push the stack down as inactive layers disappear — keeps the last layer centered. */
function getStackVerticalOffset(floatIndex: number, width: number) {
  if (LAYER_COUNT <= 1 || width <= 0) return 0;

  const maxHeight = getMaxStackHeight(width);
  const currentHeight = getStackHeight(width, floatIndex);
  const slack = Math.max(0, maxHeight - currentHeight);
  const progress = clamp(floatIndex / (LAYER_COUNT - 1), 0, 1);

  return slack * easeInOutCubic(progress) * END_STACK_CENTER_BIAS;
}

function getMaxStackAspect() {
  return getStackHeight(1, 0);
}

type LayerSlotProps = {
  layer: PlatformLayer;
  layerIndex: number;
  rel: number;
  floatIndex: number;
  width: number;
  animate: boolean;
  uniformAspect?: number;
};

function LayerSlot({
  layer,
  layerIndex,
  rel,
  floatIndex,
  width,
  animate,
  uniformAspect,
}: LayerSlotProps) {
  const { contentOpacity, baseOpacity, hidden } = getSlotVisualState(rel, animate);
  const offsetY = width > 0 ? getStackOffsetY(rel, layer, floatIndex, width) : 0;
  const slotAspect = uniformAspect ?? getSlotAspect(layer, rel);

  if (hidden) return null;

  return (
    <div
      className="absolute top-0 left-0 w-full overflow-visible"
      style={{
        paddingBottom: `${slotAspect * 100}%`,
        transform: `translateY(${offsetY}px)`,
        zIndex: LAYER_COUNT - layerIndex,
      }}
    >
      <Image
        src={platformInactiveLayerImageSrc}
        alt=""
        width={platformInactiveLayerWidth}
        height={platformInactiveLayerHeight}
        unoptimized
        draggable={false}
        aria-hidden
        className="absolute bottom-0 left-0 h-auto w-full select-none"
        style={{ opacity: baseOpacity * INACTIVE_LAYER_OPACITY }}
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{ opacity: contentOpacity }}
      >
        <Image
          src={layer.imageSrc}
          alt=""
          width={layer.imageWidth ?? 1024}
          height={layer.imageHeight ?? 480}
          unoptimized
          draggable={false}
          aria-hidden
          className="h-full w-full select-none object-contain"
        />
      </div>
    </div>
  );
}

type UnifiedLayerStackProps = {
  floatIndex: number;
  animate: boolean;
  discreteOnly?: boolean;
};

/**
 * Continuous sliding deck — scroll drives every layer's vertical position via
 * `rel = layerIndex - floatIndex`. Active layer at rel≈0, inactive stack below,
 * exiting layer slides upward at rel<0 (same motion as the reference sequence).
 */
function UnifiedLayerStack({
  floatIndex,
  animate,
  discreteOnly = false,
}: UnifiedLayerStackProps) {
  const stackRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  const clamped = clamp(floatIndex, 0, LAYER_COUNT - 1);
  const visibleLayers = getVisibleLayers(clamped, discreteOnly);

  useLayoutEffect(() => {
    const el = stackRef.current;
    if (!el) return;

    const update = () => {
      if (el.offsetWidth > 0) setWidth(el.offsetWidth);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [clamped]);

  if (visibleLayers.length === 0) return null;

  const uniformAspect = discreteOnly ? getMaxContentAspect() : undefined;

  const fixedStackHeight =
    width > 0
      ? discreteOnly
        ? width * getMaxContentAspect()
        : getMaxStackHeight(width)
      : undefined;
  const centeringOffset =
    width > 0 && !discreteOnly ? getStackVerticalOffset(floatIndex, width) : 0;

  return (
    <div
      ref={stackRef}
      className="relative w-full overflow-visible"
      style={{
        height: fixedStackHeight,
        minHeight: fixedStackHeight,
        paddingBottom: width <= 0 ? `${getMaxStackAspect() * 100}%` : undefined,
        transform:
          width > 0
            ? `translateY(${STACK_OFFSET_Y * width + centeringOffset}px)`
            : undefined,
      }}
    >
      {visibleLayers.map(({ layer, layerIndex, rel }) => (
        <LayerSlot
          key={layer.id}
          layer={layer}
          layerIndex={layerIndex}
          rel={rel}
          floatIndex={clamped}
          width={width}
          animate={animate}
          uniformAspect={uniformAspect}
        />
      ))}
    </div>
  );
}

type LayerStackProps = {
  floatIndex: number;
  animate: boolean;
  discreteOnly?: boolean;
};

function LayerStack({ floatIndex, animate, discreteOnly = false }: LayerStackProps) {
  return (
    <div className="relative flex w-full flex-col items-center justify-center pb-2">
      <div
        className={cn(
          "relative flex w-full flex-col items-center",
          LAYER_STACK_MAX_WIDTH,
        )}
      >
        <UnifiedLayerStack
          floatIndex={floatIndex}
          animate={animate}
          discreteOnly={discreteOnly}
        />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-24 w-64 -translate-x-1/2 rounded-full bg-[#c8b8f0]/10 blur-3xl"
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Sidebar — nav items drift + crossfade in sync with floatIndex             */
/* -------------------------------------------------------------------------- */

type SidebarProps = {
  floatIndex: number;
  onSelectLayer: (layerId: string) => void;
};

function Sidebar({ floatIndex, onSelectLayer }: SidebarProps) {
  const clamped = clamp(floatIndex, 0, LAYER_COUNT - 1);

  return (
    <nav aria-label="Platform layers" className="flex flex-col gap-0">
      {platformLayersByElevation.map((layer, index) => {
        const rel = index - clamped;
        const translateY = rel * NAV_ITEM_SLIDE_PX;
        const dist = Math.abs(rel);
        const emphasis = dist >= 1 ? 0 : 1 - easeInOutCubic(dist);

        const lineWidth = 12 + emphasis * 12;
        const opacity = 0.5 + emphasis * 0.5;

        return (
          <button
            key={layer.id}
            type="button"
            onClick={() => onSelectLayer(layer.id)}
            className="group text-left"
            style={{ transform: `translateY(${translateY}px)` }}
          >
            <div className="flex items-start gap-3 py-0">
              <div
                className="mt-2 h-px shrink-0 bg-white"
                style={{ width: lineWidth, opacity }}
              />
              <div className="min-w-0">
                <p className="text-sm font-medium text-white" style={{ opacity }}>
                  {layer.label}
                </p>
                <p
                  className="overflow-hidden text-sm leading-relaxed text-white/45"
                  style={{
                    opacity: emphasis * 0.9,
                    maxHeight: `${emphasis * 88}px`,
                    marginTop: `${emphasis * 4}px`,
                  }}
                >
                  {layer.sidebarDescription}
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </nav>
  );
}

/* -------------------------------------------------------------------------- */
/*  Detail panel                                                              */
/* -------------------------------------------------------------------------- */

type DetailPanelProps = {
  layer: PlatformLayer;
};

function DetailPanel({ layer }: DetailPanelProps) {
  const tile = getPrimaryTile(layer);
  const Icon = tile.icon;
  const isLayerPrimary = tile.id === layer.id;
  const href = tile.href ?? primaryProductLifecycleHref;

  return (
    <div className="flex flex-col">
      <div className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/5">
        <Icon className="size-4 text-white/80" strokeWidth={1.5} />
      </div>
      <p className="mt-4 text-[11px] font-medium tracking-wide text-white/40 uppercase">
        {layer.label}
      </p>
      <h3 className="mt-1 text-base font-medium text-white">
        {isLayerPrimary ? layer.label : tile.label}
      </h3>
      <p className="mt-1.5 text-sm leading-snug text-white/50">
        {isLayerPrimary ? layer.sidebarDescription : tile.description}
      </p>
      <Button
        variant="outline"
        size="sm"
        className="mt-4 w-fit border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
        render={<Link href={href} />}
      >
        Learn more
      </Button>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Header                                                                    */
/* -------------------------------------------------------------------------- */

function PlatformArchitectureHeader({ className }: { className?: string }) {
  return (
    <div className={cn("mx-auto max-w-2xl shrink-0 text-center", className)}>
      <p className="flex items-center justify-center gap-2 text-sm font-medium tracking-wide text-white/60">
        <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-emerald-500" />
         architecture
      </p>
      <h2
        id="platform-architecture-heading"
        className="mt-1 font-source-serif text-3xl font-medium tracking-tight text-balance text-white sm:text-4xl md:text-5xl"
      >
        A deep look into the legal OS
      </h2>
      <p className="mt-3 text-base leading-relaxed text-white/50 text-pretty sm:text-base">
        Private capital legal work sits at the center of every fund lifecycle event.
        Perry was built from first principles for the private capital legal needs of managing
        formation, deals, portfolio, and exit.
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Explorer                                                                  */
/* -------------------------------------------------------------------------- */

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
  const runwayRef = useRef<HTMLDivElement>(null);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [scrollFloatIndex, setScrollFloatIndex] = useState(0);
  const [discreteIndex, setDiscreteIndex] = useState(0);

  const useScrollDrive = isLargeScreen && !prefersReducedMotion;
  const floatIndex = useScrollDrive ? scrollFloatIndex : discreteIndex;

  const activeIndex = clamp(Math.round(floatIndex), 0, LAYER_COUNT - 1);
  const activeLayer = platformLayersByElevation[activeIndex];

  const panelTint = useMemo(
    () => panelTintOverlay(getBlendedPanelTint(floatIndex), PANEL_TINT_ALPHA),
    [floatIndex],
  );

  const goToPreviousLayer = useCallback(() => {
    setDiscreteIndex((current) =>
      current === 0 ? LAYER_COUNT - 1 : current - 1,
    );
  }, []);

  const goToNextLayer = useCallback(() => {
    setDiscreteIndex((current) =>
      current === LAYER_COUNT - 1 ? 0 : current + 1,
    );
  }, []);

  const scrollToLayer = useCallback(
    (layerId: string) => {
      const index = platformLayersByElevation.findIndex((l) => l.id === layerId);
      if (index < 0) return;

      if (!useScrollDrive) {
        setDiscreteIndex(index);
        return;
      }

      const runway = runwayRef.current;
      if (!runway) {
        setDiscreteIndex(index);
        return;
      }

      const progress = LAYER_COUNT <= 1 ? 0 : index / (LAYER_COUNT - 1);
      window.scrollTo({
        top: getScrollYForProgress(runway, progress),
        behavior: "smooth",
      });
    },
    [useScrollDrive],
  );

  useLayoutEffect(() => {
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const screenMq = window.matchMedia("(min-width: 1024px)");

    const update = () => {
      setPrefersReducedMotion(motionMq.matches);
      setIsLargeScreen(screenMq.matches);
    };

    update();
    motionMq.addEventListener("change", update);
    screenMq.addEventListener("change", update);

    return () => {
      motionMq.removeEventListener("change", update);
      screenMq.removeEventListener("change", update);
    };
  }, []);

  // Drive floatIndex from scroll progress while the section is in view.
  useEffect(() => {
    if (!useScrollDrive) return;

    const update = () => {
      const runway = runwayRef.current;
      const section = sectionRef.current;
      if (!runway || !section) return;

      const rect = section.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;

      const progress = getRunwayProgress(runway);
      setScrollFloatIndex(progress * (LAYER_COUNT - 1));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [useScrollDrive, sectionRef]);

  const explorerContent = (
    <div className="relative isolate mx-auto w-full max-w-8xl overflow-visible rounded-md border border-white/10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-md"
      >
        <Image
          src="/images/architecture/section-background.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 1280px) 100vw, 1280px"
        />
        <div className="absolute inset-0 bg-[#111113]/55" />
        <div
          className="absolute inset-0 transition-[background-color] duration-200 ease-in-out"
          style={{ backgroundColor: panelTint }}
        />
        <div className="absolute inset-0 backdrop-blur-md" />
        <div className="absolute inset-0 rounded-md ring-1 ring-inset ring-white/10" />
      </div>

      <div
        className={cn(
          "relative grid min-h-0 flex-1 items-start gap-6 px-6 lg:grid-cols-[minmax(0,180px)_1fr_minmax(0,200px)] lg:gap-6 lg:px-8 xl:gap-8 xl:px-10",
          GRID_SECTION_PY,
          className,
        )}
      >
        <div className="hidden self-center lg:block">
          <Sidebar floatIndex={floatIndex} onSelectLayer={scrollToLayer} />
        </div>

        <div className="flex w-full items-center justify-center self-center overflow-visible">
          <LayerStack
            floatIndex={floatIndex}
            animate={useScrollDrive}
            discreteOnly={!useScrollDrive}
          />
        </div>

        <div className="hidden self-center lg:block">
          <DetailPanel layer={activeLayer} />
        </div>

        <div className="border-t border-white/10 pt-6 lg:hidden">
          <DetailPanel layer={activeLayer} />
        </div>

        {!isLargeScreen && (
          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={goToPreviousLayer}
              aria-label="Previous layer"
              className="flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ChevronLeft className="size-5" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={goToNextLayer}
              aria-label="Next layer"
              className="flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ChevronRight className="size-5" strokeWidth={1.5} />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  if (!useScrollDrive) {
    return (
      <>
        {showHeader && <PlatformArchitectureHeader className={HEADER_GRID_GAP} />}
        {explorerContent}
      </>
    );
  }

  // Runway height = viewport + per-layer travel + start/end scroll buffers.
  const runwayHeight = `calc(100vh - ${SITE_HEADER_OFFSET} + ${
    PER_LAYER_VH * (LAYER_COUNT - 1)
  }vh + ${2 * SCROLL_BUFFER_PX}px)`;

  return (
    <div ref={runwayRef} className="relative" style={{ height: runwayHeight }}>
      <div
        className="sticky flex flex-col overflow-visible pt-8"
        style={{
          top: SITE_HEADER_OFFSET,
          height: `calc(100vh - ${SITE_HEADER_OFFSET})`,
          maxHeight: `calc(100vh - ${SITE_HEADER_OFFSET})`,
        }}
      >
        {showHeader && <PlatformArchitectureHeader className={HEADER_GRID_GAP} />}
        <div className="min-h-0 flex-1 overflow-visible">{explorerContent}</div>
      </div>
    </div>
  );
}
