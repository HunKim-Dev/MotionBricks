"use client";

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
import { Save, Upload } from "lucide-react";
import HandPreview from "@/components/workshop/hand-preview";
import LayersPanel from "@/components/workshop/layers-panel";

import { LANDING_PAGE_TITLE, LOGIN_DESCRIPTION, TOOLTIP_BUTTONS } from "config/app-config";
import { HAND_START_BUTTON_LABEL, HAND_STOP_BUTTON_LABEL } from "config/ui-config";

import useBricksSave from "@/hooks/use-brick-save";
import useBricksLoad from "@/hooks/use-brick-load";
import useUserLogout from "@/hooks/use-user-logout";
import LogoutAlert from "./logout-alert";
import GuideButton from "../guide/guide.button";
import LoadingSpinner from "./loading-spinner";

const AppSidebar = () => {
  const { data: session } = useSession();

  const isLoggedIn = Boolean(session?.user?.email);
  const userName = session?.user?.name;

  const { bricksSave, isSaving } = useBricksSave(isLoggedIn);
  const { bricksLoad, isLoading } = useBricksLoad(isLoggedIn);
  const { logOut, isLogOut } = useUserLogout();

  const tooltipButtons = [
    { text: TOOLTIP_BUTTONS.SAVE_LABAL, icon: Save, onClick: bricksSave, loading: isSaving },
    { text: TOOLTIP_BUTTONS.LAOD_LABAL, icon: Upload, onClick: bricksLoad, loading: isLoading },
  ];

  return (
    <Sidebar side="right" variant="sidebar">
      <SidebarHeader className="px-3 py-4">
        <SidebarTrigger className="absolute top-2 -left-8 z-20 h-6 w-6" />

        <div className="flex items-center gap-5.5 justify-end mr-1.5">
          <GuideButton />
          {isLoggedIn ? (
            <>
              {tooltipButtons.map((tooltipButton) => (
                <Tooltip key={tooltipButton.text}>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={tooltipButton.onClick}
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
          <div className="px-1 pb-2 text-lg font-medium">
            {userName ? `${userName}님의 ${LANDING_PAGE_TITLE}` : LANDING_PAGE_TITLE}
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
    </Sidebar>
  );
};

export default AppSidebar;
