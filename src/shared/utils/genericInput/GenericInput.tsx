import type { InputHTMLAttributes } from "react";
import clsx from "clsx";

interface GenericInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  
}

export const GenericInput: React.FC<GenericInputProps> = ({
  className,
  ...props
}) => {
  return (
    <input
      className={clsx(
        "text-gray-600 border w-80 border-blue-300 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 p-1 rounded-lg bg-white text-center",
        className
      )}
      {...props}
    />
  );
};
