import { useEffect, useState } from "react";
import type { IProduct } from "../../shared/services/api/products/ProductService";
import { ProductService } from "../../shared/services/api/products/ProductService";
import { useDebounce } from "../../shared/hooks";
import { useParams } from "react-router-dom";
import { Environment } from "../../shared/environment";
import { ProductList } from "./components";
import { LoadingSpinner } from "../../shared/components";
import { BaseLayout } from "../../shared/layouts";

export const SearchProduct = () => {
  const { query = "", page = "1" } = useParams<{
    query: string;
    page: string;
  }>();

  const [products, setProducts] = useState<IProduct[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const { debounce } = useDebounce();

  useEffect(() => {
    if (query.trim() === "") {
      setProducts([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    debounce(() => {
      ProductService.getSearchProduct(Number(page), query).then((result) => {
        if (result instanceof Error) {
          alert("No products found");
          setProducts([]);
        } else {
          setProducts(result.products);
          setTotal(result.total);
          setTotalPages(Math.ceil(result.total / Environment.LIMIT));
        }
        setIsLoading(false);
      });
    });
  }, [debounce, query, page]);

  return (
    <BaseLayout>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ProductList
          isLoading={isLoading}
          page={Number(page)}
          products={products}
          total={total}
          totalPages={totalPages}
          error={error}
        />
      )}
    </BaseLayout>
  );
};
