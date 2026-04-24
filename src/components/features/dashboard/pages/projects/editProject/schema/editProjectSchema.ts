import { z } from "zod";

export const editProjectSchema = z.object({
  name: z
    .string()
    .min(1, "Project title is required")
    .max(100, "Title is too long"),
  description: z
    .string()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),
});

export type EditProjectFormValues = z.infer<typeof editProjectSchema>;
