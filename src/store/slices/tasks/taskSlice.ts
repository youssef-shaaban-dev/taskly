import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProjectTask } from "@/components/features/dashboard/projects/pages/tasks/types";

export interface TasksState {
  tasks: ProjectTask[];
  selectedTask: ProjectTask | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  selectedTask: null,
  isLoading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<ProjectTask[]>) => {
      state.tasks = action.payload;
    },
    setSelectedTask: (state, action: PayloadAction<ProjectTask | null>) => {
      state.selectedTask = action.payload;
    },
    updateTaskLocally: (
      state,
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
    }
  }
});

export const { setTasks, setSelectedTask, updateTaskLocally } = taskSlice.actions;
export default taskSlice.reducer;