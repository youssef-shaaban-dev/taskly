import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProjectTask, TaskStatus } from "@/components/features/dashboard/projects/tasks/types";

interface TasksState {
  tasks: ProjectTask[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  isLoading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<ProjectTask[]>) => {
      const newTasks = action.payload;
      const filteredExisting = state.tasks.filter(
        (existing) => !newTasks.some((newTask) => newTask.id === existing.id)
      );
      state.tasks = [...filteredExisting, ...newTasks];
    },
    clearTasks: (state) => {
      state.tasks = [];
    },
    updateTaskStatusOptimistic: (
      state,
      action: PayloadAction<{ id: string; status: TaskStatus }>
    ) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.status = action.payload.status;
      }
    },
  },
});

export const { setTasks, clearTasks, updateTaskStatusOptimistic } = taskSlice.actions;
export default taskSlice.reducer;
