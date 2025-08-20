import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface RoundedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const RoundedButton: React.FC<RoundedButtonProps> = ({
  className,
  ...props
}) => {
  return (
    <button
      className={clsx("cursor-pointer rounded-3xl", className)}
      {...props}
    ></button>
  );
};
