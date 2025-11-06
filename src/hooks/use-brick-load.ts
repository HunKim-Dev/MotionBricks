"use client";

import { toast } from "sonner";
import { BRICK_LOAD_TOAST, BRICK_LOAD_LOG, ERROR_CODES, SUCCESS_CODES } from "config/app-config";

const useBricksLoad = (isLoggedIn: boolean) => {
  const bricksLoad = async () => {
    try {
      if (!isLoggedIn) return;

      const loadResponse = await fetch("/api/users/me/bricks");

      if (!loadResponse.ok) {
        toast.error(BRICK_LOAD_TOAST.FAIL_TITLE, {
          description: BRICK_LOAD_TOAST.FAIL_DESCRIPTION,
        });

        console.warn({
          code: ERROR_CODES.LOAD_ERROR,
          message: BRICK_LOAD_LOG.FAIL_MESSAGE,
        });
        return;
      }

      toast.success(BRICK_LOAD_TOAST.SUCCESS_TITLE, {
        description: BRICK_LOAD_TOAST.SUCCESS_DESCRIPTION,
      });

      console.log({
        code: SUCCESS_CODES.LOAD_SUCCESS,
        message: BRICK_LOAD_LOG.SUCCESS_MESSAGE,
      });
    } catch (error) {
      toast.error(BRICK_LOAD_TOAST.NETWORK_ERROR_TITLE, {
        description: BRICK_LOAD_TOAST.NETWORK_ERROR_DESCRIPTION,
      });
      console.warn({
        code: ERROR_CODES.RESOURCE_NOT_FOUND,
        message: BRICK_LOAD_LOG.EXCEPTION_MESSAGE,
        error,
      });
    }
  };

  return bricksLoad;
};

export default useBricksLoad;
