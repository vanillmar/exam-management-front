import axios, { AxiosInstance } from "axios";
import { getSession, signOut } from "next-auth/react";

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

const api: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
  withCredentials: true,
});

export async function apiRequest<T>(
  endpoint: string,
  options?: {
    headers?: Record<string, string>;
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    data?: unknown;
    params?: Record<string, unknown>;
  },
): Promise<T> {
  const res = await api.request<T>({
    url: endpoint,
    headers: options?.headers || {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    method: options?.method || "GET",
    data: options?.data,
    params: options?.params,
  });
  return res.data;
}

api.interceptors.request.use(async (config) => {
  const session = await getSession();
  const token = session?.accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and not retrying yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => {
            throw err;
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const session = await getSession();
        if (!session?.refreshToken) throw new Error("No refresh token");

        // Ask your backend to refresh the token
        const response = await api.post(`/auth/refresh-token`, {
          refreshToken: session.refreshToken,
        });

        const newToken = response.data.token;

        // You may want to update the session (client-side) here
        session.accessToken = newToken;

        processQueue(null, newToken);
        isRefreshing = false;

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        isRefreshing = false;
        signOut(); // Force logout
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
