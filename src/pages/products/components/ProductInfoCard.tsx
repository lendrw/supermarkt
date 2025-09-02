import { FaShoppingCart } from "react-icons/fa";
import priceWithoutDiscount from "../../../shared/utils/discount";
import type { IProduct } from "../../../shared/types";

interface Props {
  product: IProduct;
}

export const ProductInfoCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="flex gap-2 flex-col rounded-3xl shadow-lg bg-white w-[95dvw] sm:w-150 justify-between p-4">
      <h2 className="text-2xl">{product.title}</h2>

      <div className="flex gap-1 text-gray-500">
        <p className="text-gray-700">Brand:</p>
        <p className="underline text-gray-700">{product.brand}</p>
        <p>- Id: {product.id}</p>
      </div>

      {product.discountPercentage >= 10 && (
        <div className="flex gap-1">
          <p className="text-gray-500 line-through text-sm">
            U$ {priceWithoutDiscount(product.price, product.discountPercentage)}
          </p>
          <p className="bg-yellow-200 text-red-500 text-sm font-bold rounded-md w-17 text-center">
            {product.discountPercentage.toFixed(0)}% OFF
          </p>
        </div>
      )}

      <p className="text-gray-700">{product.shippingInformation}</p>
      <p className="text-green-900 bg-green-200 text-center rounded-md w-20">
        {product.availabilityStatus}
      </p>

      <div className="my-2">
        {product.tags.map((tag, index) => (
          <span key={index} className="mr-2 px-2 py-1 bg-gray-200 rounded">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex w-full justify-center gap-4 items-center">
        <p className="text-xl sm:text-2xl font-bold text-blue-700">U$ {product.price}</p>
        <button className="flex w-35 sm:w-45 items-center justify-center gap-2 bg-blue-600 text-white text-xl px-4 py-2 rounded hover:bg-blue-700 transition">
          <FaShoppingCart className="w-5 h-5" />
          Buy
        </button>
      </div>
    </div>
  );
};
