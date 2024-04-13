import { z } from "zod";

export const userDataSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(4),
  first_name: z.string(),
  last_name: z.string(),
  age: z.number().optional(),
  profession: z.string().optional(),
});

export type UserData = z.infer<typeof userDataSchema>;