"use client";

import { useState } from "react";
import { toast } from "sonner";
import { BRICK_SAVE_TOAST } from "config/app-config";
import { useSceneExporterStore } from "@/store/scene-exporter";

const useBricksSave = (isLoggedIn: boolean) => {
  const [isSaving, setIsSaving] = useState(false);
  const exportSavedScene = useSceneExporterStore((state) => state.scene);

  const bricksSave = async () => {
    if (isSaving) return;
    if (!isLoggedIn) return;

    if (!exportSavedScene) {
      toast.error(BRICK_SAVE_TOAST.FAIL_TITLE, {
        description: BRICK_SAVE_TOAST.NOT_READY,
      });
      return;
    }

    if (exportSavedScene.bricks.length === 0) {
      toast.error(BRICK_SAVE_TOAST.FAIL_TITLE, {
        description: BRICK_SAVE_TOAST.NO_BRICKS,
      });
      return;
    }

    setIsSaving(true);

    try {
      const saveResponse = await fetch("/api/users/me/bricks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: exportSavedScene }),
      });

      if (!saveResponse.ok) {
        toast.error(BRICK_SAVE_TOAST.FAIL_TITLE, {
          description: BRICK_SAVE_TOAST.FAIL_DESCRIPTION,
        });
        return;
      }

      toast.success(BRICK_SAVE_TOAST.SUCCESS_TITLE, {
        description: BRICK_SAVE_TOAST.SUCCESS_DESCRIPTION,
      });
    } catch {
      toast.error(BRICK_SAVE_TOAST.NETWORK_ERROR_TITLE, {
        description: BRICK_SAVE_TOAST.NETWORK_ERROR_DESCRIPTION,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return { bricksSave, isSaving };
};

export default useBricksSave;
