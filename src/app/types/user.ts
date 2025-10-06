export interface Permission {
  id: number;
  name: string;
  description?: string;
}

export interface Role {
  id: number;
  name: string; // e.g. "ROLE_ADMIN"
  description?: string;
  permissions: Permission[];
}

export default interface User {
  id: number;
  username: string;
  email: string;
  roles: Role[];
}
