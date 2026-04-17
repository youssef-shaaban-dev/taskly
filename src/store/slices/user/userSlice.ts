import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUser, logoutUser } from "./userActions"; 

interface UserData {
  user_metadata: {
    name: string;
    department: string;
  };
  email: string;
}

interface UserState {
  user: UserData | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch User Cases
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Logout Cases
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null; 
        state.loading = false;
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;