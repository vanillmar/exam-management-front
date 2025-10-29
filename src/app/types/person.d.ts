import { Address } from "./address";
import { Contact } from "./contact";
import { Response } from "./response";

export type MaritalStatus = "Single" | "Married" | "Divorced" | "Widowed";
export type Gender = "Male" | "female" ;

export type Person = {
  id: number;
  firstName: string;
  lastName: string;
  gender?: Gender;
  dateOfBirth?: Date;
  maritalStatus?: MaritalStatus;
  nationalId?: string;
  bio: string;
  contacts: Contact[];
  addresses: Address[];
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
};

export type PersonResponse = Response<Person>;
export type PersonsResponse = Response<Person[]>;
