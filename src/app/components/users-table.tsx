// app/admin/users/page.tsx
"use client";

import { useCallback, useMemo, useState } from "react";
import useSWR from "swr";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { User } from "@/types/user";
import { getAllUsers } from "@/services/user";
import DataTable from "@/components/ui/DataTable/DataTable";
import { getUsersColumns } from "@/components/ui/user/user-columns";
import { defaultColumn } from "@/components/ui/user/default-column";


export default function UsersTable() {
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [sortBy, setSortBy] = useState<string>("username");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState("");

  const fetcher = async () => {
    const res = await getAllUsers( 
      page,
      pageSize,
      sortBy,
      sortOrder,
      search,
    );
    return res.data;
  };
  const { data, error, isLoading, mutate, isValidating } = useSWR(
    "getusers",
    fetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    },
  );
  const onDelete = useCallback((user: User) => {
    console.log("Delete", user);
  }, []);

  const onEdit = useCallback((user: User) => {
   console.log("Edit", user);
  }, []);

  const columns = useMemo(() => getUsersColumns({onEdit, onDelete}), [onDelete, onEdit]);

  // Helper function to generate the pagination items with ellipses
  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <Input
          placeholder="Search User..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={() => setPage(1)}>Search</Button>
      </div>
      {isLoading && <span>Loading</span>}
      {!isLoading && <DataTable data={data} columns={columns} defaultColumn={defaultColumn}/>}
    </div>
  );
}
