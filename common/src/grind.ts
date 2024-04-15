import { z } from "zod";

export const grindDataSchema = z.object({
  name: z.string(), 
});

export type GrindData = z.infer<typeof grindDataSchema>;