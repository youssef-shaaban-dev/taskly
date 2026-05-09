import { PayloadAction } from "@reduxjs/toolkit";
import { ProjectTask } from "@/components/features/dashboard/projects/pages/tasks/types";

export interface TasksState {
  tasks: ProjectTask[];
  selectedTask: ProjectTask | null;
  isLoading: boolean;
  error: string | null;
}

export const updateTaskLocally = (
  state: TasksState,
  action: PayloadAction<{ id: string; changes: Partial<ProjectTask> }>
) => {
  const { id, changes } = action.payload;
  
  const taskIndex = state.tasks.findIndex((t) => t.id === id);
  if (taskIndex !== -1) {
    state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...changes };
  }

  if (state.selectedTask && state.selectedTask.id === id) {
    state.selectedTask = { ...state.selectedTask, ...changes };
  }
};