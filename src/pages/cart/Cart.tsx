import { useEffect, useState } from "react";
import { BaseLayout } from "../../shared/layouts";
import { LoadingSpinner } from "../../shared/components";
import { CartCard } from "./components/CartCard";
import { CartService } from "../../shared/services/api/cart/CartService";
import { useDebounce } from "../../shared/hooks";
import { useAuthContext, useCartContext } from "../../shared/contexts";
import type { ICartItem } from "../../shared/types";
import { RoundedButton } from "../../shared/utils";
import { CartProductRecomendation } from "./components/CartProductRecomendation";

export const Cart = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cartProducts, setCartProducts] = useState<ICartItem[]>([]);

  const { debounce } = useDebounce();

  const { userId } = useAuthContext();

  const { totalProducts, subtotal } = useCartContext();

  useEffect(() => {
    if (!userId) return;

    setIsLoading(true);

    debounce(() => {
      CartService.getLoggedUserCart(userId)
        .then((result) => {
          setIsLoading(false);

          if (!result) {
            setError("Carrinho não encontrado");
            setCartProducts([]);
            return;
          }

          setCartProducts(result.items);
        })
        .catch((err) => {
          setIsLoading(false);
          setError("Erro ao buscar carrinho");
          console.error(err);
        });
    });
  }, [debounce, userId]);

  return (
    <BaseLayout className="flex flex-col md:flex-row justify-around relative p-4">
      {isLoading ? (
        <div className="shadow-md flex flex-row items-center justify-center bg-white rounded-2xl mt-5 mb-4 h-70 w-200">
          <LoadingSpinner isFullPage={false}/>
        </div>
      ) : (
        <div className="pt-1">
          {totalProducts > 0 ? (
            !isLoading &&
            cartProducts.map((cartProduct, index) => (
              <CartCard
                key={`${cartProduct.productId}-${index}`}
                icon={cartProduct.thumbnail}
                id={cartProduct.productId}
                title={cartProduct.title}
                price={cartProduct.price}
                availabilityStatus={cartProduct.availabilityStatus}
                brand={cartProduct.brand}
                discountPercentage={cartProduct.discountPercentage}
                shippingInformation={cartProduct.shippingInformation}
                tags={cartProduct.tags}
              />
            ))
          ) : (
            <div className="shadow-md flex flex-row items-center justify-center text-xl text-blue-700 bg-white rounded-2xl mt-5 mb-4 h-60 md:h-70 w-full md:w-[55vw] lg:w-170">
              Your cart is empty
            </div>
          )}
        </div>
      )}
      {isLoading ? (
        <div className="bg-white mt-6 shadow-md rounded-2xl w-120 h-50 flex flex-col items-center justify-center gap-5">
          <LoadingSpinner isFullPage={false} />
        </div>
      ) : (
        <div>
          {totalProducts > 0 ? (
            <div className="bg-white mt-6 shadow-md rounded-2xl w-100 md:w-[35vw] h-40 lg:h-50 flex flex-col items-center justify-center gap-5 p-2">
              <h2 className="text-lg lg:text-2xl text-center">
                Subtotal ({totalProducts}
                {totalProducts > 1 ? " products" : " product"}):{" "}
                <span className="font-bold text-blue-700">
                  U$ {subtotal.toFixed(2)}
                </span>
              </h2>
              <RoundedButton
                type="button"
                className="bg-orange-500 hover:bg-orange-600 text-white h-8 w-40 lg:w-45"
              >
                Complete order
              </RoundedButton>
            </div>
          ) : null}
          <CartProductRecomendation />
        </div>
      )}
    </BaseLayout>
  );
};
