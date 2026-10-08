import axios from "axios";
import { z } from "zod";

const API_URL = "http://localhost:3001/api";

// Payloads для запросов
export type LoginPayload = { email: string; password: string };
export type RegisterPayload = { email: string; password: string; name: string };

type AuthResponse = z.infer<typeof AuthResponseSchema>;

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Перехватчик для токена
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Валидация ответов (Zod)
const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
});

const AuthResponseSchema = z.object({
  user: UserSchema,
  token: z.string(),
});

export const authApi = {
  register: async (data: RegisterPayload): Promise<AuthResponse> => {
    const res = await apiClient.post("/auth/register", data);
    return AuthResponseSchema.parse(res.data);
  },
  login: async (data: LoginPayload): Promise<AuthResponse> => {
    const res = await apiClient.post("/auth/login", data);
    return AuthResponseSchema.parse(res.data);
  },
};
