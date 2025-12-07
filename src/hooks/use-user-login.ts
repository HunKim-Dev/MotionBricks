"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { ERROR_CODES, SUCCESS_CODES, USER_LOGIN_TOAST, USER_LOGIN_LOG } from "config/app-config";
import { ROUTES } from "config/path-config";

const useUserLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      await signIn("google", {
        redirectTo: ROUTES.WORKSHOP,
        authorizationParams: { prompt: "select_account" },
      });

      console.log({
        code: SUCCESS_CODES.AUTH_SUCCESS,
        message: USER_LOGIN_LOG.SUCCESS_MESSAGE,
      });
    } catch (error) {
      setIsLoading(false);

      toast.error(USER_LOGIN_TOAST.FAIL_TITLE, { description: USER_LOGIN_TOAST.FAIL_DESCRIPTION });
      console.warn({
        code: ERROR_CODES.AUTH_ERROR,
        message: USER_LOGIN_LOG.EXCEPTION_MESSAGE,
        error,
      });
    }
  };

  return { login, isLoading };
};

export default useUserLogin;
