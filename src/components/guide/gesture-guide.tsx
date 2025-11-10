"use client";

import { GESTURE_GUIDE_TEXTS } from "config/ui-config";

const GestureGuide = () => {
  const gestures = [
    GESTURE_GUIDE_TEXTS.PAW,
    GESTURE_GUIDE_TEXTS.FIST,
    GESTURE_GUIDE_TEXTS.V_SIGN,
    GESTURE_GUIDE_TEXTS.THUMB_UP,
    GESTURE_GUIDE_TEXTS.THUMB_DOWN,
  ];

  return (
    <div className="space-y-8 mb-4">
      {gestures.map(({ TITLE, DESCRIPTION }) => (
        <div key={TITLE}>
          <h2 className="text-xl font-medium">{TITLE}</h2>
          <p className="text-sm text-muted-foreground mt-2 whitespace-pre-line">{DESCRIPTION}</p>
        </div>
      ))}
    </div>
  );
};

export default GestureGuide;
