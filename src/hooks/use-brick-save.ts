"use client";

import { toast } from "sonner";
import { BRICK_SAVE_TOAST, BRICK_SAVE_LOG, ERROR_CODES, SUCCESS_CODES } from "config/app-config";

const useBricksSave = (isLoggedIn: boolean) => {
  const bricksSave = async () => {
    try {
      if (!isLoggedIn) return;

      const saveResponse = await fetch("/api/users/me/bricks");

      if (!saveResponse.ok) {
        toast.error(BRICK_SAVE_TOAST.FAIL_TITLE, {
          description: BRICK_SAVE_TOAST.FAIL_DESCRIPTION,
        });

        console.warn({
          code: ERROR_CODES.SAVE_ERROR,
          message: BRICK_SAVE_LOG.FAIL_MESSAGE,
        });
        return;
      }

      toast.success(BRICK_SAVE_TOAST.SUCCESS_TITLE, {
        description: BRICK_SAVE_TOAST.SUCCESS_DESCRIPTION,
      });

      console.log({
        code: SUCCESS_CODES.SAVE_SUCCESS,
        message: BRICK_SAVE_LOG.SUCCESS_MESSAGE,
      });
    } catch (error) {
      toast.error(BRICK_SAVE_TOAST.NETWORK_ERROR_TITLE, {
        description: BRICK_SAVE_TOAST.NETWORK_ERROR_DESCRIPTION,
      });
      console.warn({
        code: ERROR_CODES.RESOURCE_NOT_FOUND,
        message: BRICK_SAVE_LOG.EXCEPTION_MESSAGE,
        error,
      });
    }
  };

  return bricksSave;
};

export default useBricksSave;
