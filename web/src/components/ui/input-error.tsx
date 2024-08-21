import { cn } from "@/lib/utils";
import { FieldError } from "react-hook-form";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  error?: FieldError;
};

export default function InputError({ error, className, ...props }: Props) {
  if (error === undefined) {
    return <></>;
  }

  return (
    <div className={cn("text-red-500 text-xs mt-1", className)} {...props}>
      {error.message}
    </div>
  );
}
