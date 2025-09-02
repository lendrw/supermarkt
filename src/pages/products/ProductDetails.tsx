import { useEffect, useState } from "react";
import { BaseLayout } from "../../shared/layouts";
import { ProductService } from "../../shared/services/api/products/ProductService";
import { useParams } from "react-router-dom";
import {
  ProductSpecsSection,
  ProductDescriptionSection,
  ProductInfoCard,
  ProductCarousel,
  ProductReviews,
} from "./components";
import { LoadingSpinner } from "../../shared/components";
import type { IProduct } from "../../shared/types";

export const ProductDetails: React.FC = () => {
  const { id } = useParams<"id">();
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<IProduct>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    ProductService.getById(Number(id)).then((result) => {
      setIsLoading(false);
      if (result instanceof Error) setError(result.message);
      else setProduct(result);
    });
  }, [id]);

  return (
    <BaseLayout>
      {isLoading ? (
        <LoadingSpinner isFullPage/>
      ) : product ? (
        <>
          <div className="flex flex-col lg:flex-row justify-center items-center p-10 gap-10">
            <ProductCarousel product={product} />
            <ProductInfoCard product={product} />
          </div>

          <div className="w-full p-5 bg-white border-b border-b-gray-300">
            <ProductDescriptionSection product={product} />
            <ProductSpecsSection product={product} />
          </div>
          <div className="w-full p-5 bg-white">
            <ProductReviews product={product} />
          </div>
        </>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : null}
    </BaseLayout>
  );
};
