export const COOKIES = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
} as const;

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  CALLBACK: "/callback",
  PROJECTS: "/project",
  ADD_PROJECT: "/projects/add",
  MONITORING: "/monitoring",
  INVENTORY: "/inventory",
  GROUPS: "/groups",
  DETAILS: "/details",
} as const;

export const API_ENDPOINTS = {
  USER: "/auth/v1/user",
  LOGOUT: "/auth/v1/logout",
  AUTH_TOKEN: "/auth/v1/token",
  AUTH_RECOVER: "/auth/v1/recover",
  GET_PROJECTS: "/rest/v1/rpc/get_projects",
  CREATE_PROJECT: "/rest/v1/projects",
  UPDATE_PROJECT: "/rest/v1/projects",
  PROJECT_MEMBERS: "/rest/v1/get_project_members",
  EPICS: "/rest/v1/epics",
  PROJECT_EPICS: "/rest/v1/project_epics",
} as const;
