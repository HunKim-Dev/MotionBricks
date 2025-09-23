"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Save, Upload } from "lucide-react";
import HandPreview from "@/components/workshop/hand-preview";
import LayersPanel from "@/components/workshop/layers-panel";
import BricksColor from "@/components/workshop/bricks-color";

const AppSidebar = () => {
  const tooltipButtons = [
    { text: "Save", icon: Save },
    { text: "Load", icon: Upload },
  ];
  return (
    <Sidebar side="right" variant="sidebar">
      <SidebarHeader className="px-3 py-4">
        <div className="flex items-center gap-5 justify-end">
          {tooltipButtons.map((tooltipButton) => (
            <Tooltip key={tooltipButton.text}>
              <TooltipTrigger>
                <tooltipButton.icon className="mr-2 h-5 w-5" />
              </TooltipTrigger>
              <TooltipContent>{tooltipButton.text}</TooltipContent>
            </Tooltip>
          ))}
        </div>
        <div className="text-2xl font-medium">AirBricks</div>
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
              Cam Start
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => window.dispatchEvent(new Event("camera:stop"))}
            >
              Cam Stop
            </Button>
          </div>
        </SidebarGroup>
        <SidebarGroup>
          <LayersPanel />
        </SidebarGroup>
        <SidebarGroup>
          <BricksColor />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
