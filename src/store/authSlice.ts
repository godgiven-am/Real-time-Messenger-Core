import {
  createSlice,
  type PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import {
  type AuthResponse,
  type RegisterPayload,
  type LoginPayload,
  authApi,
} from "../services/authApi";

export interface AuthState {
  user: { id: string; email: string; name: string } | null;
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  status: "idle",
  error: null,
};

// Асинхронные действия
export const register = createAsyncThunk<AuthResponse, RegisterPayload>(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await authApi.register(payload);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Регистрация не удалась",
      );
    }
  },
);

export const login = createAsyncThunk<AuthResponse, LoginPayload>(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await authApi.login(payload);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Неверный логин или пароль",
      );
    }
  },
);

export const logout = createAsyncThunk("auth/logout", async () => {
  //запрос на logout на бэкенд
  return Promise.resolve();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.status = "idle";
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
