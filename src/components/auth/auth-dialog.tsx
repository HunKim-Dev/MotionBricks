"use client";

import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Tabs } from "../ui/tabs";
import AuthTabs from "./auth-tabs";
import { LANDING_PAGE_TITLE, LOGIN_DESCRIPTION } from "config/app-config";

const AuthDialog = () => {
  return (
    <DialogContent className="w-[380px] sm:w-[420px] max-w-none py-8 px-6 flex flex-col items-start">
      <DialogHeader className="w-full mb-3 text-left space-y-0.5">
        <DialogTitle className="text-lg font-semibold leading-tight">
          {LANDING_PAGE_TITLE}
        </DialogTitle>
        <DialogDescription className="text-sm text-muted-foreground leading-snug">
          {LOGIN_DESCRIPTION}
        </DialogDescription>
      </DialogHeader>

      <Tabs defaultValue="login" className="w-full flex flex-col items-center -mt-2">
        <AuthTabs />
      </Tabs>
    </DialogContent>
  );
};

export default AuthDialog;
