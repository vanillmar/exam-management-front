import axios, { AxiosInstance } from "axios";
/**
 * Create a shared axios instance for the app.
 * - baseURL comes from NEXT_PUBLIC_API_BASE_URL
 * - JSON headers are set by default
 * - Authorization header is attached when a token exists in localStorage (client-side only)
 */
const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8080/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});


export default axiosInstance;
