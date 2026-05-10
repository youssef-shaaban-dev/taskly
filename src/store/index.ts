import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user/userSlice";
import uiReducer from "./slices/uiSlice";
import epicsReducer from "./slices/epics/epicSlice";
import tasksReducer from "./slices/tasks/taskSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    ui: uiReducer,
    epics: epicsReducer,
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
