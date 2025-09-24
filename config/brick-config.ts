export const LDRAW_PATH = "/ldraw/";

export type CatalogItem = {
  id: string;
  name: string;
  kind: "brick" | "plate";
  path: string;
};

export const BRICK_CATALOG: CatalogItem[] = [
  { id: "3005", name: "1x1 Brick", kind: "brick", path: "/ldraw/parts/3005.dat" },
  { id: "3004", name: "1x2 Brick", kind: "brick", path: "/ldraw/parts/3004.dat" },
  { id: "3003", name: "2x2 Brick", kind: "brick", path: "/ldraw/parts/3003.dat" },
  { id: "3002", name: "2x3 Brick", kind: "brick", path: "/ldraw/parts/3002.dat" },
  { id: "3001", name: "2x4 Brick", kind: "brick", path: "/ldraw/parts/3001.dat" },
  { id: "2456", name: "2x6 Brick", kind: "brick", path: "/ldraw/parts/2456.dat" },

  { id: "3024", name: "1x1 Plate", kind: "plate", path: "/ldraw/parts/3024.dat" },
  { id: "3023", name: "1x2 Plate", kind: "plate", path: "/ldraw/parts/3023.dat" },
  { id: "3022", name: "2x2 Plate", kind: "plate", path: "/ldraw/parts/3022.dat" },
  { id: "3021", name: "2x3 Plate", kind: "plate", path: "/ldraw/parts/3021.dat" },
  { id: "3020", name: "2x4 Plate", kind: "plate", path: "/ldraw/parts/3020.dat" },
  { id: "3795", name: "2x6 Plate", kind: "plate", path: "/ldraw/parts/3795.dat" },
];

export const COLOR_PALETTE = [
  { name: "Turquoise", hex: "#a7f3d0" },
  { name: "Sky Blue", hex: "#bfdbfe" },
  { name: "Yellow", hex: "#fde68a" },
  { name: "Coral", hex: "#fecaca" },
  { name: "Lavender", hex: "#e9d5ff" },
] as const;

export type ColorHex = (typeof COLOR_PALETTE)[number]["hex"];
