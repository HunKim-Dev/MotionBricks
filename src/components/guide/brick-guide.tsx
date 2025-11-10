"use client";

import { BRICK_GUIDE_TEXTS } from "config/ui-config";

const BrickGuide = () => {
  const guides = [
    BRICK_GUIDE_TEXTS.BRICK_BAR,
    BRICK_GUIDE_TEXTS.SEARCH,
    BRICK_GUIDE_TEXTS.SUMMON,
    BRICK_GUIDE_TEXTS.MOVE,
    BRICK_GUIDE_TEXTS.ASSEMBLE,
    BRICK_GUIDE_TEXTS.SAVE,
  ];

  return (
    <div className="space-y-8 pb-4">
      {guides.map(({ TITLE, DESCRIPTION }) => (
        <div key={TITLE}>
          <h2 className="text-xl font-medium">{TITLE}</h2>
          <p className="text-sm text-muted-foreground mt-2 whitespace-pre-line">{DESCRIPTION}</p>
        </div>
      ))}
    </div>
  );
};

export default BrickGuide;
