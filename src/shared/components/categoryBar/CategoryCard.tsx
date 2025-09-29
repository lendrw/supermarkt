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
  <div className="cursor-pointer w-20 h-22 sm:w-30 sm:h-29 mt-2 transition relative flex flex-col items-center text-center">
    <div className="animate-pulse flex flex-col items-center">
      <div className="text-4xl w-12 h-12 sm:w-17 sm:h-17 text-blue-700 mb-2 rounded-full bg-white flex items-center justify-center" />
      <div className="w-13 h-3 mb-2 bg-white rounded" />
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
      className="cursor-pointer w-20 h-22 sm:w-30 sm:h-23 md:h-29 mt-2 md:mt-4 transition relative flex flex-col items-center text-center"
      onClick={() => navigate(`/products/category/${slug}`)}
    >
      <div className="text-4xl w-12 h-12 sm:w-17 sm:h-17 text-blue-700 mb-2 rounded-full bg-white flex items-center justify-center">
        {icon}
      </div>
      <h2 className="text-xs md:text-sm text-center text-white md:font-semibold whitespace-normal break-words">
        {title}
      </h2>
    </div>
  );
};
