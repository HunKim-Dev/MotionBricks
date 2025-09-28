"use client";

import { Button } from "@/components/ui/button";
import { useBrickPartsStore } from "@/store/brick-parts";
import { Trash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const DeleteBrickButton = () => {
  const selectedBrickUuid = useBrickPartsStore((state) => state.selectedBrickUuid);

  const deleteClick = () => {
    if (!selectedBrickUuid) return;
    window.dispatchEvent(new CustomEvent("delete-brick", { detail: selectedBrickUuid }));
  };
  return (
    <div className="flex items-center justify-end px-2 mt-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            className="h-8 w-8 border-black text-black hover:bg-black/5 disabled:opacity-40"
            variant="outline"
            onClick={deleteClick}
            disabled={!selectedBrickUuid}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Delete</TooltipContent>
      </Tooltip>
    </div>
  );
};

export default DeleteBrickButton;
