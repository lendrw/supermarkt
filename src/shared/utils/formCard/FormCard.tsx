import type { HTMLAttributes } from "react";
import clsx from "clsx";

interface FormCardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const FormCard: React.FC<FormCardProps> = ({ className, ...props }) => {
  return (
    <div
      className={clsx(
        "shadow-md space-y-3 rounded-3xl flex flex-col items-center justify-center",
        className
      )}
      {...props}
    />
  );
};
