import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "@/utils/apiClient";
import Cookies from "js-cookie";
import { COOKIES, API_ENDPOINTS } from "@/constant";

//  Fetch User Thunk
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient(API_ENDPOINTS.USER, { method: "GET" });
      if (!response.ok) throw new Error("Could not fetch user data");
      return await response.json();
    } catch (error) {
      const message = error instanceof Error ? error.message : "An error occurred";
      return rejectWithValue(message);
    }
  },
);

//  Logout User Thunk
export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient(API_ENDPOINTS.LOGOUT, {
        method: "POST",
      });

      if (!response.ok) throw new Error("Logout failed on server");

      Cookies.remove(COOKIES.ACCESS_TOKEN);
      Cookies.remove(COOKIES.REFRESH_TOKEN);

      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Logout failed, please try again.";
      return rejectWithValue(message);
    }
  },
);
