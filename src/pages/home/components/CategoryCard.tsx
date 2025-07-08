import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface ICategoryCardProps {
  id: number;
  title: string;
  slug: string;
  icon: ReactNode;
}

export const CategoryCard: React.FC<ICategoryCardProps> = ({
  id,
  title,
  slug,
  icon,
}) => {
  const navigate = useNavigate();

  return (
    <div
      key={id}
      className="cursor-pointer w-40 h-40 p-4 hover:shadow-md transition relative flex flex-col items-center justify-center text-center"
      onClick={() => {
        navigate(`/products/category/${slug}`);
      }}
    >
      <div className="text-4xl w-20 h-20 text-primary mb-2 rounded-full bg-white flex flex-col items-center justify-center">
        {icon}
      </div>
      <h2 className="text-sm text-center mb-2 ">
        {title}
      </h2>
    </div>
  );
};
