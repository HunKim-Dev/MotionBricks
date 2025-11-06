"use client";

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

import {
  LANDING_PAGE_TITLE,
  LOGIN_DESCRIPTION,
  ERROR_CODES,
  LOAD_USER_ERROR_MESSAGES,
  TOOLTIP_BUTTONS,
} from "config/app-config";
import { HAND_START_BUTTON_LABEL, HAND_STOP_BUTTON_LABEL } from "config/ui-config";

import { useState, useEffect } from "react";
import useBricksSave from "@/hooks/use-brick-save";
import useBricksLoad from "@/hooks/use-brick-load";
import useUserLogout from "@/hooks/use-user-logout";
import LogoutAlert from "./logout-alert";

type AppSidebarUser = {
  id: string;
  googleId: string;
  email: string;
  name?: string;
} | null;

const AppSidebar = () => {
  const [user, setUser] = useState<AppSidebarUser>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userResponse = await fetch("/api/users/me", { credentials: "include" });
        const userData = await userResponse.json();

        setUser(userData.user ?? null);
      } catch (error) {
        console.warn({
          code: ERROR_CODES.NETWORK_ERROR,
          message: LOAD_USER_ERROR_MESSAGES,
          error,
        });
        setUser(null);
      }
    };

    loadUser();
  }, []);

  const isLoggedIn = Boolean(user?.id);

  const bricksSave = useBricksSave(isLoggedIn);
  const bricksLoad = useBricksLoad(isLoggedIn);
  const { logOut } = useUserLogout();

  const tooltipButtons = [
    { text: TOOLTIP_BUTTONS.SAVE_LABAL, icon: Save, onClick: bricksSave },
    { text: TOOLTIP_BUTTONS.LAOD_LABAL, icon: Upload, onClick: bricksLoad },
  ];

  return (
    <Sidebar side="right" variant="sidebar">
      <SidebarHeader className="px-3 py-4">
        <SidebarTrigger className="absolute top-2 -left-8 z-20 h-6 w-6" />

        <div className="flex items-center gap-5 justify-end">
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
                      <tooltipButton.icon className="h-5 w-5" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>{tooltipButton.text}</TooltipContent>
                </Tooltip>
              ))}

              <LogoutAlert logOut={logOut} />
            </>
          ) : (
            <div className="text-xs text-muted-foreground">{LOGIN_DESCRIPTION}</div>
          )}
        </div>

        <div className="text-xl font-medium">{LANDING_PAGE_TITLE}</div>
      </SidebarHeader>
      <SidebarContent className="space-y-4.5">
        <SidebarGroup>
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
