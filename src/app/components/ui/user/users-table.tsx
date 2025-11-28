// app/admin/users/page.tsx
"use client";

import { useCallback, useMemo, useState, useEffect } from "react";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { toast } from "sonner";

import { User } from "@/types/user";
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "@/services/user";
import DataTable from "@/components/ui/DataTable/DataTable";
import { getUsersColumns } from "@/components/ui/user/user-columns";
import { DefaultColumn } from "@/components/ui/user/default-column";
import LoadingScreen from "../../LoadingScreen";
import { PlusCircle, SearchIcon, AlertCircle } from "lucide-react";
import AddUserDialog from "@/components/ui/user/add-user-dialog";
import { createAddressesBulk } from "@/services/address";
import { createPerson } from "@/services/person";
import { createContactsBulk } from "@/services/contact";
import { Person } from "@/types/person";
import { Contact } from "@/types/contact";
import { Address } from "@/types/address";

export default function UsersTable() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [sortBy] = useState<string>("username");
  const [sortOrder] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [open, setOpen] = useState(false);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset to first page when searching
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const fetcherUsers = async () => {
    const res = await getAllUsers(
      page,
      pageSize,
      sortBy,
      sortOrder,
      debouncedSearch,
    );
    return res.data;
  };
  const {
    data: users,
    error,
    isLoading,
    mutate,
  } = useSWR(
    ["getusers", page, pageSize, sortBy, sortOrder, debouncedSearch],
    fetcherUsers,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    },
  );

  const onDelete = useCallback(
    async (user: User) => {
      try {
        const deletedUser = await deleteUser(user.id!);
        if (!deletedUser) {
          toast.error(`Error deleting user`);
          return;
        }
        toast.success("User deleted successfully!");
        mutate(); // Refresh the user list after deletion
      } catch (error) {
        toast.error((error as Error).message || "Delete failed");
      }
    },
    [mutate],
  );

  const onEdit = useCallback(
    async (user: User) => {
      try {
        const updatedUser = await updateUser(user.id!, user);
        if (!updatedUser) {
          toast.error(`Error updating user`);
          return;
        }
        toast.success("User updated successfully!");
        mutate(); // Refresh the user list after update
      } catch (error) {
        toast.error((error as Error).message || "Update failed");
      }
    },
    [mutate],
  );

  const handleCreateUser = async (newUser: User) => {
    try {
      const person: Person = newUser.person!;

      if (newUser.person) {
        const personRes = await createPerson({
          ...person,
        });

        if (!personRes.success) {
          toast.error(`Error creating person: ${personRes.message}`);
          return;
        }

        const userRes = await createUser({
          ...newUser,
          person,
          personId: personRes.data.id,
        });

        if (!userRes) {
          toast.error(`Error creating user`);
          return;
        }

        const { addresses = [] as Address[], contacts = [] as Contact[] } =
          newUser.person;

        const addressesWithPersonId = addresses.map((addr) => ({
          ...addr,
          personId: personRes.data.id,
        }));
        const contactsWithPersonId = contacts.map((contact) => ({
          ...contact,
          personId: personRes.data.id,
        }));

        const [addressResult, contactResult] = await Promise.all([
          addressesWithPersonId.length > 0
            ? createAddressesBulk(addressesWithPersonId) // Expected to return { success: true, data: Address[] }
            : Promise.resolve({
                success: true,
                data: [] as Address[],
                message: "No addresses to save",
              }),
          contacts.length > 0
            ? createContactsBulk(contactsWithPersonId) // Expected to return { success: true, data: Contact[] }
            : Promise.resolve({
                success: true,
                data: [] as Contact[],
                message: "No contacts to save",
              }),
        ]);

        // Check if bulk inserts were successful
        if (!addressResult.success) {
          toast.error(`Error creating addresses: ${addressResult.message}`);
          return;
        }

        if (!contactResult.success) {
          toast.error(`Error creating contacts: ${contactResult.message}`);
          return;
        }
      }

      toast.success("User created successfully!");
      mutate();
      setOpen(false);
    } catch (error) {
      toast.error((error as Error).message || "Creation failed");
    }
  };

  const columns = useMemo(
    () => getUsersColumns({ onEdit, onDelete }),
    [onDelete, onEdit],
  );

  // Check for connectivity issues
  const isConnectivityError = error?.message?.includes("fetch");
  const hasData = users && users.length > 0;

  // Helper function to generate the pagination items with ellipses
  return (
    <div className="p-6">
      <div className="flex justify-between mb-4 gap-2">
        <div className="flex gap-2">
          <InputGroup>
            <InputGroupInput
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              disabled={isConnectivityError}
            />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
        </div>
        <div>
          <Button
            variant="outline"
            onClick={() => setOpen(true)}
            disabled={isConnectivityError}
          >
            <PlusCircle />
            Add User
          </Button>
          <AddUserDialog
            open={open}
            onClose={() => setOpen(false)}
            onCreateUser={handleCreateUser}
          />
        </div>
      </div>

      {/* Error State - No Connectivity */}
      {isConnectivityError && (
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md w-full text-center">
            <div className="flex justify-center mb-4">
              <AlertCircle className="w-12 h-12 text-red-500" />
            </div>
            <h3 className="text-lg font-semibold text-red-900 mb-2">
              Connection Failed
            </h3>
            <p className="text-red-700 text-sm mb-4">
              Unable to connect to the server. Please check your internet
              connection and try again.
            </p>
            <Button
              variant="outline"
              onClick={() => mutate()}
              className="w-full"
            >
              Retry
            </Button>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && !isConnectivityError && <LoadingScreen />}

      {/* Empty State */}
      {!isLoading && !isConnectivityError && !hasData && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No users found
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              {search
                ? "Try adjusting your search criteria"
                : "Get started by adding a new user"}
            </p>
          </div>
        </div>
      )}

      {/* Data Table */}
      {!isLoading && !isConnectivityError && hasData && (
        <DataTable
          data={users}
          columns={columns}
          defaultColumn={DefaultColumn}
        />
      )}
    </div>
  );
}
