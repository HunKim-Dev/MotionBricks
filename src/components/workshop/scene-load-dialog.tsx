"useclient";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import type { LoadedScene } from "@/hooks/use-brick-load";
import { SCENE_LOAD_TEXTS } from "config/ui-config";

type SceneLoadDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sceneList: LoadedScene[];
  onSelectScene: (sceneId: string) => void;
};

const SceneLoadDialog = ({
  open,
  onOpenChange,
  sceneList,
  onSelectScene,
}: SceneLoadDialogProps) => {
  const [searchText, setSearchText] = useState("");

  const filteredScenes = sceneList.filter((scene) => {
    const label = new Date(scene.updatedAt).toLocaleString("ko-KR");
    const trimSearchText = searchText.trim();

    if (!trimSearchText) return true;

    return label.includes(trimSearchText);
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{SCENE_LOAD_TEXTS.TITLE}</DialogTitle>
          <DialogDescription>{SCENE_LOAD_TEXTS.DESCRIPTION}</DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-3">
          <Input
            placeholder={SCENE_LOAD_TEXTS.INPUT}
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />

          <ScrollArea className="mt-2 max-h-64 border rounded-md">
            <div className="flex flex-col">
              {filteredScenes.length === 0 ? (
                <div className="px-3 py-4 text-sm text-muted-foreground">
                  {SCENE_LOAD_TEXTS.NOT_FOUND}
                </div>
              ) : (
                filteredScenes.map((scene) => {
                  const label = new Date(scene.updatedAt).toLocaleString("ko-KR");

                  return (
                    <button
                      key={scene.id}
                      type="button"
                      className="flex w-full flex-col items-start px-3 py-2 text-left text-sm hover:bg-muted/70"
                      onClick={() => {
                        onSelectScene(scene.id);
                        onOpenChange(false);
                      }}
                    >
                      <span className="font-medium">{label}</span>
                      <span className="text-xs text-muted-foreground">
                        {SCENE_LOAD_TEXTS.BRICK_NUM} {scene.data.bricks.length}
                        {SCENE_LOAD_TEXTS.BRICK_COUNT}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SceneLoadDialog;
