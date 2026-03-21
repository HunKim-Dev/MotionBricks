import { z } from "zod/v4";

const savedBrickSchema = z.object({
  uuid: z.uuid(),
  partId: z.string().nullable(),
  name: z.string().nullable(),
  position: z.tuple([z.number(), z.number(), z.number()]),
  rotation: z.tuple([z.number(), z.number(), z.number()]),
  color: z.string().nullable(),
});

export const scenePayloadSchema = z.object({
  data: z.object({
    bricks: z.array(savedBrickSchema).max(500),
  }),
});
