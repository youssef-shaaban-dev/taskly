import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email format").nonempty("Email is required"),
  password: z.string().nonempty("Password is required"),
  rememberMe: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;