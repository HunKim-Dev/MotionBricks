"use client";

import { useState, useCallback, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import DeleteBrickButton from "../ui/delete-button";
import { useBrickPartsStore } from "@/store/brick-parts";
import { SIDEBAR_LAYERS_LABEL, SIDEBAR_LAYERS_INSIDE_LABEL } from "config/ui-config";

type Layer = {
  uuid: string;
  name: string;
  color?: string;
};

const LayersPanel = () => {
  const [layers, setLayers] = useState<Layer[]>([]);
  const selectedBrickUuid = useBrickPartsStore((state) => state.selectedBrickUuid);
  const selectedPart = useBrickPartsStore((state) => state.selectPart);

  const selectLayer = useCallback(
    (uuid: string) => {
      selectedPart(uuid);
      window.dispatchEvent(new CustomEvent("select-layer", { detail: { uuid } }));
    },
    [selectedPart]
  );

  useEffect(() => {
    const addedLayer = (event: Event) => {
      const { uuid, name } = (event as CustomEvent<Layer>).detail;

      setLayers((prev) => [...prev, { uuid, name }]);
    };

    window.addEventListener("layer-added", addedLayer);
    return () => {
      window.removeEventListener("layer-added", addedLayer);
    };
  }, []);

  useEffect(() => {
    const deletedLayer = (event: Event) => {
      const { uuid } = (event as CustomEvent<{ uuid: string }>).detail;
      if (!uuid) return;

      setLayers((prev) => prev.filter((l) => l.uuid !== uuid));
    };

    window.addEventListener("layer-deleted", deletedLayer);
    return () => {
      window.removeEventListener("layer-deleted", deletedLayer);
    };
  }, []);

  useEffect(() => {
    const onBrickColorChange = (event: Event) => {
      const color = (event as CustomEvent<string>).detail;

      if (!selectedBrickUuid) return;

      setLayers((prev) =>
        prev.map((layer) => (layer.uuid === selectedBrickUuid ? { ...layer, color } : layer))
      );
    };

    window.addEventListener("brick-color-change", onBrickColorChange);
    return () => {
      window.removeEventListener("brick-color-change", onBrickColorChange);
    };
  }, [selectedBrickUuid]);

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center justify-between px-2">
        <div className="text-base font-medium">{SIDEBAR_LAYERS_LABEL}</div>
        <DeleteBrickButton />
      </div>
      <ScrollArea className="h-[320px] rounded-md border">
        <div className="flex flex-col">
          {layers.map((layer) => {
            const isSelected = layer.uuid === selectedBrickUuid;
            return (
              <button
                key={layer.uuid}
                onClick={() => selectLayer(layer.uuid)}
                className={`flex items-center gap-6 px-2 py-2 text-left border-b last:border-b-0 ${
                  isSelected ? "bg-accent text-accent-foreground" : "hover:bg-muted/60"
                }`}
              >
                <div
                  className="h-5 w-5 rounded-sm border border-border bg-white shrink-0"
                  style={{ backgroundColor: layer.color ?? "#d3504e" }}
                />
                <div className="truncate text-sm">{layer.name}</div>
              </button>
            );
          })}
          {layers.length === 0 && (
            <div className="flex h-20 items-center justify-center text-xs text-muted-foreground">
              {SIDEBAR_LAYERS_INSIDE_LABEL}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default LayersPanel;
