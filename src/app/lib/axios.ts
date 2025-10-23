import axios, { AxiosInstance } from "axios";
import { getSession } from "next-auth/react";

/**
 * Create a shared axios instance for the app.
 * - baseURL comes from NEXT_PUBLIC_API_BASE_URL
 * - JSON headers are set by default
 * - Authorization header is attached when a token exists in localStorage (client-side only)
 */
const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8080/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// Request interceptor – add access token before every request
api.interceptors.request.use(async (config) => {
  const session = await getSession();
  const token = session?.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Optional: Response interceptor for error handling (401, 403, etc.)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized. Token may have expired.");
      // Optionally redirect to login or trigger signOut()
    }
    return Promise.reject(error);
  },
);

export default api;
