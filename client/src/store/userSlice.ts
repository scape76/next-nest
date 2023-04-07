import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "@/services/authService";
import $api from "@/server";
import { baseURL } from "@/server";

export const checkAuth = createAsyncThunk("user/checkAuth", async () => {
  const response = await $api.get<AuthResponse>(`${baseURL}/auth/refresh`);
  return response.data;
});

export const login = createAsyncThunk(
  "user/login",
  async (
    { email, password }: { email: string; password: string },
    thunkApi
  ) => {
    const response = await AuthService.login(email, password);
    return response.data;
  }
);

export const register = createAsyncThunk(
  "user/register",
  async (
    { email, password }: { email: string; password: string },
    thunkApi
  ) => {
    const response = await AuthService.registration(email, password);
    return response.data;
  }
);

export interface UserState {
  userData: IUser | null;
  isAuth: boolean;
  error: string;
}

const initialState: UserState = {
  userData: null,
  isAuth: false,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.clear();
      state.isAuth = false;
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(login.fulfilled, (state, action) => {
        // Add user to the state array
        const { user, accessToken } = action.payload;
        localStorage.setItem("token", accessToken);
        state.isAuth = true;
        state.userData = user;
        state.error = "";
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        const { user, accessToken } = action.payload;
        localStorage.setItem("token", accessToken);
        state.isAuth = true;
        state.userData = user;
        state.error = "";
      })
      .addCase(login.rejected, (state, action) => {
        const errorStatus = action.error.message?.split(" ").pop();
        
        if (errorStatus === "401") {
          state.error = "User with such email wasn't found";
        }
        if (errorStatus === "400") {
          state.error = "Password is incorrect";
        }
      })
      .addCase(register.rejected, (state, action) => {
        const errorStatus = action.error.message?.split(" ").pop();
        
        if (errorStatus === "400") {
          state.error = "User with such email already exists";
        }
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
