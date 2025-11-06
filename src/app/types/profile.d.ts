import { Person } from "./person";
import User from "./user";
import { Contact } from "./contact";
import { Address } from "./address";
export type Profile = {
  user: Omit<User, 'roles'>;
  person: Omit<Person, 'Contacts', 'Addresses'>;
  contact: Contact;
  address: Address;
};
