import { BaseAuditableEntity } from "./base-aditable-entity";
import { Response } from "./response";

export type Address = {
  id: number;
  street: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  personId?: number | null;
  primary: boolean;
} & BaseAuditableEntity;

export type AddressResponse = Response<Address>;
export type AddressesResponse = Response<Address[]>;
