import axios, { AxiosInstance, AxiosError } from "axios";
import type { InternalAxiosRequestConfig } from "axios";

// Detect runtime environment (Next.js can run on server and client)
const isBrowser = typeof window !== "undefined";

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

// Attach token from localStorage to each request (only in browser)
// api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
//   if (isBrowser) {
//     try {
//       const token = localStorage.getItem("token");
//       if (token) {
//         config.headers = config.headers ?? {};
//         // headers in InternalAxiosRequestConfig may be a complex type so cast to record for assignment
//         (config.headers as Record<string, string>)["Authorization"] =
//           `Bearer ${token}`;
//       }
//     } catch (err) {
//       // localStorage may throw in some browsers or environments; log for debugging
//       console.debug("Failed to read token from localStorage", err);
//     }
//   }
//   return config;
// });

// Global response handler: on 401 remove token and redirect to login (client-side)
// api.interceptors.response.use(
//   (response) => response,
//   (error: AxiosError) => {
//     const status = error?.response?.status;
//     if (status === 401 && isBrowser) {
//       try {
//         localStorage.removeItem("token");
//       } catch (err) {
//         console.debug("Failed to remove token from localStorage", err);
//       }
//       // Redirect to login page. Use location.assign to allow back navigation control by the browser.
//       // window.location.assign("/login");
//     }
//     return Promise.reject(error);
//   },
// );

/**
 * Store auth token in localStorage (client-side).
 * Call this after login to persist the token used by the axios instance.
 */
// export function setAuthToken(token: string) {
//   if (!isBrowser) return;
//   try {
//     localStorage.setItem("token", token);
//     // Also set a non-httpOnly cookie so Next.js middleware (server-side) can read it.
//     try {
//       // 7 days expiry
//       const maxAge = 60 * 60 * 24 * 7;
//       document.cookie = `token=${encodeURIComponent(token)}; path=/; max-age=${maxAge}`;
//     } catch (_err) {
//       // ignore cookie failures (debuggable if needed)
//       console.debug("Failed to set cookie token", _err);
//     }
//   } catch (err) {
//     console.debug("Failed to set token in localStorage", err);
//   }
// }

/** Clear stored auth token. */
// export function clearAuthToken() {
//   if (!isBrowser) return;
//   try {
//     localStorage.removeItem("token");
//     try {
//       // remove cookie by expiring it
//       document.cookie = `token=; path=/; max-age=0`;
//     } catch (_err) {
//       // ignore cookie removal failures (debuggable if needed)
//       console.debug("Failed to remove cookie token", _err);
//     }
//   } catch (err) {
//     console.debug("Failed to clear token from localStorage", err);
//   }
// }

export default api;
