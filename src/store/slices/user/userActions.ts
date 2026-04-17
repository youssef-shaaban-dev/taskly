import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "@/utils/apiClient";
import Cookies from "js-cookie";

//  Fetch User Thunk
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient("/auth/v1/user", { method: "GET" });
      if (!response.ok) throw new Error("Could not fetch user data");
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message || "An error occurred");
    }
  },
);

//  Logout User Thunk
export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient("/auth/v1/logout", {
        method: "POST",
      });

      if (!response.ok) throw new Error("Logout failed on server");

      Cookies.remove("access_token");
      Cookies.remove("refresh_token");

      return true;
    } catch (error: any) {
      return rejectWithValue(
        error.message || "Logout failed, please try again.",
      );
    }
  },
);
