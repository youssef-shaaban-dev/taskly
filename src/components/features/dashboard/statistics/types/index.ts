export interface CalendarStatsParams {
  p_start_date: string;
  p_end_date: string;
  p_project_id?: string | null;
  p_status?: string | null;
}

export interface DailyStat {
  day: string;
  statuses: Record<string, number>;
}

export interface CalendarStatsResponse {
  daily: DailyStat[];
  totals: Record<string, number>;
  total_tasks: number;
  done_tasks: number;
  overdue_tasks: number;
}

export interface ProjectCountParams {
  p_start_date: string;
  p_end_date: string;
}

export interface ProjectCountResponse {
  project_id: string;
  project_name: string;
  tasks_count: number;
}

export enum TaskStatusEnum {
  TO_DO = "TO_DO",
  IN_PROGRESS = "IN_PROGRESS",
  BLOCKED = "BLOCKED",
  IN_REVIEW = "IN_REVIEW",
  READY_FOR_QA = "READY_FOR_QA",
  REOPENED = "REOPENED",
  READY_FOR_PRODUCTION = "READY_FOR_PRODUCTION",
  DONE = "DONE",
}
