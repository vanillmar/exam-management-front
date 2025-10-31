import { useMemo, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

interface Calendar22Props {
  id: string;
  value?: Date | string | undefined;
  onChange: (e: { target: { id: string; value: Date | undefined } }) => void;
}

export default function Calendar22({
  id,
  value,
  onChange,
}: Readonly<Calendar22Props>) {
  const [open, setOpen] = useState(false);

  // Convert string to Date if needed
  const dateValue = useMemo(() => {
    if (!value) return undefined;
    if (value instanceof Date) return value;
    // Handle string value
    const parsedDate = new Date(value);
    return Number.isNaN(parsedDate.getTime()) ? undefined : parsedDate;
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id={id}
          className="w-full justify-between font-normal"
        >
          {dateValue ? dateValue.toLocaleDateString() : "Select date"}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-70 overflow-hidden p-0" align="start">
        <Calendar
          className="w-full"
          mode="single"
          selected={dateValue}
          captionLayout="dropdown"
          onSelect={(date) => {
            // Create a synthetic event that matches your onChange signature
            onChange({ target: { id, value: date } });
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
