import { useEffect, useState } from "react";
import { BaseLayout } from "../../shared/layouts";
import type { IProduct } from "../../shared/services/products/ProductService";
import { ProductService } from "../../shared/services/products/ProductService";
import { useParams } from "react-router-dom";
import {
  ProductSpecsSection,
  ProductDescriptionSection,
  ProductInfoCard,
  ProductCarousel,
  ProductReviews,
} from "./components";

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

  if (!product || isLoading) {
    return (
      <BaseLayout title="Loading...">
        <div></div>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout title={product.title}>
      <div className="flex justify-center p-10 gap-10">
        <ProductCarousel product={product} />
        <ProductInfoCard product={product} />
      </div>

      <div className="w-full p-5">
        <ProductDescriptionSection product={product} />
        <ProductSpecsSection product={product} />
      </div>
      <div  className="w-full p-5">
        <ProductReviews product={product}/>
      </div>
    </BaseLayout>
  );
};
