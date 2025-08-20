import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface ICartCard {
  id: number;
  title: string;
  icon: string;
  isLoading: boolean;
}

const CartSkelleton = () => (
  <div className="cursor-pointer w-40 h-40 p-4 flex flex-col items-center justify-center text-center">
    <div className="animate-pulse flex flex-col items-center">
      <div className="w-20 h-20 mb-2 rounded-full bg-white" />
      <div className="w-20 h-3 mb-2 bg-white rounded" />
    </div>
  </div>
);

export const CartCard: React.FC<ICartCard> = ({
  title,
  icon,
  isLoading,
  quantity
}) => {
  const navigate = useNavigate();

  if (isLoading) return <CartSkelleton />;

  return (
    <div
      className="cursor-pointer w-40 h-40 p-4 transition relative flex flex-col items-center justify-center text-center"
      
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
