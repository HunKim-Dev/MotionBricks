"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Save, Upload, Undo2, Redo2 } from "lucide-react";
import { useUndoRedoStore } from "@/store/undo-redo";
import HandPreview from "@/components/workshop/hand-preview";
import LayersPanel from "@/components/workshop/layers-panel";

import { LANDING_PAGE_TITLE, LOGIN_DESCRIPTION, TOOLTIP_BUTTONS } from "config/app-config";
import { HAND_START_BUTTON_LABEL, HAND_STOP_BUTTON_LABEL } from "config/ui-config";
import GestureFeedbackLabel from "@/components/workshop/gesture-feedback-label";

import useBricksSave from "@/hooks/use-brick-save";
import useBricksLoad from "@/hooks/use-brick-load";
import useUserLogout from "@/hooks/use-user-logout";
import LogoutAlert from "./logout-alert";
import GuideButton from "../guide/guide.button";
import LoadingSpinner from "./loading-spinner";
import SceneLoadDialog from "@/components/workshop/scene-load-dialog";

const AppSidebar = () => {
  const [isSceneDialogOpen, setIsSceneDialogOpen] = useState(false);
  const { data: session } = useSession();

  const isLoggedIn = Boolean(session?.user?.email);
  const userName = session?.user?.name ?? undefined;

  const canUndo = useUndoRedoStore((s) => s.pointer >= 0);
  const canRedo = useUndoRedoStore((s) => s.pointer < s.history.length - 1);

  const { bricksSave, isSaving } = useBricksSave(isLoggedIn);
  const { LoadSceneList, isLoading, sceneList, loadSceneById } = useBricksLoad(isLoggedIn);
  const { logOut, isLogOut } = useUserLogout();

  const tooltipButtons = [
    {
      key: "save",
      text: TOOLTIP_BUTTONS.SAVE_LABAL,
      icon: Save,
      onClick: bricksSave,
      loading: isSaving,
    },
    {
      key: "load",
      text: TOOLTIP_BUTTONS.LAOD_LABAL,
      icon: Upload,
      onClick: () => {},
      loading: isLoading,
    },
  ];

  const handleLoadButtonClick = async () => {
    await LoadSceneList();
    setIsSceneDialogOpen(true);
  };

  return (
    <Sidebar side="right" variant="sidebar">
      <SidebarHeader className="px-3 py-4">
        <SidebarTrigger className="absolute top-2 -left-8 z-20 h-6 w-6" />

        <div className="flex items-center gap-5.5 justify-end mr-1.5">
          <GuideButton />
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                disabled={!canUndo}
                onClick={() => window.dispatchEvent(new Event("undo"))}
                className="inline-flex items-center justify-center h-5 w-5 disabled:opacity-30"
              >
                <Undo2 className="h-5 w-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent>{TOOLTIP_BUTTONS.UNDO_LABEL}</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                disabled={!canRedo}
                onClick={() => window.dispatchEvent(new Event("redo"))}
                className="inline-flex items-center justify-center h-5 w-5 disabled:opacity-30"
              >
                <Redo2 className="h-5 w-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent>{TOOLTIP_BUTTONS.REDO_LABEL}</TooltipContent>
          </Tooltip>
          {isLoggedIn ? (
            <>
              {tooltipButtons.map((tooltipButton) => (
                <Tooltip key={tooltipButton.key}>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={
                        tooltipButton.key === "load" ? handleLoadButtonClick : tooltipButton.onClick
                      }
                      className="inline-flex items-center justify-center h-5 w-5"
                    >
                      {tooltipButton.loading ? (
                        <LoadingSpinner />
                      ) : (
                        <tooltipButton.icon className="h-5 w-5" />
                      )}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>{tooltipButton.text}</TooltipContent>
                </Tooltip>
              ))}

              <LogoutAlert logOut={logOut} isLoading={isLogOut} />
            </>
          ) : (
            <div className="text-xs text-muted-foreground">{LOGIN_DESCRIPTION}</div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent className="space-y-4.5">
        <SidebarGroup>
          <div className="px-1 pb-2 text-lg font-medium flex items-center gap-2">
            <span>{userName ? `${userName}님의 ${LANDING_PAGE_TITLE}` : LANDING_PAGE_TITLE}</span>
            <GestureFeedbackLabel />
          </div>
          <HandPreview />
          <div className="flex items-center justify-center gap-2 mt-3">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => window.dispatchEvent(new Event("camera:start"))}
            >
              {HAND_START_BUTTON_LABEL}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => window.dispatchEvent(new Event("camera:stop"))}
            >
              {HAND_STOP_BUTTON_LABEL}
            </Button>
          </div>
        </SidebarGroup>
        <SidebarGroup>
          <LayersPanel />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
      <SceneLoadDialog
        open={isSceneDialogOpen}
        onOpenChange={setIsSceneDialogOpen}
        sceneList={sceneList}
        onSelectScene={loadSceneById}
      />
    </Sidebar>
  );
};

export default AppSidebar;
