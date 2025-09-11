import { useEffect, useState, useMemo } from "react";
import { ProductService } from "../../../shared/services/api";
import type { IProduct } from "../../../shared/types";
import { LoadingSpinner } from "../../../shared/components";
import { ProductCard } from "../../products/components";

export const CartProductRecomendation: React.FC = () => {
  const categoriesArray: string[] = [
    "beauty",
    "fragrances",
    "furniture",
    "groceries",
    "home-decoration",
    "kitchen-accessories",
    "laptops",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "mobile-accessories",
    "motorcycle",
    "skin-care",
    "smartphones",
    "sports-accessories",
    "sunglasses",
    "tablets",
    "tops",
    "vehicle",
    "womens-bags",
    "womens-dresses",
    "womens-jewellery",
    "womens-shoes",
    "womens-watches",
  ];

  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const slug = useMemo(
    () => categoriesArray[Math.floor(Math.random() * categoriesArray.length)],
    []
  );

  useEffect(() => {
    setIsLoading(true);
    ProductService.getProductsByCategory(1, slug).then((result) => {
      setIsLoading(false);

      if (result instanceof Error) {
        setError(result.message);
      } else {
        setProducts(result.products.slice(0, 6));
      }
    });
  }, [slug]);

  return (
    <div className="bg-white shadow-md rounded-2xl overflow-auto w-auto md:w-[35vw] h-auto flex flex-col items-center justify-center p-4">
      <h2 className="font-bold text-lg text-center mt-3">
        Take a look at our other products
      </h2>
      {isLoading ? (
        <LoadingSpinner isFullPage={false} />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="flex flex-row mt-4 w-full md:flex-col overflow-x-auto gap-6">
          {(products ?? []).map((product) => (
            <div key={product.id} className="min-w-[250px]">
              <ProductCard
                id={product.id}
                title={product.title}
                thumbnail={product.thumbnail}
                price={product.price}
                rating={product.rating}
                discountPercentage={product.discountPercentage}
                availabilityStatus={product.availabilityStatus}
                brand={product.brand}
                shippingInformation={product.shippingInformation}
                tags={product.tags}
                isRoundedCard={false}
                hasShadow={false}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
