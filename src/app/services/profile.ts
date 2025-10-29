import { getUsersById, updateUser } from "./user";
import { getPrincipalAddressesByUserId, updateAddress } from "./address";
import { getAllContactsByUserId, updateContacts } from "./contact";
import { Contact } from "@/types/contact";
import User, { UUID } from "@/types/user";
import { Address } from "@/types/address";
import { getPersonByUserId, updatePerson } from "./person";
import { Person } from "@/types/person";

export const getUserProfile = async (userId: UUID) => {
   const [userRes, personRes, addressRes, contactsRes] = await Promise.all([
    getUsersById(userId),
    getPersonByUserId(userId),
    getPrincipalAddressesByUserId(userId),
    getAllContactsByUserId(userId),
  ])
    return {
    userRes,
    personRes,
    address: addressRes,
    contacts: contactsRes,
  };
}

export const updateUserProfile = async (userId: UUID, data: { user: User, person: Person, contacts: Contact, address: Address }) {
    const { user, person, address, contacts } = data;
  // Run multiple requests in parallel
   const [userRes, personRes, addressRes, contactsRes] = await Promise.all([
    updateUser(userId, user),
    updatePerson(person.id, person),
    updateAddress(address.id, address),
    updateContacts(contacts.id, contacts),
  ]);

  // Return the new combined profile
  return {
    ...userRes,
    personRes,
    address: addressRes,
    contacts: contactsRes,
  };
}
