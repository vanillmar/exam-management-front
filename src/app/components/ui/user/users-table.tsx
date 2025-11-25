// app/admin/users/page.tsx
"use client";

import { useCallback, useMemo, useState, useEffect } from "react";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { toast } from "sonner";

import { User } from "@/types/user";
import { createUser, deleteUser, getAllUsers, updateUser } from "@/services/user";
import DataTable from "@/components/ui/DataTable/DataTable";
import { getUsersColumns } from "@/components/ui/user/user-columns";
import { defaultColumn } from "@/components/ui/user/default-column";
import LoadingScreen from "../../LoadingScreen";
import { PlusCircle, SearchIcon } from "lucide-react";
import AddUserDialog from "@/components/ui/user/add-user-dialog";

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
  const { data: users, isLoading, mutate } = useSWR(
    ["getusers", page, pageSize, sortBy, sortOrder, debouncedSearch],
    fetcherUsers,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    },
  );

  const onDelete = useCallback((user: User) => {
    deleteUser(user.id).then(res => {
      if (!res.success) {
        toast.error(`Error deleting user: ${res.message}`);
        return;
      }
      toast.success('User deleted successfully!');
      mutate(); // Refresh the user list after deletion
    }).catch((error) => {
      toast.error((error as Error).message || "Delete failed");
    });
  }, [mutate]);

  const onEdit = useCallback((user: User) => {
    updateUser(user.id, user).then(res => {
      if (!res.success) {
        toast.error(`Error updating user: ${res.message}`);
        return;
      }
      toast.success('User updated successfully!');
      mutate(); // Refresh the user list after update
    }).catch((error) => {
      toast.error((error as Error).message || "Update failed");
    });
  }, [mutate]);

  const handleCreateUser = async (newUser: Omit<User, 'id' | 'BaseAuditableEntity'>) => {
    // Add logic here, e.g., API call
    createUser(newUser).then(res => {
      if (!res.success) {
        toast.error(`Error creating user: ${res.message}`);
        return;
      }
      toast.success('User created successfully!');
      mutate(); // Refresh the user list after creation
    }).catch((error) => {
      toast.error((error as Error).message || "Creation failed");
    });
  };

  const columns = useMemo(() => getUsersColumns({onEdit, onDelete}), [onDelete, onEdit]);

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
            />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
        </div>
        <div>
        <Button variant="outline" onClick={() => setOpen(true)}>
          <PlusCircle/>
          Add User
        </Button>
        <AddUserDialog
          open={open}
          onClose={() => setOpen(false)}
          onAddUser={handleCreateUser}
        />
        </div>
      </div>
      {isLoading && <LoadingScreen/>}
      {!isLoading && <DataTable data={users ?? []} columns={columns} defaultColumn={defaultColumn}/>}
    </div>
  );
}
