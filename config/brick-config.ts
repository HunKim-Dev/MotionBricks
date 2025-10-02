export const LDRAW_PATH = "/ldraw/";

export type CatalogItem = {
  id: string;
  name: string;
  kind: "brick" | "plate";
  path: string;
};

export const BRICK_CATALOG: CatalogItem[] = [
  { id: "3005.dat", name: "1x1 Brick", kind: "brick", path: "/ldraw/parts/3005.dat" },
  { id: "3004.dat", name: "1x2 Brick", kind: "brick", path: "/ldraw/parts/3004.dat" },
  { id: "3003.dat", name: "2x2 Brick", kind: "brick", path: "/ldraw/parts/3003.dat" },
  { id: "3002.dat", name: "2x3 Brick", kind: "brick", path: "/ldraw/parts/3002.dat" },
  { id: "3001.dat", name: "2x4 Brick", kind: "brick", path: "/ldraw/parts/3001.dat" },
  { id: "2456.dat", name: "2x6 Brick", kind: "brick", path: "/ldraw/parts/2456.dat" },

  { id: "3024.dat", name: "1x1 Plate", kind: "plate", path: "/ldraw/parts/3024.dat" },
  { id: "3023.dat", name: "1x2 Plate", kind: "plate", path: "/ldraw/parts/3023.dat" },
  { id: "3022.dat", name: "2x2 Plate", kind: "plate", path: "/ldraw/parts/3022.dat" },
  { id: "3021.dat", name: "2x3 Plate", kind: "plate", path: "/ldraw/parts/3021.dat" },
  { id: "3020.dat", name: "2x4 Plate", kind: "plate", path: "/ldraw/parts/3020.dat" },
  { id: "3795.dat", name: "2x6 Plate", kind: "plate", path: "/ldraw/parts/3795.dat" },
];

export type BrickImage = {
  name: string;
  path: string;
  type: string;
};

export const BRICK_BOX_IMAGES: BrickImage[] = [
  { name: "1x1 Brick", path: "/bricks-image/1x1.png", type: "full" },
  { name: "1x2 Brick", path: "/bricks-image/1x2.png", type: "full" },
  { name: "2x2 Brick", path: "/bricks-image/2x2.png", type: "full" },
  { name: "2x3 Brick", path: "/bricks-image/2x3.png", type: "full" },
  { name: "2x4 Brick", path: "/bricks-image/2x4.png", type: "full" },
  { name: "2x6 Brick", path: "/bricks-image/2x6.png", type: "full" },

  { name: "1x1 Plate", path: "/bricks-image/half1x1.png", type: "plate" },
  { name: "1x2 Plate", path: "/bricks-image/half1x2.png", type: "plate" },
  { name: "2x2 Plate", path: "/bricks-image/half2x2.png", type: "plate" },
  { name: "2x3 Plate", path: "/bricks-image/half2x3.png", type: "plate" },
  { name: "2x4 Plate", path: "/bricks-image/half2x4.png", type: "plate" },
  { name: "2x6 Plate", path: "/bricks-image/half2x6.png", type: "plate" },
];

export const CAMERA_LOCATION = { position: [140, 120, 220] as [number, number, number], fov: 45 };

export const GRID_SIZE = [600, 60] as [number, number];

export const BRICK_BAR_IMAGE_SIZE = 48 as number;

export const BRICK_RENDER_SCALE = [0.5, 0.5, 0.5] as [number, number, number];

export const BRICK_RENDER_POSITION = [0, 0, 0] as [number, number, number];

export const BRICK_AMBIENT_LIGHT = {
  intensity: 0.7,
};

export const BRICK_DIRECTIONAL_LIGHT = {
  intensity: 1,
  position: [5, 8, 5] as [number, number, number],
};

export const BRICK_HEMISPHERE_LIGHT = {
  intensity: 0.5,
};

export const BRICK_COLOR_PALETTE = ["#a7f3d0", "#fad81e", "#fa8282", "#d8b4fe", "#83bcfc"] as [
  string,
  string,
  string,
  string,
  string,
];

export const STUD_UNIT = 1 * BRICK_RENDER_SCALE[0];

export const HANDLE_SIZE = 1.5;
