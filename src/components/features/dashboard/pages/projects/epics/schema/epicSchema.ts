import { z } from "zod";

export const epicSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().optional(),
  assignee_id: z.string().optional().nullable(),
  deadline: z.string().optional().nullable().refine((val) => {
    if (!val) return true;
    const date = new Date(val);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  }, "Deadline must be today or in the future"),
});

export type EpicFormValues = z.infer<typeof epicSchema>;
