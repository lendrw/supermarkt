import { Box, Pagination } from "@mui/material";
import { ProductCard } from "../../../pages/products/components";
import { BaseLayout } from "../../../shared/layouts";
import type { IProduct } from "../../../shared/services/api";
import { useSearchParams } from "react-router-dom";

interface ProductListProps {
  title?: string;
  isLoading: boolean;
  error?: string | null;
  products: IProduct[];
  total: number;
  totalPages: number;
  page: number;
}

export const ProductList: React.FC<ProductListProps> = ({
  isLoading,
  error,
  products,
  total,
  totalPages,
  page,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <BaseLayout>
      <div className="p-6 w-screen">
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

      {!isLoading && total > 10 && totalPages > 1 && (
        <Box margin={3} display="flex" justifyContent="center">
          <Pagination
            sx={{ display: "flex" }}
            page={page}
            count={Math.min(totalPages, 500)}
            onChange={(_, newPage) => {
              const params = new URLSearchParams(searchParams);
              params.set("page", newPage.toString());
              setSearchParams(params, { replace: true });
            }}
          />
        </Box>
      )}
    </BaseLayout>
  );
};
