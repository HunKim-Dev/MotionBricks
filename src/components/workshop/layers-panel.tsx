"use client";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

type Layer = {
  id: string;
  name: string;
};

// 더미 데이터: 추후 브릭 렌더링 데이터 연결 예정
const dummyLayers: Layer[] = [
  { id: "l-1", name: "2x4" },
  { id: "l-2", name: "1x2" },
  { id: "l-3", name: "half2x4" },
  { id: "l-4", name: "half2x3" },
  { id: "l-5", name: "half2x3" },
  { id: "l-6", name: "4x4" },
  { id: "l-7", name: "1x3" },
  { id: "l-8", name: "half2x3" },
  { id: "l-9", name: "2x6" },
  { id: "l-10", name: "half2x3" },
];

const LayersPanel = () => {
  const [selectedId, setSelectedId] = useState<string | null>(dummyLayers[0]?.id ?? null);

  // TODO: 추후 브릭 렌더링 로직과 연결 시,
  // - 여기서 selectedId를 전역 상태(zustand)or props로 onSelect를 받아서 캔버스 쪽과 동기화 예정

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="text-sm font-medium">Layers</div>
      <ScrollArea className="h-[320px] rounded-md border">
        <div className="flex flex-col">
          {dummyLayers.map((layer) => {
            const isSelected = layer.id === selectedId;
            return (
              <button
                key={layer.id}
                onClick={() => setSelectedId(layer.id)}
                className={`flex items-center gap-2 px-2 py-2 text-left border-b last:border-b-0 ${
                  isSelected ? "bg-accent text-accent-foreground" : "hover:bg-muted/60"
                }`}
              >
                <div className="truncate text-sm">{layer.name}</div>
              </button>
            );
          })}
          {dummyLayers.length === 0 && (
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
