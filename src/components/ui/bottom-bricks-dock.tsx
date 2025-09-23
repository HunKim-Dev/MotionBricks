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

const BottomBricksDock = () => {
  const bricksBoxs = [
    { type: "1x1", path: "/bricks-image/1x1.png" },
    { type: "1x2", path: "/bricks-image/1x2.png" },
    { type: "2x2", path: "/bricks-image/2x2.png" },
    { type: "2x3", path: "/bricks-image/2x3.png" },
    { type: "2x4", path: "/bricks-image/2x4.png" },
    { type: "2x6", path: "/bricks-image/2x6.png" },
    { type: "half1x1", path: "/bricks-image/half1x1.png" },
    { type: "half1x2", path: "/bricks-image/half1x2.png" },
    { type: "half2x2", path: "/bricks-image/half2x2.png" },
    { type: "half2x3", path: "/bricks-image/half2x3.png" },
    { type: "half2x4", path: "/bricks-image/half2x4.png" },
    { type: "half2x6", path: "/bricks-image/half2x6.png" },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 z-40 border bg-background w-full max-w-screen-lg -translate-x-1/2 rounded-md">
      <div className="flex h-10 items-center gap-2 border-b px-3">
        <Select defaultValue="Bricks">
          <SelectTrigger className="h-8 w-[160px]">
            <SelectValue placeholder="Bricks" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Bricks">Bricks</SelectItem>
            <SelectItem value="Plates">Plates</SelectItem>
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
          {bricksBoxs.map((box) => (
            <div
              key={box.type}
              className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-md border bg-muted/60"
            >
              <Image
                src={box.path}
                alt={box.type}
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
