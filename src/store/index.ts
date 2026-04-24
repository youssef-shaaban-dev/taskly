import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user/userSlice";
import uiReducer from "./slices/uiSlice";
import projectsReducer from "./slices/projects/projectSlice";
import epicsReducer from "./slices/epics/epicSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    ui: uiReducer,
    projects: projectsReducer,
    epics: epicsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
