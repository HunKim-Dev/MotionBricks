import dynamic from "next/dynamic";

const ColorPaletteOverlay = dynamic(() => import("./color-palette-overlay-client"), { ssr: false });

export default ColorPaletteOverlay;
