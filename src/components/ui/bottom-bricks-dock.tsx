"use client";

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
import { BRICK_CATALOG } from "config/brick-config";

type BricksCategory = "all" | "full" | "plate";

const bricksBoxs = [
  { name: "1x1 Brick", path: "/bricks-image/1x1.png", type: "full" },
  { name: "1x2 Brick", path: "/bricks-image/1x2.png", type: "full" },
  { name: "2x2 Brick", path: "/bricks-image/2x2.png", type: "full" },
  { name: "2x3 Brick", path: "/bricks-image/2x3.png", type: "full" },
  { name: "2x4 Brick", path: "/bricks-image/2x4.png", type: "full" },
  { name: "2x6 Brick", path: "/bricks-image/2x6.png", type: "full" },

  { name: "1x1 Plate", path: "/bricks-image/half1x1.png", type: "plate" },
  { name: "1x2 Plate", path: "/bricks-image/half1x2.png", type: "plate" },
  { name: "2x2 Plate", path: "/bricks-image/half2x2.png", type: "plate" },
  { name: "2x3 Plate", path: "/bricks-image/half2x3.png", type: "plate" },
  { name: "2x4 Plate", path: "/bricks-image/half2x4.png", type: "plate" },
  { name: "2x6 Plate", path: "/bricks-image/half2x6.png", type: "plate" },
];

const CATALOG_BY_NAME = new Map(BRICK_CATALOG.map((item) => [item.name, item]));

const BottomBricksDock = () => {
  const [bricksCategory, setBricksCategory] = useState<BricksCategory>("all");
  const [searchedBricks, setSearchedBricks] = useState("");

  const filteredBricksBoxs = useMemo(() => {
    const searchedValidation = searchedBricks.trim().toLowerCase();

    return bricksBoxs.filter((bricks) => {
      if (bricksCategory === "all")
        return searchedValidation ? bricks.name.includes(searchedValidation) : true;

      if (bricksCategory === "full") {
        const bricksTypeFull = bricks.type === "full";
        return (
          bricksTypeFull && (searchedValidation ? bricks.name.includes(searchedValidation) : true)
        );
      }

      if (bricksCategory === "plate") {
        const bricksTypePlate = bricks.type === "plate";
        return (
          bricksTypePlate && (searchedValidation ? bricks.name.includes(searchedValidation) : true)
        );
      }

      return true;
    });
  }, [bricksCategory, searchedBricks]);

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
        <Input
          className="h-8 w-[220px]"
          placeholder="Search"
          value={searchedBricks}
          onChange={(event) => setSearchedBricks(event.target.value)}
        />
      </div>
      <ScrollArea className="h-20">
        <div className="flex h-full items-center justify-center gap-2 px-3">
          {filteredBricksBoxs.map((box) => (
            <button
              key={box.name}
              className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-md border bg-muted/60 mt-1"
              onClick={() => {
                const item = CATALOG_BY_NAME.get(box.name);
                window.dispatchEvent(new CustomEvent("spawn-brick", { detail: item }));
              }}
            >
              <Image
                src={box.path}
                alt={box.name}
                width={48}
                height={48}
                className="object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 h-3 bg-background/70" />
            </button>
          ))}
          <div className="w-3 shrink-0 md:w-4" />
        </div>
      </ScrollArea>
    </div>
  );
};

export default BottomBricksDock;
