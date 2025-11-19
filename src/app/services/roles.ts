import { apiRequest } from "@/lib/api";

import { RolesResponse } from "@/types/role";

export const getRoles = async () => {
  const response = await apiRequest<RolesResponse>(`/auth/roles`, {
    method: "POST",
  });
  if (!response.success) {
    throw new Error(`Failed to fetch roles. ${response.message}`);
  }
  return response.data.roles;
};
