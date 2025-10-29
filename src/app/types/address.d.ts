import { Response } from "./response";

export type Address = {
  id: number;
  street: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  isPrimary: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
};

export type AddressResponse = Response<Address>;
export type AddressesResponse = Response<Address[]>;