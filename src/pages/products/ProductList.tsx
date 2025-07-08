import { BaseLayout } from "../../shared/layouts";
import type { IProduct } from "../../shared/services/products/ProductService";
import { ProductService } from "../../shared/services/products/ProductService";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "../../shared/hooks";
import { ProductCard } from "./components/ProductCard";
import { Box, Pagination } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { Environment } from "../../shared/environment";

export const ProductList: React.FC = () => {
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
    <BaseLayout>
      <div className="p-6">
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {!isLoading &&
            products.map((product) => (
              <ProductCard
                key={product.id}
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
      {!isLoading && total > 10 && (
        <Box margin={3} display="flex" justifyContent="center">
          <Pagination
            sx={{ display: "flex" }}
            page={page}
            count={totalPages > 500 ? 500 : totalPages}
            onChange={(_, newPage) =>
              setSearchParams({ page: newPage.toString() }, { replace: true })
            }
          />
        </Box>
      )}
    </BaseLayout>
  );
};
