"use client";

import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useBrickPartsStore } from "@/store/brick-parts";

type Props = {
  onOpen: () => void;
};

const ColorBrickButton = ({ onOpen }: Props) => {
  const selectedBrickUuid = useBrickPartsStore((state) => state.selectedBrickUuid);

  const hexColorPaletteClick = () => {
    if (!selectedBrickUuid) return;

    if (onOpen) {
      onOpen();
      return;
    }

    window.dispatchEvent(
      new CustomEvent("open-color-picker", { detail: { uuid: selectedBrickUuid } })
    );
  };

  return (
    <div className="flex items-center justify-end px-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            className="h-8 w-8 border-black text-black hover:bg-black/5 disabled:opacity-40"
            variant="outline"
            onClick={hexColorPaletteClick}
          >
            <Palette className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Color</TooltipContent>
      </Tooltip>
    </div>
  );
};

export default ColorBrickButton;
