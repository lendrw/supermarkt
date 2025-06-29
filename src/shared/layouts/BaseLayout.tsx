import type { ReactNode } from "react";

interface IBaseLayout {
  children: ReactNode;
}

export const BaseLayout: React.FC<IBaseLayout> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
};
