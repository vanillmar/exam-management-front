import { Address } from "@/types/address";
import { BaseAuditableEntity } from "@/types/base-aditable-entity";
import { Contact } from "@/types/contact";
import { Response } from "@/types/response";
import { UUID } from "@/types/user";

export type MaritalStatus = "SINGLE" | "MARRIED" | "DIVORCED" | "WIDOWED";
export type Gender = "MALE" | "FEMALE";

export type Person = {
  id?: number;
  firstName: string;
  lastName: string;
  gender?: Gender;
  dateOfBirth?: string;
  maritalStatus?: MaritalStatus;
  nationalId?: string;
  userId?: UUID;
  bio?: string;
  contacts?: Contact[];
  addresses?: Address[];
} & BaseAuditableEntity;

export type PersonResponse = Response<Person>;
export type PersonsResponse = Response<Person[]>;
