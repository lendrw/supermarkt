import { BaseLayout } from "../../shared/layouts";
import type { IProduct } from "../../shared/services/products/ProductService";
import { ProductService } from "../../shared/services/products/ProductService";
import { useEffect, useState } from "react";
import { useDebounce } from "../../shared/hooks";
import { ProductCard } from "./components/ProductCard";

export const ProductList: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { debounce } = useDebounce();

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      ProductService.getAll().then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          setError(result.message);
        } else {
          setProducts(result.products);
        }
      });
    });
  }, [debounce]);

  return (
    <BaseLayout>
      <div className="p-6">
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {!isLoading &&
            products.map((product) => (
              <ProductCard
                id={product.id}
                title={product.title}
                discountPercentage={product.discountPercentage}
                price={product.price}
                rating={product.rating}
                thumbnail={product.thumbnail}
              />
            ))}
        </div>
      </div>
    </BaseLayout>
  );
};
