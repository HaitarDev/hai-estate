import { createSlice } from "@reduxjs/toolkit";

export interface User {
  username?: string;
  email: string;
  avatar?: string;
}

export interface CounterState {
  user: User | null;
  loading: boolean;
  error: string;
}

const initialState: CounterState = {
  user: null,
  loading: false,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
      state.error = "";
    },
    successUser: (state, action) => {
      state.loading = false;
      state.error = "";
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoading, successUser, setError } = userSlice.actions;

export default userSlice.reducer;
