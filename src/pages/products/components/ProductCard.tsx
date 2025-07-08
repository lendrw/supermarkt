import { useNavigate } from "react-router-dom";
import priceWithoutDiscount from "../../../shared/utils/discount";
import { RenderStars } from "./RenderStars";

interface IProductCardProps {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  rating: number;
  discountPercentage: number;
}

export const ProductCard: React.FC<IProductCardProps> = ({
  id,
  title,
  thumbnail,
  price,
  rating,
  discountPercentage,
}) => {

  const navigate = useNavigate();

  return (
    <div
      key={id}
      className="cursor-pointer rounded-lg p-4 shadow hover:shadow-md transition relative bg-white"
      onClick={() => {navigate(`/products/${id}`)}}
    >
      <img
        alt={title}
        src={thumbnail}
        className="h-40 w-full object-contain mb-4"
      />
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <div className="flex items-center gap-2">
        <span className="text-blue-600 font-bold">U$ {price.toFixed(2)}</span>
        {discountPercentage >= 10 && (
          <span className="text-gray-500 line-through text-sm">
            U$ {priceWithoutDiscount(price, discountPercentage)}
          </span>
        )}
      </div>
      <div className="flex gap-1 items-center justify-end mt-1">
        <RenderStars rating={rating} />
      </div>
      {discountPercentage >= 10 && (
        <p className="bg-yellow-200 text-red-500 text-md font-bold rounded-md absolute p-1 top-0 right-0">
          -{discountPercentage.toFixed(0)}%
        </p>
      )}
    </div>
  );
};
