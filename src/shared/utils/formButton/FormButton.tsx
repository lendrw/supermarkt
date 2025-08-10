import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface FormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const FormButton: React.FC<FormButtonProps> = ({
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "bg-blue-600 text-white px-5 py-2 cursor-pointer rounded-xl text-sm",
        className
      )}
      {...props}
    ></button>
  );
};
