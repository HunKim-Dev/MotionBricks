"use client";

import { useState } from "react";
import { toast } from "sonner";
import { BRICK_LOAD_TOAST } from "config/app-config";
import type { SavedScene } from "@/store/scene-exporter";

export type LoadedScene = {
  id: string;
  data: SavedScene;
  createdAt: string;
  updatedAt: string;
};

const useBricksLoad = (isLoggedIn: boolean) => {
  const [isLoading, setIsLoading] = useState(false);
  const [sceneList, setSceneList] = useState<LoadedScene[]>([]);

  const LoadSceneList = async () => {
    if (isLoading) return;
    if (!isLoggedIn) return;

    setIsLoading(true);

    try {
      const loadResponse = await fetch("/api/users/me/bricks", {
        method: "GET",
      });

      if (!loadResponse.ok) {
        toast.error(BRICK_LOAD_TOAST.FAIL_TITLE, {
          description: BRICK_LOAD_TOAST.FAIL_DESCRIPTION,
        });
        return;
      }

      const result = await loadResponse.json();
      const userScene = result.userScene as LoadedScene[] | undefined;

      if (!userScene || userScene.length === 0) {
        toast.error(BRICK_LOAD_TOAST.FAIL_TITLE, {
          description: BRICK_LOAD_TOAST.NO_BRICKS,
        });
        setSceneList([]);
        return;
      }

      const normalizedSceneList: LoadedScene[] = userScene.map((scene) => {
        const sceneData: SavedScene =
          "data" in scene.data ? (scene.data.data as SavedScene) : (scene.data as SavedScene);

        return {
          id: scene.id,
          createdAt: scene.createdAt,
          updatedAt: scene.updatedAt,
          data: sceneData,
        };
      });

      setSceneList(normalizedSceneList);
    } catch {
      toast.error(BRICK_LOAD_TOAST.NETWORK_ERROR_TITLE, {
        description: BRICK_LOAD_TOAST.NETWORK_ERROR_DESCRIPTION,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadSceneById = (sceneId: string) => {
    const targetScene = sceneList.find((scene) => scene.id === sceneId);

    if (!targetScene) {
      toast.error(BRICK_LOAD_TOAST.FAIL_TITLE, {
        description: BRICK_LOAD_TOAST.NOT_FOUND_SCENE,
      });
      return;
    }

    window.dispatchEvent(
      new CustomEvent("scene-load", {
        detail: targetScene.data,
      })
    );

    toast.success(BRICK_LOAD_TOAST.SUCCESS_TITLE, {
      description: BRICK_LOAD_TOAST.SUCCESS_DESCRIPTION,
    });
  };

  return { LoadSceneList, isLoading, sceneList, loadSceneById };
};

export default useBricksLoad;
