import { apiRequest } from "@/lib/axios";
import { Person, PersonResponse, PersonsResponse } from "@/types/person";
import { UUID } from "@/types/user";

export const getPersonByUserId = async (id: UUID) => {
  const response = await apiRequest<PersonResponse>(`/persons/user/${id}`, {
    method: "GET",
  });
  if (!response.success) {
    throw new Error(`Failed to fetch person. ${response.message}`);
  }
  return response.data;
};

export const getPersonById = async (id: number) => {

  const response = await apiRequest<PersonResponse>(`/persons/${id}`, {
    method: "GET",
  });

  if (!response.success) {
    throw new Error(`Failed to fetch person. ${response.message}`);
  }
  return response.data;
};

export const getAllPersons = async () => {
  const response = await apiRequest<PersonsResponse>(`/persons`, {
    method: "GET",
  });
  if (!response.success) {
    throw new Error(`Failed to fetch persons. ${response.message}`);
  }
  return response.data;
};

export const createPerson = async (data: Person) => {
  const response = await apiRequest<PersonResponse>(`/persons`, {
    method: "POST",
    data: data,
  });
  if (!response.success) {
    throw new Error(`Failed to create new person. ${response.message}`);
  }
  return response.data;
};

export const updatePerson = async (id: number, data: Person) => {
  const response = await apiRequest<PersonResponse>(`/persons/${id}`, {
    method: "PUT",
    data: data,
  });
  if (!response.success) {
    throw new Error(`Failed to update person. ${response.message}`);
  }
  return response.data;
};

export const deletePerson = async (id: number) => {
  const response = await apiRequest<PersonResponse>(`/persons/${id}`, {
    method: "DELETE",
  });
  if (!response.success) {
    throw new Error(`Failed to delete user. ${response.message}`);
  }
  return response.data;
};
