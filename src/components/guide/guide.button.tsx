"use client";

import { BookOpenText } from "lucide-react";
import UsageGuide from "./usage-guide";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import { GUIDE_BUTTON_TEXTS } from "config/ui-config";

const GuideButton = () => {
  return (
    <Dialog>
      <Tooltip>
        <DialogTrigger asChild>
          <TooltipTrigger asChild>
            <button type="button" className="inline-flex items-center justify-center h-5 w-5">
              <BookOpenText className="h-5 w-5" />
            </button>
          </TooltipTrigger>
        </DialogTrigger>
        <TooltipContent>{GUIDE_BUTTON_TEXTS.TOOLTIP}</TooltipContent>
      </Tooltip>

      <DialogContent className="max-w-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold mt-2 mb-1">
            {GUIDE_BUTTON_TEXTS.TITLE}
          </DialogTitle>
          <DialogDescription>{GUIDE_BUTTON_TEXTS.DESCRIPTION}</DialogDescription>
        </DialogHeader>

        <UsageGuide />
      </DialogContent>
    </Dialog>
  );
};

export default GuideButton;
