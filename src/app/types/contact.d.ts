import { BaseAuditableEntity } from "./base-aditable-entity";
import { Response } from "./response";

export type Contact = {
  id: number;
  phoneNumber: string;
  email: string;
  alternateEmail?: string | null;
  emergencyContactName?: string | null;
  emergencyContactPhone?: string | null;
  personId?: number | null;
  primary: boolean;
} & BaseAuditableEntity;

export type ContactResponse = Response<Contact>;
export type ContactsResponse = Response<Contact[]>;
