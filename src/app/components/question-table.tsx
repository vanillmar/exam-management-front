"use client";

import * as React from "react";
import useSWR from "swr";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Question } from "@/types/questions";
import {
  createQuestion,
  deleteQuestion,
  getAllQuestions,
  updateQuestion,
} from "@/services/questions";
import { toast } from "sonner";

const fetcher = async () => {
  const res = await getAllQuestions();
  return res.data;
};
interface QuestionsTableProps {
  initialQuestions?: Question[];
}

export function QuestionsTable({ initialQuestions }: QuestionsTableProps) {
  const {
    data: questions = [],
    mutate,
    isLoading,
  } = useSWR<Question[]>("all-questions", fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    fallbackData: initialQuestions,
  });
  const [formData, setFormData] = React.useState<Partial<Question>>({});
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState<number | null>(null);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const handleEdit = (question: Question) => {
    setFormData(question);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setFormData({});
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (deleteId === null) return;

    const idToDelete = deleteId;
    setDeleteId(null);
    try {
      const response = await deleteQuestion(idToDelete);
      if (!response.success) {
        throw new Error("Delete failed");
      }
      await mutate(
        (currentQuestions: Question[] | undefined) =>
          currentQuestions?.filter((q) => q.id !== idToDelete) ?? [],
        { revalidate: false },
      );
      // No need to mutate again if successful, as local state is already updated
    } catch (error) {
      // Rollback on error by revalidating
      mutate();
      if (error instanceof Error) {
        toast.error(`Error deleting question. ${error.message}`);
      } else {
        toast.error("Error deleting question.");
      }
    }
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const options = e.target.value
      .split(",")
      .map((opt) => opt.trim())
      .filter((opt) => opt);
    setFormData((prev) => ({ ...prev, options }));
  };

  const handleAnswerIndexChange = (value: string) => {
    setFormData((prev) => ({ ...prev, answerIndex: parseInt(value, 10) }));
  };

  const handleSave = async () => {
    if (
      !formData.question ||
      !formData.options ||
      formData.answerIndex === undefined ||
      !formData.subjectId ||
      !formData.subjectName
    ) {
      alert("Please fill all fields");
      return;
    }

    const isEdit = isEditing && formData.id !== undefined;
    const tempId = isEdit ? formData.id : -Math.floor(Math.random() * 1000000); // Temporary negative ID for new questions
    const optimisticQuestion: Question = {
      ...formData,
      id: tempId,
    } as Question;

    // Optimistic update
    await mutate(
      (currentQuestions: Question[] | undefined) => {
        if (isEdit) {
          return (
            currentQuestions?.map((q) =>
              q.id === formData.id ? optimisticQuestion : q,
            ) ?? []
          );
        } else {
          return [...(currentQuestions ?? []), optimisticQuestion];
        }
      },
      { revalidate: false },
    );

    try {
      let response;
      let newQuestion: Question;
      if (isEdit) {
        response = await updateQuestion(formData.id!, {
          question: formData.question,
          options: formData.options,
          answerIndex: formData.answerIndex,
          subjectId: formData.subjectId,
        });
        if (!response.success) throw new Error("Update failed");
        newQuestion = response.data; // Assume API returns the updated question
      } else {
        response = await createQuestion({
          question: formData.question,
          options: formData.options,
          answerIndex: formData.answerIndex,
          subjectId: formData.subjectId,
        });
        if (!response.success) throw new Error("Create failed");
        newQuestion = response.data; // Assume API returns the new question with ID
      }

      // Update cache with real data from server
      await mutate(
        (currentQuestions: Question[] | undefined) => {
          return (
            currentQuestions?.map((q) => (q.id === tempId ? newQuestion : q)) ??
            []
          );
        },
        { revalidate: false },
      );

      setIsDialogOpen(false);
      setFormData({});
    } catch (error) {
      // Rollback on error
      mutate();
      if (error instanceof Error) {
        toast.error(`Error saving question. ${error.message}`);
      } else {
        toast.error(`Error saving question.`);
      }
    }
  };

  const columns: ColumnDef<Question>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <div>{row.getValue("id")}</div>,
    },
    {
      accessorKey: "question",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Question
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("question")}</div>,
    },
    {
      id: "options",
      header: "Options",
      cell: ({ row }) => row.original.options.join(", "),
    },
    {
      accessorKey: "answerIndex",
      header: "Answer Index",
      cell: ({ row }) => <div>{row.getValue("answerIndex")}</div>,
    },
    {
      accessorKey: "subjectName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Subject
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("subjectName")}</div>,
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleEdit(row.original)}
          >
            Edit
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(row.original.id)}
              >
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={confirmDelete}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ),
      enableHiding: false,
    },
  ];

  const table = useReactTable({
    data: questions,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (isLoading) {
    return <div>Loading questions...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Button onClick={handleAdd}>Add Question</Button>
        <Input
          placeholder="Search questions..."
          value={
            (table.getColumn("question")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("question")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Question" : "Add Question"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="question">Question</Label>
              <Input
                id="question"
                name="question"
                value={formData.question || ""}
                onChange={handleFormChange}
              />
            </div>
            <div>
              <Label htmlFor="options">Options (comma-separated)</Label>
              <Textarea
                id="options"
                name="options"
                value={formData.options?.join(", ") || ""}
                onChange={handleOptionsChange}
              />
            </div>
            <div>
              <Label htmlFor="answerIndex">Answer Index</Label>
              <Select
                value={formData.answerIndex?.toString() || ""}
                onValueChange={handleAnswerIndexChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select index" />
                </SelectTrigger>
                <SelectContent>
                  {formData.options?.map((key, index) => (
                    <SelectItem key={key} value={index.toString()}>
                      {index}
                    </SelectItem>
                  )) || []}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="subjectId">Subject ID</Label>
              <Input
                id="subjectId"
                name="subjectId"
                type="number"
                value={formData.subjectId || ""}
                onChange={handleFormChange}
              />
            </div>
            <div>
              <Label htmlFor="subjectName">Subject Name</Label>
              <Input
                id="subjectName"
                name="subjectName"
                value={formData.subjectName || ""}
                onChange={handleFormChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
