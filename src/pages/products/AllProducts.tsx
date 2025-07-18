import type { IProduct } from "../../shared/services/api/products/ProductService";
import { ProductService } from "../../shared/services/api/products/ProductService";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "../../shared/hooks";
import { useSearchParams } from "react-router-dom";
import { Environment } from "../../shared/environment";
import { ProductList } from "./components";

export const AllProducts: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = useMemo(() => {
    return Number(searchParams.get("page") || "1");
  }, [searchParams]);

  const { debounce } = useDebounce();

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      ProductService.getAll(page).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          setError(result.message);
        } else {
          setProducts(result.products);
          setTotal(result.total);
          setTotalPages(Math.ceil(result.total / Environment.LIMIT));
        }
      });
    });
  }, [debounce, page]);

  return (
    <ProductList
      isLoading={isLoading}
      page={page}
      products={products}
      total={total}
      totalPages={totalPages} error={error}
    />
  );
};
