// app/questions/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  ColumnDef,
} from "@tanstack/react-table";

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

  // Helper function to generate the pagination items with ellipses
  function getPaginationItems(currentPage: number, totalPages: number) {
    const delta = 1;
    const left = currentPage - delta;
    const right = currentPage + delta + 1;
    const range: number[] = [];

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= left && i < right)) {
        range.push(i);
      }
    }

    const items: (number | "ellipsis")[] = [];
    let prev: number | null = null;

    for (const i of range) {
      if (prev !== null && i - prev !== 1) {
        items.push("ellipsis");
      }
      items.push(i);
      prev = i;
    }

    return items;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <Input
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={() => setPage(1)}>Search</Button>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableHead>Actions</TableHead>
            <TableHead
              onClick={() => handleSort("id")}
              className="cursor-pointer  w-20"
            >
              ID {sortBy === "id" && (sortOrder === "asc" ? "▲" : "▼")}
            </TableHead>
            <TableHead
              onClick={() => handleSort("question")}
              className="cursor-pointer"
            >
              Question{" "}
              {sortBy === "question" && (sortOrder === "asc" ? "▲" : "▼")}
            </TableHead>
            <TableHead
              onClick={() => handleSort("subjectName")}
              className="cursor-pointer"
            >
              Subject{" "}
              {sortBy === "subjectName" && (sortOrder === "asc" ? "▲" : "▼")}
            </TableHead>
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
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (page > 1) setPage(page - 1);
                }}
              />
            </PaginationItem>
            {getPaginationItems(page, Math.ceil(total / pageSize)).map(
              (item, index) => (
                <PaginationItem key={index}>
                  {item === "ellipsis" ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      href="#"
                      isActive={item === page}
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(item);
                      }}
                    >
                      {item}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ),
            )}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (page < Math.ceil(total / pageSize)) setPage(page + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
