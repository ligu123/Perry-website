import type { LucideIcon } from "lucide-react";
import {
  Building2,
  GitBranch,
  Handshake,
  Scale,
  Shield,
} from "lucide-react";

export type TileVariant = "purple" | "mint" | "neutral";

export type PlatformTile = {
  id: string;
  label: string;
  description: string;
  href?: string;
  icon: LucideIcon;
  variant: TileVariant;
  row: number;
  col: number;
};

export type PlatformLayer = {
  id: string;
  label: string;
  sidebarDescription: string;
  placeholderLabel: string;
  /** Isometric layer image — 3D perspective is baked into the asset */
  imageSrc: string;
  imageWidth?: number;
  imageHeight?: number;
  /** Vertical position in the stack — higher values sit further up */
  elevation: number;
  /** When true, render as a dense foundation slab instead of a tile grid */
  isFoundation?: boolean;
  /** Accent color for glass panel tint — matches the layer isometric palette */
  panelTint: string;
  gridRows: number;
  gridCols: number;
  tiles: PlatformTile[];
};

export const platformInactiveLayerImageSrc = "/platform-layers/inactive-layer.png";
export const platformInactiveLayerWidth = 1100;
export const platformInactiveLayerHeight = 512;

export const platformLayers: PlatformLayer[] = [
  {
    id: "fund-lifecycle",
    label: "Fund Lifecycle",
    placeholderLabel: "Fund Lifecycle",
    imageSrc: "/platform-layers/fund-lifecycle.png",
    imageWidth: 2200,
    imageHeight: 1023,
    sidebarDescription:
      "End-to-end workflows across formation, capital deployment, portfolio management, and exit — organized around how funds actually operate.",
    elevation: 4,
    panelTint: "#0D4B33",
    gridRows: 1,
    gridCols: 1,
    tiles: [
      {
        id: "fund-lifecycle",
        label: "Fund Lifecycle",
        description:
          "End-to-end workflows across formation, capital deployment, portfolio management, and exit — organized around how funds actually operate.",
        href: "/product/fund-formation",
        icon: GitBranch,
        variant: "purple",
        row: 0,
        col: 0,
      },
    ],
  },
  {
    id: "collaboration-layer",
    label: "Collaboration Layer",
    placeholderLabel: "Collaboration",
    imageSrc: "/platform-layers/collaboration-layer.png",
    imageWidth: 2200,
    imageHeight: 1023,
    sidebarDescription:
      "Connect legal teams, fund operations, external counsel, and stakeholders in a shared workspace with clear ownership and audit trails.",
    elevation: 3,
    panelTint: "#594128",
    gridRows: 1,
    gridCols: 1,
    tiles: [
      {
        id: "collaboration-layer",
        label: "Collaboration Layer",
        description:
          "Connect legal teams, fund operations, external counsel, and stakeholders in a shared workspace with clear ownership and audit trails.",
        href: "/solution/in-house-lawyer",
        icon: Handshake,
        variant: "mint",
        row: 0,
        col: 0,
      },
    ],
  },
  {
    id: "legal-engineering-layer",
    label: "Legal Engineering Layer",
    placeholderLabel: "Legal Engineering",
    imageSrc: "/platform-layers/legal-engineering-layer.png",
    imageWidth: 2200,
    imageHeight: 1023,
    sidebarDescription:
      "Extract, structure, and analyse legal documents and entity data — turning unstructured inputs into obligations, insights, and completed work.",
    elevation: 2,
    panelTint: "#452D52",
    gridRows: 1,
    gridCols: 1,
    tiles: [
      {
        id: "legal-engineering-layer",
        label: "Legal Engineering Layer",
        description:
          "Extract, structure, and analyse legal documents and entity data — turning unstructured inputs into obligations, insights, and completed work.",
        icon: Scale,
        variant: "purple",
        row: 0,
        col: 0,
      },
    ],
  },
  {
    id: "fund-entity-layer",
    label: "Fund Entity Layer",
    placeholderLabel: "Fund Entities",
    imageSrc: "/platform-layers/fund-entity-layer.png",
    imageWidth: 2200,
    imageHeight: 1020,
    sidebarDescription:
      "A structured system of record for fund entities, investor relationships, commitments, and portfolio-level legal obligations.",
    elevation: 1,
    panelTint: "#1E3A4F",
    gridRows: 1,
    gridCols: 1,
    tiles: [
      {
        id: "fund-entity-layer",
        label: "Fund Entity Layer",
        description:
          "A structured system of record for fund entities, investor relationships, commitments, and portfolio-level legal obligations.",
        icon: Building2,
        variant: "neutral",
        row: 0,
        col: 0,
      },
    ],
  },
  {
    id: "security-layer",
    label: "Security Layer",
    placeholderLabel: "Security",
    imageSrc: "/platform-layers/security-layer.png",
    imageWidth: 2200,
    imageHeight: 1020,
    sidebarDescription:
      "Enterprise-grade security, access control, and compliance infrastructure that underpins every workflow on the platform.",
    elevation: 0,
    isFoundation: true,
    panelTint: "#000000",
    gridRows: 1,
    gridCols: 1,
    tiles: [
      {
        id: "security-layer",
        label: "Security Layer",
        description:
          "Enterprise-grade security, access control, and compliance infrastructure that underpins every workflow on the platform.",
        icon: Shield,
        variant: "neutral",
        row: 0,
        col: 0,
      },
    ],
  },
];

/** Layers ordered top-to-bottom for sidebar and scroll (highest elevation first). */
export const platformLayersByElevation = [...platformLayers].sort(
  (a, b) => b.elevation - a.elevation,
);

export function getPlatformLayer(id: string) {
  return platformLayers.find((layer) => layer.id === id);
}

export function getPlatformTile(layerId: string, tileId: string) {
  const layer = getPlatformLayer(layerId);
  if (!layer) return undefined;
  const tile = layer.tiles.find((t) => t.id === tileId);
  if (!tile) return undefined;
  return { layer, tile };
}

export function getAllTiles() {
  return platformLayers.flatMap((layer) =>
    layer.tiles.map((tile) => ({ layer, tile })),
  );
}

export function getPrimaryTile(layer: PlatformLayer) {
  return layer.tiles.find((tile) => tile.id === layer.id) ?? layer.tiles[0];
}

function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "");
  const value = Number.parseInt(normalized, 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function lerpChannel(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t);
}

/** Blend panel tints while scrolling between layers (floatIndex is fractional). */
export function getBlendedPanelTint(floatIndex: number) {
  const maxIndex = platformLayersByElevation.length - 1;
  const clamped = Math.max(0, Math.min(floatIndex, maxIndex));
  const lower = Math.floor(clamped);
  const upper = Math.min(Math.ceil(clamped), maxIndex);
  const t = clamped - lower;

  if (lower === upper) {
    return platformLayersByElevation[lower].panelTint;
  }

  const from = hexToRgb(platformLayersByElevation[lower].panelTint);
  const to = hexToRgb(platformLayersByElevation[upper].panelTint);
  const r = lerpChannel(from.r, to.r, t);
  const g = lerpChannel(from.g, to.g, t);
  const b = lerpChannel(from.b, to.b, t);

  return `rgb(${r} ${g} ${b})`;
}

/** Panel tint as an rgba overlay string. */
export function panelTintOverlay(color: string, alpha = 0.05) {
  if (color.startsWith("rgb(")) {
    return color.replace("rgb(", "rgba(").replace(")", ` / ${alpha})`);
  }

  const { r, g, b } = hexToRgb(color);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
