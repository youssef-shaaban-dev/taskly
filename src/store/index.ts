import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user/userSlice";
import uiReducer from "./slices/uiSlice";
import tasksReducer from "./slices/tasks/taskSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    ui: uiReducer,
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
