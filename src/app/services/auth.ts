import { apiRequest } from "@/lib/api";
import { AuthResponseDTO } from "@/types/auth";

export const registerUser = async (
  username: string,
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  roleId: string,
  enabled: boolean,
) => {
  const response = await apiRequest<AuthResponseDTO>(`/auth/register`, {
    method: "POST",
    data: {
      username,
      firstname,
      lastname,
      email,
      password,
      roleId,
      enabled,
    },
  });
  if (!response.success) {
    throw new Error(`Failed to register user. ${response.message}`);
  }
  return response;
};

export const login = async (username: string, password: string) => {
  const response = await apiRequest<AuthResponseDTO>(`/auth/login`, {
    method: "POST",
    data: { username, password },
  });
  if (!response.success) {
    throw new Error(`Failed to login. ${response.message}`);
  }
  return response.data;
};

export const refreshToken = async (refreshToken: string) => {
  const response = await apiRequest<AuthResponseDTO>(`/auth/refresh-token`, {
    method: "POST",
    data: { refreshToken },
  });
  if (!response.success) {
    throw new Error(`Failed to refresh token. ${response.message}`);
  }
  return response.data;
};
