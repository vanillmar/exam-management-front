import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types/user";
import DataTableRowActions from "@/components/ui/DataTable/DataTableRowActions";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";

interface UserColumnsProps {
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export const getUsersColumns = ({
  onEdit,
  onDelete,
}: UserColumnsProps): ColumnDef<User>[] => [
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
    cell: ({ row }) => {
      return <span>{row.original.id}</span>;
    },
    size: 350,
  },
  { accessorKey: "username", header: "Username" },
  { accessorKey: "email", header: "E-mail" },
  {
    accessorKey: "avatar",
    header: "Avatar",
    cell: ({ row }) => {
      const avatar = row.original.avatar;
      if (avatar)
        return (
          <Avatar className="w-8 h-8" key={row.original.id}>
            <AvatarImage
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${row.original.avatar}`}
            />
            <AvatarFallback>{row.original.username}</AvatarFallback>
          </Avatar>
        );
      return "-";
    },
  },
  {
    accessorKey: "notifications",
    header: "Notifications",
    cell: ({ row }) => {
      const initialStatus = row.original.notifications;
      const handleToggle = (checked: boolean) => {
        // Implement your logic here to update the status in your data source
        console.log(`Row ${row.original.id} status changed to: ${checked}`);
        // You might dispatch an action, make an API call, or update local state
      };
      return (
        <Switch
          key={row.original.id}
          defaultChecked={initialStatus}
          onCheckedChange={handleToggle}
          aria-label={`Toggle status for ${row.original.notifications}`}
        />
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />
    ),
  },
];
