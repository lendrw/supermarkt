import { useEffect, useState, useRef } from "react";
import { BaseLayout } from "../../shared/layouts";
import type { IProduct } from "../../shared/services/products/ProductService";
import { ProductService } from "../../shared/services/products/ProductService";
import { useParams } from "react-router-dom";
import { ProductCarousel } from "./components/ProductCarousel";
import priceWithoutDiscount from "../../shared/utils/discount";
import { FaShoppingCart } from "react-icons/fa";

export const ProductDetails: React.FC = () => {
  const { id } = useParams<"id">();
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<IProduct>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);

    ProductService.getById(Number(id)).then((result) => {
      setIsLoading(false);

      if (result instanceof Error) {
        setError(result.message);
      } else {
        setProduct(result);
      }
    });
  }, [id]);

  if (!product || isLoading) {
    return (
      <BaseLayout title="Loading...">
        <div></div>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      {!isLoading && (
        <div>
          <div className="flex justify-center p-10">
            <ProductCarousel product={product} />
            <div className="flex flex-col border rounded-lg border-gray-300 shadow w-150 justify-between p-4">
              <h2 className="text-2xl">{product.title}</h2>
              <div className="flex gap-1 text-gray-500">
                <p className="text-gray-700">Brand:</p>
                <p className="underline text-gray-700">{product.brand}</p>
                <p>- Id: {product.id}</p>
              </div>
              <div>
                <div className="flex gap-1">
                  {product.discountPercentage >= 10 && (
                    <p className="text-gray-500 line-through text-sm">
                      U${" "}
                      {priceWithoutDiscount(
                        product.price,
                        product.discountPercentage
                      )}
                    </p>
                  )}
                  {product.discountPercentage >= 10 && (
                    <p className="bg-yellow-200 text-red-500 text-sm font-bold rounded-md w-17 text-center">
                      {product.discountPercentage.toFixed(0)}% OFF
                    </p>
                  )}
                </div>
                <p className="text-2xl font-bold text-blue-700">
                  U$ {product.price}
                </p>
              </div>
              
              <p>{product.shippingInformation}</p>
              <p>{product.availabilityStatus}</p>
              
              <p>
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="mr-2 px-2 py-1 bg-gray-200 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </p>
              <button className="flex w-50 items-center justify-center gap-2 bg-blue-600 text-white text-xl px-4 py-2 rounded hover:bg-blue-700 transition">
                <FaShoppingCart className="w-5 h-5" />
                Buy
              </button>
            </div>
          </div>
          <div className="w-full bg-gray-200">
            <div className="">
              <h2 className="text-2xl">Product description</h2>
              <p>{product.title}</p>
              <p>{product.description}</p>
            </div>
            <div>
              <h2 className="text-2xl">Dimentions</h2>
              <ul className="list-disc ml-6 text-gray-700">
                <li>Width: {product.dimensions.width.toFixed(0)}cm</li>
                <li>Height: {product.dimensions.height.toFixed(0)}cm</li>
                <li>Depth: {product.dimensions.depth.toFixed(0)}cm</li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl">Warranty</h2>
              <p>{product.warrantyInformation}</p>
            </div>
            <div>
              <h2 className="text-2xl">Return policy</h2>
              <p>{product.returnPolicy}</p>
            </div>
          </div>
        </div>
      )}
    </BaseLayout>
  );
};
