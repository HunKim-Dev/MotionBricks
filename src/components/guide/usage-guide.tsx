"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import GestureGuide from "./gesture-guide";
import BrickGuide from "./brick-guide";
import ToolbarGuide from "./toolbar-guide";
import { USAGE_GUIDE_TEXTS } from "config/ui-config";

const UsageGuide = () => {
  return (
    <Tabs defaultValue="gesture" className="w-full">
      <TabsList className="flex justify-start space-x-3">
        <TabsTrigger value="gesture">{USAGE_GUIDE_TEXTS.TAB_GESTURE}</TabsTrigger>
        <TabsTrigger value="brick">{USAGE_GUIDE_TEXTS.TAB_BRICK}</TabsTrigger>
        <TabsTrigger value="toolbar">{USAGE_GUIDE_TEXTS.TAB_TOOLBAR}</TabsTrigger>
      </TabsList>

      <div className="mt-3 h-[550px] overflow-y-auto pr-1">
        <TabsContent value="gesture" className="mt-6">
          <GestureGuide />
        </TabsContent>

        <TabsContent value="brick" className="mt-6">
          <BrickGuide />
        </TabsContent>

        <TabsContent value="toolbar" className="mt-6">
          <ToolbarGuide />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default UsageGuide;
