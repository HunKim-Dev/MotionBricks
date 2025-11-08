"use client";

import { toast } from "sonner";
import { USER_LOGOUT_TOAST, USER_LOGOUT_LOG, ERROR_CODES, SUCCESS_CODES } from "config/app-config";
import { signOut } from "next-auth/react";
import { ROUTES } from "config/path-config";

const useUserLogout = () => {
  const logOut = async () => {
    try {
      await signOut({ redirectTo: ROUTES.HOME });

      toast.success(USER_LOGOUT_TOAST.SUCCESS_TITLE, {
        description: USER_LOGOUT_TOAST.SUCCESS_DESCRIPTION,
      });
      console.log({
        code: SUCCESS_CODES.LOGOUT_SUCCESS,
        message: USER_LOGOUT_LOG.SUCCESS_MESSAGE,
      });
    } catch (error) {
      toast.error(USER_LOGOUT_TOAST.FAIL_TITLE, {
        description: USER_LOGOUT_TOAST.FAIL_DESCRIPTION,
      });
      console.warn({
        code: ERROR_CODES.RESOURCE_NOT_FOUND,
        message: USER_LOGOUT_LOG.EXCEPTION_MESSAGE,
        error,
      });
    }
  };

  return { logOut };
};

export default useUserLogout;
