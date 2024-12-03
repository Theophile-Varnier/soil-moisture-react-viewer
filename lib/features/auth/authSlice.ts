import { User } from "@/lib/api/smApi";
import { RootState } from "@/lib/store";
import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  user: User | null;
  env: "dev" | "staging" | "prod" | "localhost";
  apiKey: string;
}

export const envs = {
  dev: "http://54.216.158.69",
  staging: "https://api-landbanking-dta.lobelia.earth",
  prod: "https://api-landbanking.lobelia.earth",
  localhost: "http://localhost:8000",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    env: "dev",
    apiKey: "",
  } as AuthState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAuth: (state, action) => {
      state.env = action.payload.env;
      state.apiKey = action.payload.apiKey;
    },
  },
});

export const { setUser, setAuth } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
