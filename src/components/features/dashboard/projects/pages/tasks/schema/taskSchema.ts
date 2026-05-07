import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title is too long"),
  epic_id: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  assignee_id: z.string().nullable().optional(),
  due_date: z.string().nullable().optional(),
  status: z.enum([
    "TO_DO",
    "IN_PROGRESS",
    "BLOCKED",
    "IN_REVIEW",
    "READY_FOR_QA",
    "REOPENED",
    "READY_FOR_PRODUCTION",
    "DONE",
  ]),
});

export type TaskFormValues = z.infer<typeof taskSchema>;
