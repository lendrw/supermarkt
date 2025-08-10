import type { ReactNode } from "react";

interface IBaseLayout {
  title?: string;
  children: ReactNode;
  className?: string;
}

export const BaseLayout: React.FC<IBaseLayout> = ({ children, className="" }) => {
  return (
    <div className={`mt-[60px] min-h-[calc(100vh-60px)] bg-gray-50 ${className}`}>
      {children}
    </div>
  );
};
