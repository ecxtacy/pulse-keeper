import { z } from "zod";

export const activityDataSchema = z.object({
  name: z.string(),
  grind_id: z.number().int(),
});

export type ActivityData = z.infer<typeof activityDataSchema>;