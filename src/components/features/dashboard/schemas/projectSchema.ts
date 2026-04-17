import z from "zod";

export const projectSchema = z.object({
  name: z
    .string()
    .min(3, "Project Name must be at least 3 characters.")
    .max(100, "Project Name must not exceed 100 characters."),
  description: z
    .string()
    .max(500, "Description must not exceed 500 characters.")
    .optional(),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
