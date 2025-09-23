"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { useState, useMemo } from "react";

type BricksCategory = "all" | "full" | "plate";

const bricksBoxs = [
  { name: "1x1", path: "/bricks-image/1x1.png", type: "full" },
  { name: "1x2", path: "/bricks-image/1x2.png", type: "full" },
  { name: "2x2", path: "/bricks-image/2x2.png", type: "full" },
  { name: "2x3", path: "/bricks-image/2x3.png", type: "full" },
  { name: "2x4", path: "/bricks-image/2x4.png", type: "full" },
  { name: "2x6", path: "/bricks-image/2x6.png", type: "full" },
  { name: "half1x1", path: "/bricks-image/half1x1.png", type: "plate" },
  { name: "half1x2", path: "/bricks-image/half1x2.png", type: "plate" },
  { name: "half2x2", path: "/bricks-image/half2x2.png", type: "plate" },
  { name: "half2x3", path: "/bricks-image/half2x3.png", type: "plate" },
  { name: "half2x4", path: "/bricks-image/half2x4.png", type: "plate" },
  { name: "half2x6", path: "/bricks-image/half2x6.png", type: "plate" },
];

const BottomBricksDock = () => {
  const [bricksCategory, setBricksCategory] = useState<BricksCategory>("all");

  const filteredBricksBoxs = useMemo(() => {
    return bricksBoxs.filter((bricks) => {
      if (bricksCategory === "all") return true;
      if (bricksCategory === "full") return bricks.type === "full";
      if (bricksCategory === "plate") return bricks.type === "plate";
      return true;
    });
  }, [bricksCategory]);

  return (
    <div className="fixed bottom-0 left-1/2 z-40 border bg-background w-full max-w-screen-lg -translate-x-1/2 rounded-md">
      <div className="flex h-10 items-center gap-2 border-b px-3">
        <Select
          defaultValue={bricksCategory}
          onValueChange={(value) => setBricksCategory(value as BricksCategory)}
        >
          <SelectTrigger className="h-8 w-[160px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="full">Bricks</SelectItem>
            <SelectItem value="plate">Plates</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex-1" />
        <Input className="h-8 w-[220px]" placeholder="Search" />
        <Button variant="ghost" size="sm" className="h-8 px-3">
          Search
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="flex h-full items-center gap-2 px-3">
          <div className="w-3 shrink-0 md:w-4" />
          {filteredBricksBoxs.map((box) => (
            <div
              key={box.name}
              className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-md border bg-muted/60"
            >
              <Image
                src={box.path}
                alt={box.name}
                width={48}
                height={48}
                className="object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 h-3 bg-background/70" />
            </div>
          ))}
          <div className="w-3 shrink-0 md:w-4" />
        </div>
      </ScrollArea>
    </div>
  );
};

export default BottomBricksDock;
