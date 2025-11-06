import { Address } from "./address";
import { BaseAuditableEntity } from "./base-aditable-entity";
import { Contact } from "./contact";
import { Response } from "./response";

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
  bio?: string;
  contacts?: Contact[];
  addresses?: Address[];
} & BaseAuditableEntity;

export type PersonResponse = Response<Person>;
export type PersonsResponse = Response<Person[]>;
