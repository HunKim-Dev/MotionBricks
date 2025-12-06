import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { BRICK_SAVE_LOG, ERROR_CODES, SUCCESS_CODES } from "config/app-config";

export const POST = async (req: NextRequest) => {
  try {
    const session = await auth();
    const userId = (session?.user?.id as string) || undefined;

    if (!userId) {
      return NextResponse.json(
        {
          error: {
            code: ERROR_CODES.AUTH_ERROR,
            message: BRICK_SAVE_LOG.FAIL_MESSAGE,
          },
        },
        { status: 401 }
      );
    }

    const sceneData = await req.json();
    const existingScene = await prisma.scene.findFirst({
      where: { userId },
    });

    if (existingScene) {
      await prisma.scene.update({
        where: { id: existingScene.id },
        data: { data: sceneData },
      });
    } else {
      await prisma.scene.create({
        data: { userId, data: sceneData },
      });
    }

    return NextResponse.json(
      {
        success: {
          code: SUCCESS_CODES.SAVE_SUCCESS,
          message: BRICK_SAVE_LOG.SUCCESS_MESSAGE,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(ERROR_CODES.SAVE_ERROR, error);

    return NextResponse.json(
      {
        error: {
          code: ERROR_CODES.SAVE_ERROR,
          message: BRICK_SAVE_LOG.EXCEPTION_MESSAGE,
        },
      },
      { status: 500 }
    );
  }
};
