import { useEffect, useState, useMemo } from "react";
import { ProductService } from "../../../shared/services/api";
import type { IProduct } from "../../../shared/types";
import { LoadingSpinner } from "../../../shared/components";
import { ProductList } from "../../products/components";

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

  // Escolhe um slug aleatório apenas uma vez
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
        // Pega apenas os 6 primeiros produtos
        setProducts(result.products.slice(0, 6));
      }
    });
  }, [slug]);

  return (
    <div className="bg-white mt-6 shadow-md rounded-2xl w-120 h-auto flex flex-col items-center justify-center gap-5">
      <h2 className="font-bold text-lg mt-3">Take a look at our other products</h2>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ProductList
          products={products}
          isLoading={isLoading}
          error={error}
          gridClassName="grid grid-col-1"
          containerClassName="w-120"
          isRoundedCard={false}
        />
      )}
    </div>
  );
};
