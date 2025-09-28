import { AuthResponseDTO, ResponseDTO } from "@/types/auth";
import { setAuthToken } from "@/lib/axios";
import axios from "axios";

const isBrowser = typeof window !== "undefined";

const hasToken = (resp: ResponseDTO | AuthResponseDTO): boolean => {
  // Type guard to check if resp is AuthResponse
  if ("token" in resp) {
    // Ensure token is a non-empty string
    return typeof resp.token === "string" && resp.token.length > 0;
  }
  return false;
};

// Helper to persist user and token
const persistAuth = (respData: ResponseDTO | AuthResponseDTO) => {
  if ("username" in respData && typeof respData.username === "string") {
    localStorage.setItem("fedjtech_user", respData.username);
  }
  if ("token" in respData && typeof respData.token === "string") {
    setAuthToken(respData.token);
  }
};

// Helper to extract error message from axios error
const extractErrorMessage = (err: unknown): string => {
  if (
    axios.isAxiosError(err) &&
    err.response &&
    typeof err.response.data === "object"
  ) {
    const data = err.response.data as Record<string, unknown>;
    if (typeof data.message === "string") return data.message;
    if (typeof data.error === "string") return data.error;
  }
  return "Invalid username or password";
};

export { isBrowser, hasToken, persistAuth, extractErrorMessage };
