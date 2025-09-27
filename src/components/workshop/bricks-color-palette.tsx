"use client";

import { BRICK_COLOR_PALETTE } from "config/brick-config";

type BricksColorProps = {
  onPick?: (hex: string) => void;
};

const BricksColorPallete = ({ onPick }: BricksColorProps) => {
  return (
    <div className="text-sm font-medium">
      <div className="mb-2">Bircks Colors</div>
      <div className="flex flex-wrap gap-2 rounded-md border p-2 bg-background items-center justify-center">
        {BRICK_COLOR_PALETTE.map((color) => (
          <button
            key={color}
            aria-label={`color ${color}`}
            className="h-7 w-7 rounded-md border shadow-sm hover:scale-120 transition"
            style={{ backgroundColor: color }}
            onClick={() => {
              onPick?.(color);
              window.dispatchEvent(new CustomEvent("brick-color-change", { detail: color }));
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BricksColorPallete;
