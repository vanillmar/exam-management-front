import { deleteUser, getUsersById, updateUser } from "./user";
import {
  deleteAddress,
  getPrincipalAddressByUserId,
  updateAddress,
} from "./address";
import {
  deleteContacts,
  getPrincipalContactsByUserId as getPrincipalContactByUserId,
  updateContacts,
} from "./contact";
import { UUID } from "@/types/user";
import { deletePerson, getPersonByUserId, updatePerson } from "./person";
import { Profile } from "@/types/profile";

export const getUserProfile = async (userId: UUID) => {
  const [userRes, personRes, addressRes, contactsRes] = await Promise.all([
    getUsersById(userId),
    getPersonByUserId(userId),
    getPrincipalAddressByUserId(userId),
    getPrincipalContactByUserId(userId),
  ]);
  return {
    user: userRes,
    person: personRes,
    address: addressRes,
    contact: contactsRes,
  } as Profile;
};

export const updateUserProfile = async (userId: UUID, data: Profile) => {
  const { user, person, address, contact } = data;
  // Run multiple requests in parallel
  const [userRes, personRes, addressRes, contactsRes] = await Promise.all([
    updateUser(userId, user),
    updatePerson(person.id, person),
    updateAddress(address.id, address),
    updateContacts(contact.id, contact),
  ]);

  // Return the new combined profile
  return {
    user: userRes,
    person: personRes,
    address: addressRes,
    contact: contactsRes,
  } as Profile;
};

export const deleteUserProfile = async (userId: UUID, data: Profile) => {
  const { person, address, contact } = data;
  // Run multiple requests in parallel
  const [userRes, personRes, addressRes, contactsRes] = await Promise.all([
    deleteUser(userId),
    deletePerson(person.id),
    deleteAddress(address.id),
    deleteContacts(contact.id),
  ]);

  // Return the new combined profile
  return {
    user: userRes,
    person: personRes,
    address: addressRes,
    contact: contactsRes,
  } as Profile;
};
