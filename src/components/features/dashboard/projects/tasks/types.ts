import { UserSummary } from "../epics/types";

export const TASK_STATUSES = [
  "TO_DO",
  "IN_PROGRESS",
  "BLOCKED",
  "IN_REVIEW",
  "READY_FOR_QA",
  "REOPENED",
  "READY_FOR_PRODUCTION",
  "DONE",
] as const;

export type TaskStatus = typeof TASK_STATUSES[number];

export const formatStatusForUI = (status: string) => {
  return status.replace(/_/g, " ");
};

export interface ProjectTask {
  id: string;
  project_id: string;
  epic_id?: string | null;
  title: string;
  description?: string;
  status: TaskStatus | string;
  created_at: string;
  due_date?: string;
  task_id: string;
  epic?: {
    id: string;
    title: string;
    epic_id: string;
  } | null;
  created_by?: UserSummary;
  assignee?: UserSummary | null;
}
export interface CreateTaskPayload {
  project_id: string;
  epic_id?: string;
  title: string;
  description?: string;
  assignee_id?: string;
  due_date?: string;
  status?: string;
}
