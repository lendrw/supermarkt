import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface ICategoryCardProps {
  id: number;
  title: string;
  slug: string;
  icon: ReactNode;
  isLoading: boolean;
}

const CategorySkeleton = () => (
  <div className="cursor-pointer w-40 h-40 p-4 flex flex-col items-center justify-center text-center">
    <div className="animate-pulse flex flex-col items-center">
      <div className="w-20 h-20 mb-2 rounded-full bg-white" />
      <div className="w-20 h-3 mb-2 bg-white rounded" />
    </div>
  </div>
);

export const CategoryCard: React.FC<ICategoryCardProps> = ({
  title,
  slug,
  icon,
  isLoading,
}) => {
  const navigate = useNavigate();

  if (isLoading) return <CategorySkeleton />;

  return (
    <div
      className="cursor-pointer w-40 h-40 p-4 transition relative flex flex-col items-center justify-center text-center"
      onClick={() => navigate(`/products/category/${slug}`)}
    >
      <div className="text-4xl w-20 h-20 text-blue-700 mb-2 rounded-full bg-white flex items-center justify-center">
        {icon}
      </div>
      <h2 className="text-sm text-center mb-2 text-white font-semibold">
        {title}
      </h2>
    </div>
  );
};
