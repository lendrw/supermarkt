import { useEffect, useState, useMemo } from "react";
import { ProductService } from "../../shared/services/api/products/ProductService";
import { useParams, useSearchParams } from "react-router-dom";
import { Environment } from "../../shared/environment";
import { ProductList } from "./components";
import { CategoryBar, LoadingSpinner } from "../../shared/components";
import { BaseLayout } from "../../shared/layouts";
import type { IProduct } from "../../shared/types";

export const SearchProduct = () => {
  const { query = "" } = useParams<{ query: string }>();
  const [searchParams] = useSearchParams();

  const page = useMemo(() => {
    return Number(searchParams.get("page") || "1");
  }, [searchParams]);

  const [products, setProducts] = useState<IProduct[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (query.trim() === "") {
      setProducts([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    const timer = setTimeout(() => {
      ProductService.getSearchProduct(page, query).then((result) => {
        if (result instanceof Error) {
          setError("No products found");
          setProducts([]);
          setTotal(0);
          setTotalPages(0);
        } else {
          setProducts(result.products);
          setTotal(result.total);
          setTotalPages(Math.ceil(result.total / Environment.LIMIT));
          setError(null);
        }
        setIsLoading(false);
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [query, page]);

  return (
    <BaseLayout>
      <CategoryBar />
      {isLoading ? (
        <LoadingSpinner isFullPage/>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : products.length === 0 ? (
        <div className="text-center p-8">
          <p className="mb-4 text-lg font-semibold">
            No results found for <span className="font-mono">{query}</span>.
          </p>
          <p className="text-gray-600">
            Please check your spelling or try using more general terms.
          </p>
        </div>
      ) : (
        <ProductList
          isLoading={isLoading}
          page={page}
          products={products}
          total={total}
          totalPages={totalPages}
          error={error}
        />
      )}
    </BaseLayout>
  );
};
