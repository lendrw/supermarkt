import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface RoundedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const RoundedButton: React.FC<RoundedButtonProps> = ({
  className,
  type = "button", 
  ...props
}) => {
  return (
    <button
      type={type}
      className={clsx("cursor-pointer rounded-3xl", className)}
      {...props}
    />
  );
};
