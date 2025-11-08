"use client";

import { Power } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { LOGOUT_ALERT_TEXT } from "config/app-config";

type LogoutAlertProps = {
  logOut: () => void;
};

const LogoutAlert = ({ logOut }: LogoutAlertProps) => {
  return (
    <AlertDialog>
      <Tooltip>
        <AlertDialogTrigger asChild>
          <TooltipTrigger asChild>
            <button type="button" className="inline-flex items-center justify-center h-5 w-5">
              <Power className="h-5 w-5" />
            </button>
          </TooltipTrigger>
        </AlertDialogTrigger>
        <TooltipContent>{LOGOUT_ALERT_TEXT.TOOLTIP_LABEL}</TooltipContent>
      </Tooltip>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{LOGOUT_ALERT_TEXT.TITLE}</AlertDialogTitle>
          <AlertDialogDescription className="whitespace-pre-line">
            {LOGOUT_ALERT_TEXT.DESCRIPTION}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{LOGOUT_ALERT_TEXT.CANCEL_BUTTON}</AlertDialogCancel>
          <AlertDialogAction onClick={logOut}>{LOGOUT_ALERT_TEXT.CONFIRM_BUTTON}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutAlert;
