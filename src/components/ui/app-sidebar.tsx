import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Save, Upload } from "lucide-react";
import LayersPanel from "@/components/workshop/layers-panel";
import BricksColor from "@/components/workshop/bricks-color";

const AppSidebar = () => {
  const tooltipButtons = [
    { text: "저장", icon: Save },
    { text: "불러오기", icon: Upload },
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
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
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
