"use client";

import { RefreshCcw, Palette, Trash2 } from "lucide-react";
import { TOOLBAR_GUIDE_TEXTS } from "config/ui-config";

const TOOLBAR_ICONS = [RefreshCcw, Palette, Trash2, null];

const ToolbarGuide = () => {
  return (
    <div className="space-y-8 pb-4">
      {TOOLBAR_GUIDE_TEXTS.map(({ TITLE, DESCRIPTION }, index) => {
        const Icon = TOOLBAR_ICONS[index];
        return (
          <div key={TITLE}>
            <div className="flex items-center gap-2">
              {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
              <h2 className="text-xl font-medium">{TITLE}</h2>
            </div>
            <p className="text-sm text-muted-foreground mt-2 whitespace-pre-line">{DESCRIPTION}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ToolbarGuide;
