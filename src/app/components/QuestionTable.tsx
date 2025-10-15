// app/questions/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  ColumnDef,
} from "@tanstack/react-table";
import {
  Table,
  TextInput,
  Button,
  Pagination,
  TableHead,
  TableHeadCell,
  TableRow,
  TableBody,
  TableCell,
} from "flowbite-react";
import { HiOutlineTrash, HiOutlinePencil } from "react-icons/hi";

import { Question } from "@/types/questions";
import { fetchQuestions } from "./QuestionsSection";

export default function QuestionsTable({ openEditModal, handleDelete }) {
  const [data, setData] = useState<Question[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [sortBy, setSortBy] = useState<string>("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState("");

  const columns = useMemo<ColumnDef<Question>[]>(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "question", header: "Question" },
      { accessorKey: "subjectName", header: "Subject" },
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    manualSorting: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: Math.ceil(total / pageSize),
  });

  // Fetch from API
  useEffect(() => {
    const load = async () => {
      const res = await fetchQuestions({
        page,
        pageSize,
        sortBy,
        sortOrder,
        search,
      });
      setData(res.data);
      setTotal(res.total);
    };
    load();
  }, [page, pageSize, sortBy, sortOrder, search]);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <TextInput
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={() => setPage(1)}>Search</Button>
      </div>

      <Table hoverable>
        <TableHead>
          <TableRow>
            <TableHeadCell>Actions</TableHeadCell>
            <TableHeadCell
              onClick={() => handleSort("id")}
              className="cursor-pointer  w-20"
            >
              ID {sortBy === "id" && (sortOrder === "asc" ? "▲" : "▼")}
            </TableHeadCell>
            <TableHeadCell
              onClick={() => handleSort("question")}
              className="cursor-pointer"
            >
              Question{" "}
              {sortBy === "question" && (sortOrder === "asc" ? "▲" : "▼")}
            </TableHeadCell>
            <TableHeadCell
              onClick={() => handleSort("subjectName")}
              className="cursor-pointer"
            >
              Subject{" "}
              {sortBy === "subjectName" && (sortOrder === "asc" ? "▲" : "▼")}
            </TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          {data.map((q) => (
            <TableRow className="py-2" key={q.id}>
              <TableCell>
                <div className="flex">
                  <Button
                    size="sm"
                    onClick={() => openEditModal(q)}
                    className="mr-2"
                  >
                    <HiOutlinePencil />
                  </Button>
                  <Button
                    size="sm"
                    color="red"
                    onClick={() => handleDelete(q.id)}
                  >
                    <HiOutlineTrash />
                  </Button>
                </div>
              </TableCell>
              <TableCell>{q.id}</TableCell>
              <TableCell className="max-w-xs truncate">{q.question}</TableCell>
              <TableCell>{q.subjectName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-end mt-4">
        {total > 0 && (
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(total / pageSize)}
            onPageChange={(p) => setPage(p)}
          />
        )}
      </div>
    </div>
  );
}
