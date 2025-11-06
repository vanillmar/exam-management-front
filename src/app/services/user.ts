import { apiRequest } from "@/lib/axios";
import User, {
  TotalUsersResponse,
  TotalActiveUsersResponse,
  TotalInactiveUsersResponse,
  UserResponse,
  UsersResponse,
  UUID,
  ProfilePictureResponse,
} from "@/types/user";

export const getTotalUsers = async () => {
  const response = await apiRequest<TotalUsersResponse>(`/users/stats/total`);
  if (!response.success) {
    throw new Error(`Failed to fetch total users. ${response.message}`);
  }
  return response.data;
};

export const getTotalActiveUsers = async () => {
  const response = await apiRequest<TotalActiveUsersResponse>(
    `/users/stats/total-active`,
  );
  if (!response.success) {
    throw new Error(`Failed to fetch total active users. ${response.message}`);
  }
  console.log(response);
  return response.data;
};

export const getTotalInactiveUsers = async () => {
  const response = await apiRequest<TotalInactiveUsersResponse>(
    `/users/stats/total-inactive`,
  );
  if (!response.success) {
    throw new Error(
      `Failed to fetch total inactive users. ${response.message}`,
    );
  }
  return response.data;
};

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
    throw new Error(`Failed to fetch user. ${response.message}`);
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

export const createUser = async (data: User) => {
  const response = await apiRequest<UserResponse>(`/users`, {
    method: "POST",
    data: data,
  });
  if (!response.success) {
    throw new Error(`Failed to create user. ${response.message}`);
  }
  return response.data;
};

export const updateUser = async (id: UUID, data: Omit<User, "roles"> ) => {
  const response = await apiRequest<UserResponse>(`/users/${id}`, {
    method: "PUT",
    data: data,
  });
  if (!response.success) {
    throw new Error(`Failed to update user. ${response.message}`);
  }
  return response.data;
};

export const updateAvatar = async (id: string, file: FormData) => {
  const response = await apiRequest<ProfilePictureResponse>(
    `/users/${id}/upload-profile-picture`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
      method: "POST",
      data: file,
    },
  );
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
