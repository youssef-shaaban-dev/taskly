import { z } from "zod";

export const signUpSchema = z.object({
  // 1. Name: English/Arabic letters, no numbers, no special chars, no double spaces
  name: z.string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must not exceed 50 characters")
    .regex(/^[a-zA-Z\u0600-\u06FF\s]+$/, "Only letters and spaces are allowed")
    .refine(val => !/\s\s+/.test(val), "Consecutive spaces are not allowed"),

  // 2. Email: Standard format
  email: z.string()
    .min(1, "Email address is required")
    .email("Invalid email format"),

  // 3. Job Title: Optional but must be a string if provided
  job_title: z.string().optional(),

  // 4. Password: The "Fort Knox" validation
  password: z.string()
    .min(8, "Minimum 8 characters required")
    .max(64, "Password is too long")
    .regex(/[A-Z]/, "At least one uppercase letter (A-Z) is required")
    .regex(/[a-z]/, "At least one lowercase letter (a-z) is required")
    .regex(/[0-9]/, "At least one digit (0-9) is required")
    .regex(/[^A-Za-z0-9]/, "At least one special character (!@#$...) is required")
    .refine(val => !/\s/.test(val), "Spaces are not allowed in passwords"),

  // 5. Confirm Password
  confirmPassword: z.string()
    .min(1, "Please confirm your password"),

}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], 
});

export type SignUpFormData = z.infer<typeof signUpSchema>;