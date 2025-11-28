import { apiRequest } from "@/lib/api";
import { Address, AddressResponse, AddressesResponse } from "@/types/address";
import { UUID } from "@/types/user";

export const getAddressById = async (id: number) => {
  const response = await apiRequest<AddressResponse>(`/addresses/${id}`, {
    method: "GET",
  });
  if (!response.success) {
    throw new Error(`Failed to fetch address. ${response.message}`);
  }
  return response.data;
};

export const getAllAddressesByPersonId = async (id: number) => {
  const response = await apiRequest<AddressesResponse>(
    `/addresses/person/${id}`,
    { method: "GET" },
  );
  if (!response.success) {
    throw new Error(`Failed to fetch address. ${response.message}`);
  }
  return response.data;
};

export const getAllAddressesByUserId = async (id: UUID) => {
  const response = await apiRequest<AddressesResponse>(
    `/addresses/user/${id}`,
    { method: "GET" },
  );
  if (!response.success) {
    throw new Error(`Failed to fetch address. ${response.message}`);
  }
  return response.data;
};

export const getPrincipalAddressByUserId = async (id: UUID) => {
  const response = await apiRequest<AddressResponse>(
    `/addresses/primary/user/${id}`,
    { method: "GET" },
  );
  if (!response.success) {
    throw new Error(`Failed to fetch address. ${response.message}`);
  }
  return response.data;
};

export const getAllAddresses = async () => {
  const response = await apiRequest<AddressesResponse>(`/addresses`, {
    method: "GET",
  });
  if (!response.success) {
    throw new Error(`Failed to fetch addresses. ${response.message}`);
  }
  return response.data;
};

export const createAddress = async (addressData: Address) => {
  const response = await apiRequest<AddressResponse>(`/addresses`, {
    method: "POST",
    data: addressData,
  });
  if (!response.success) {
    throw new Error(`Failed to create new address. ${response.message}`);
  }
  return response.data;
};

export const createAddressesBulk = async (addresses: Omit<Address, "id">[]) => {
  const response = await apiRequest<AddressesResponse>(`/addresses/bulk`, {
    method: "POST",
    data: addresses,
  });
  if (!response.success) {
    throw new Error(`Failed to create addresses in bulk. ${response.message}`);
  }
  return response;
};

export const updateAddress = async (id: number, addressData: Address) => {
  const response = await apiRequest<AddressResponse>(`/addresses/${id}`, {
    method: "PUT",
    data: addressData,
  });
  if (!response.success) {
    throw new Error(`Failed to update address. ${response.message}`);
  }
  return response.data;
};

export const deleteAddress = async (id: number) => {
  const response = await apiRequest<AddressResponse>(`/addresses/${id}`, {
    method: "DELETE",
  });
  if (!response.success) {
    throw new Error(`Failed to delete user. ${response.message}`);
  }
  return response.data;
};
