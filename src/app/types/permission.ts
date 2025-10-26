export interface Permission {
  id: number;
  name: string;
  description?: string;
}

export const Permissions = {
  VIEW_USERS: "VIEW_USERS",
  MANAGE_EXAMS: "MANAGE_EXAMS",
  READ_REPORTS: "READ_REPORTS",
};
