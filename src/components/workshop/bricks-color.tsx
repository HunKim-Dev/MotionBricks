"use client";

type BricksColorProps = {
  onPick?: (hex: string) => void;
};

const defaultPalette = ["#a7f3d0", "#bfdbfe", "#fde68a", "#fecaca", "#e9d5ff"];

const BricksColor = ({ onPick }: BricksColorProps) => {
  return (
    <div className="text-sm font-medium">
      <div className="mb-2">Bircks Colors</div>
      <div className="flex flex-wrap gap-2 rounded-md border p-2 bg-background items-center justify-center">
        {defaultPalette.map((color) => (
          <button
            key={color}
            aria-label={`color ${color}`}
            className="h-7 w-7 rounded-md border shadow-sm hover:scale-120 transition"
            style={{ backgroundColor: color }}
            onClick={() => onPick?.(color)}
          />
        ))}
      </div>
    </div>
  );
};

export default BricksColor;
