import axios from 'axios';
import { z } from 'zod';

const API_URL = 'http://localhost:3001/api';

export type LoginPayload = { email: string; password: string };
export type RegisterPayload = { email: string; password: string; name: string };

const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
});

const AuthResponseSchema = z.object({
  token: z.string(),
  user: UserSchema,
});

export type AuthResponse = z.infer<typeof AuthResponseSchema>;

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer \${token}`;
  }
  return config;
});

export const authApi = {
  register: async (data: RegisterPayload): Promise<AuthResponse> => {
    const res = await apiClient.post('/auth/register', data);
    return AuthResponseSchema.parse(res.data);
  },
  login: async (data: LoginPayload): Promise<AuthResponse> => {
    const res = await apiClient.post('/auth/login', data);
    return AuthResponseSchema.parse(res.data);
  },
};
