import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user/userSlice";
import uiReducer from "./slices/uiSlice";
import projectsReducer from "./slices/projects/projectSlice";
import epicsReducer from "./slices/epics/epicSlice";
import tasksReducer from "./slices/tasks/taskSlice";
import statisticsReducer from "./slices/statistics/statisticsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    ui: uiReducer,
    projects: projectsReducer,
    epics: epicsReducer,
    tasks: tasksReducer,
    statistics: statisticsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
