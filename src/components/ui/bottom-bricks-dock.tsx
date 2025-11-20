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
import { BRICK_CATALOG, BRICK_BAR_IMAGE_SIZE, BRICK_BOX_IMAGES } from "config/brick-config";
import { BOTTOM_BRICK_DOCK } from "config/ui-config";
import LoadingSpinner from "./loading-spinner";
import { useBrickLoadingStore } from "@/store/brick-loading";

type BricksCategory = "all" | "full" | "plate";

const CATALOG_BY_NAME = new Map(BRICK_CATALOG.map((item) => [item.name, item]));

const BottomBricksDock = () => {
  const [bricksCategory, setBricksCategory] = useState<BricksCategory>("all");
  const [searchedBricks, setSearchedBricks] = useState("");

  const { loadingBrickName, startLoading } = useBrickLoadingStore();

  const filteredBricksBoxs = useMemo(() => {
    const searchedValidation = searchedBricks.trim().toLowerCase();

    return BRICK_BOX_IMAGES.filter((bricks) => {
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
    <div className="fixed bottom-0 left-1/2 z-40 border bg-background w-auto max-w-[70%] -translate-x-1/2 rounded-md">
      <div className="flex h-10 items-center gap-2 border-b px-3">
        <Select
          defaultValue={bricksCategory}
          onValueChange={(value) => setBricksCategory(value as BricksCategory)}
        >
          <SelectTrigger className="!h-8 px-2 w-[160px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{BOTTOM_BRICK_DOCK.SELECT_ITEM_ALL}</SelectItem>
            <SelectItem value="full">{BOTTOM_BRICK_DOCK.SELECT_ITEM_BRICK}</SelectItem>
            <SelectItem value="plate">{BOTTOM_BRICK_DOCK.SELECT_ITEM_PLATE}</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex-1" />
        <Input
          className="h-8 w-[220px]"
          placeholder={BOTTOM_BRICK_DOCK.INPUT_INSIDE_LABAL}
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
                startLoading(box.name);

                window.dispatchEvent(new CustomEvent("ghost-spawn", { detail: item }));
              }}
            >
              <Image
                src={box.path}
                alt={box.name}
                width={BRICK_BAR_IMAGE_SIZE}
                height={BRICK_BAR_IMAGE_SIZE}
                className="object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 h-3 bg-background/70" />
              {loadingBrickName === box.name && (
                <div className="absolute inset-0 flex items-center justify-center rounded-md bg-white/80">
                  <div className="scale-150">
                    <LoadingSpinner />
                  </div>
                </div>
              )}
            </button>
          ))}
          <div className="w-3 shrink-0 md:w-4" />
        </div>
      </ScrollArea>
    </div>
  );
};

export default BottomBricksDock;
