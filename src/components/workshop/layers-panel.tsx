"use client";

import { useState, useCallback, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import DeleteBrickButton from "../ui/delete-button";
import { useBrickPartsStore } from "@/store/brick-parts";

type Layer = {
  uuid: string;
  name: string;
};

const LayersPanel = () => {
  const [layers, setLayers] = useState<Layer[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedPart = useBrickPartsStore((state) => state.selectPart);

  const selectLayer = useCallback(
    (uuid: string) => {
      setSelectedId(uuid);
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
      setSelectedId((prev) => (prev === uuid ? null : prev));
    };

    window.addEventListener("layer-deleted", deletedLayer);
    return () => {
      window.removeEventListener("layer-deleted", deletedLayer);
    };
  }, []);

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center justify-between px-2">
        <div className="text-sm font-medium">Layers</div>
        <DeleteBrickButton />
      </div>
      <ScrollArea className="h-[320px] rounded-md border">
        <div className="flex flex-col">
          {layers.map((layer) => {
            const isSelected = layer.uuid === selectedId;
            return (
              <button
                key={layer.uuid}
                onClick={() => selectLayer(layer.uuid)}
                className={`flex items-center gap-2 px-2 py-2 text-left border-b last:border-b-0 ${
                  isSelected ? "bg-accent text-accent-foreground" : "hover:bg-muted/60"
                }`}
              >
                <div className="truncate text-sm">{layer.name}</div>
              </button>
            );
          })}
          {layers.length === 0 && (
            <div className="flex h-20 items-center justify-center text-xs text-muted-foreground">
              No layers
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default LayersPanel;
