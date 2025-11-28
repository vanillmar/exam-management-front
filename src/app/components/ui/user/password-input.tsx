"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PasswordInputProps {
  id?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  required?: boolean;
}

export function PasswordInput({
  id = "password",
  placeholder = "Enter password",
  value,
  onChange,
  className,
  required,
}: Readonly<PasswordInputProps>) {
  const [show, setShow] = useState(false);

  return (
    <div className={`w-full max-w-sm space-y-2 ${className ?? ""}`}>
      <div className="relative">
        <Input
          id={id}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="bg-background pr-10"
          required={required ?? false}
        />

        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="absolute top-0 right-0 h-full px-3 hover:bg-transparent"
          onClick={() => setShow(!show)}
        >
          {show ? (
            <EyeOff className="h-4 w-4 text-muted-foreground" />
          ) : (
            <Eye className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
      </div>
    </div>
  );
}
