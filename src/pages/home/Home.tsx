import { useEffect, useMemo, useState } from "react";
import { LoadingSpinner } from "../../shared/components";
import { useDebounce } from "../../shared/hooks";
import { BaseLayout } from "../../shared/layouts";
import { ProductList } from "../products/components";
import { CategoryBar } from "./components/CategoryBar";
import { ProductService } from "../../shared/services/api";
import { Environment } from "../../shared/environment";
import { useSearchParams } from "react-router-dom";
import type { IProduct } from "../../shared/types";

export const Home = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [searchParams] = useSearchParams();

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
    <BaseLayout>
      <CategoryBar />
      {isLoading ? (
        <LoadingSpinner isFullPage/>
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
