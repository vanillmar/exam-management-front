import { Response } from "./response";

export type Contact = {
  id: number;
  phoneNumber: string;
  email: string;
  alternateEmail: string | null;
  emergencyContactName: string | null;
  emergencyContactPhone: string | null;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
};

export type ContactResponse = Response<Contact>;
export type ContactsResponse = Response<Contact[]>;
