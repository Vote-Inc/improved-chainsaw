import * as z from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const loginResponseSchema = z.object({
  user: z.object({
    id: z.string(),
    email: z.email(),
  }),
});

export type LoginPayload = z.infer<typeof loginSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
