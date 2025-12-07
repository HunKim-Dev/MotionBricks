"use client";

import { RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useBrickPartsStore } from "@/store/brick-parts";

const RotateBrickButton = () => {
  const selectedBrickUuid = useBrickPartsStore((state) => state.selectedBrickUuid);

  const RotateBrickClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!selectedBrickUuid) return;

    window.dispatchEvent(
      new CustomEvent("brick-rotate", {
        detail: { uuid: selectedBrickUuid, axis: "y" as const, deg: 90 as const },
      })
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
            onMouseDown={(event) => event.stopPropagation()}
            onClick={RotateBrickClick}
          >
            <RefreshCcw className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Rotate</TooltipContent>
      </Tooltip>
    </div>
  );
};

export default RotateBrickButton;
