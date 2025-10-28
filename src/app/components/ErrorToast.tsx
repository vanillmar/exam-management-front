import { Toaster } from "sonner";
interface ErrorToastProps {
  message: string;
  retry: () => void;
}

export default function ErrorToast({ message, retry }: ErrorToastProps) {
  return (
    <Toaster id={message} duration={3000} />
  );
}
