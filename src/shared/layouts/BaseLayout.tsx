import type { ReactNode } from "react";

interface IBaseLayout {
  title?: string;
  children: ReactNode;
  className?: string;
}

export const BaseLayout: React.FC<IBaseLayout> = ({ children, className="" }) => {
  return (
    <div className={`mt-[85px] h-auto sm:mt-[60px] min-h-[calc(100vh-85px-180px)] sm:min-h-[calc(100vh-60px-110px)] bg-gray-100 ${className}`}>
      {children}
    </div>
  );
};
