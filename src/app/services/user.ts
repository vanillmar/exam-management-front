import { apiRequest } from "@/lib/axios";
import { Role, UserResponse, UsersResponse, UUID } from "@/types/user";

export const getAllUsers = async () => {
  const response = await apiRequest<UsersResponse>(`/users`);
  if (!response.success) {
    throw new Error(`Failed to fetch users. ${response.message}`);
  }
  return response.data;
};

export const getUsersById = async (id: UUID) => {
  const response = await apiRequest<UserResponse>(`/users/${id}`);
  if (!response.success) {
    throw new Error(`Failde to fetch user. ${response.message}`);
  }
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await apiRequest<UserResponse>(`/users/me`);
  if (!response.success) {
    throw new Error(`Failed to fetch current user. ${response.message}`);
  }
  return response.data;
};

export const createUser = async (userData: {
  username: string;
  email: string;
  password: string;
  enabled: boolean;
  roles: Role[];
}) => {
  const response = await apiRequest<UserResponse>(`/users`, {
    method: "POST",
    data: userData,
  });
  if (!response.success) {
    throw new Error(`Failed to create user. ${response.message}`);
  }
  return response.data;
};

export const updateUser = async (
  id: UUID,
  userData: {
    username?: string;
    email?: string;
    password?: string;
    enabled?: boolean;
    roles?: Role[];
  },
) => {
  const response = await apiRequest<UserResponse>(`/users/${id}`, {
    method: "PUT",
    data: userData,
  });
  if (!response.success) {
    throw new Error(`Failed to update user. ${response.message}`);
  }
  return response.data;
};

export const deleteUser = async (id: UUID) => {
  const response = await apiRequest<UserResponse>(`/users/${id}`, {
    method: "DELETE",
  });
  if (!response.success) {
    throw new Error(`Failed to delete user. ${response.message}`);
  }
  return response.data;
};
