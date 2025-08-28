import { Box, Pagination } from "@mui/material";
import { ProductCard } from "../../../pages/products/components";
import { BaseLayout } from "../../../shared/layouts";
import { useSearchParams } from "react-router-dom";
import type { IProduct } from "../../../shared/types";

interface ProductListProps {
  title?: string;
  isLoading: boolean;
  error?: string | null;
  products: IProduct[];
  total?: number;
  totalPages?: number;
  page?: number;
  containerClassName?: string;
  gridClassName?: string;
  isRoundedCard?: boolean;
}

export const ProductList: React.FC<ProductListProps> = ({
  isLoading,
  error,
  products,
  total,
  totalPages,
  page,
  containerClassName,
  gridClassName,
  isRoundedCard,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <BaseLayout>
      <div className={containerClassName ?? "p-6"}>
        {error && <p className="text-red-500">{error}</p>}

        <div
          className={
            gridClassName ??
            "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          }
        >
          {!isLoading &&
            products.map((product) => (
              <ProductCard
                isRoundedCard={isRoundedCard}
                key={product.id}
                id={product.id}
                title={product.title}
                discountPercentage={product.discountPercentage}
                price={product.price}
                rating={product.rating}
                thumbnail={product.thumbnail}
                tags={product.tags}
                availabilityStatus={product.availabilityStatus}
                brand={product.brand}
                shippingInformation={product.shippingInformation}
              />
            ))}
        </div>
      </div>

      {!isLoading &&
        total &&
        totalPages &&
        page &&
        total > 10 &&
        totalPages > 1 && (
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
