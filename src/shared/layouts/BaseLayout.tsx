import type { ReactNode } from "react";

interface IBaseLayout {
  title?: string;
  children: ReactNode;
}

export const BaseLayout: React.FC<IBaseLayout> = ({ children }) => {
  return (
    <div className="mt-[60px] min-h-screen bg-gray-100">
      {children}
    </div>
  );
};
