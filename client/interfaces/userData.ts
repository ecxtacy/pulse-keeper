import { z } from "zod";

export const userEditDataSchema = z.object({
  username: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(4).optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  profession: z.string().optional(),
});

export type UserEditData = z.infer<typeof userEditDataSchema>;

export const userDataSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(4),
  first_name: z.string(),
  last_name: z.string(),
  dob: z.string().date().optional(),
  profession: z.string().optional(),
});

export type UserData = z.infer<typeof userDataSchema>;