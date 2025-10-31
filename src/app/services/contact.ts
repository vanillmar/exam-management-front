import { apiRequest } from "@/lib/axios";
import { Contact, ContactResponse, ContactsResponse } from "@/types/contact";
import { UUID } from "@/types/user";

export const getContactById = async (id: number) => {
  const response = await apiRequest<ContactResponse>(`/contacts/${id}`, {
    method: "GET",
  });
  if (!response.success) {
    throw new Error(`Failed to fetch contacts. ${response.message}`);
  }
  return response.data;
};

export const getAllContactsByPersonId = async (id: number) => {
  const response = await apiRequest<ContactsResponse>(
    `/contacts/person/${id}`,
    { method: "GET" },
  );
  if (!response.success) {
    throw new Error(`Failed to fetch contacts. ${response.message}`);
  }
  return response.data;
};

export const getAllContactsByUserId = async (id: UUID) => {
  const response = await apiRequest<ContactsResponse>(`/contacts/user/${id}`, {
    method: "GET",
  });
  if (!response.success) {
    throw new Error(`Failed to fetch contacts. ${response.message}`);
  }
  return response.data;
};

export const getPrincipalContactsByUserId = async (id: UUID) => {
  const response = await apiRequest<ContactResponse>(
    `/contacts/primary/user/${id}`,
    { method: "GET" },
  );
  if (!response.success) {
    throw new Error(`Failed to fetch principal contacts. ${response.message}`);
  }
  return response.data;
};

export const getAllContacts = async () => {
  const response = await apiRequest<ContactsResponse>(`/contacts`, {
    method: "GET",
  });
  if (!response.success) {
    throw new Error(`Failed to fetch contact. ${response.message}`);
  }
  return response.data;
};

export const createContacts = async (data: Contact) => {
  const response = await apiRequest<ContactResponse>(`/contacts`, {
    method: "POST",
    data: data,
  });
  if (!response.success) {
    throw new Error(`Failed to create new contact. ${response.message}`);
  }
  return response.data;
};

export const updateContacts = async (id: number, data: Contact) => {
  const response = await apiRequest<ContactResponse>(`/contacts/${id}`, {
    method: "PUT",
    data: data,
  });
  if (!response.success) {
    throw new Error(`Failed to update contact. ${response.message}`);
  }
  return response.data;
};

export const deleteContacts = async (id: number) => {
  const response = await apiRequest<ContactResponse>(`/contacts/${id}`, {
    method: "DELETE",
  });
  if (!response.success) {
    throw new Error(`Failed to delete contact. ${response.message}`);
  }
  return response.data;
};
