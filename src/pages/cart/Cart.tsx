import { useEffect, useState } from "react";
import { BaseLayout } from "../../shared/layouts";
import { LoadingSpinner } from "../../shared/components";
import { CartCard } from "./components/CartCard";
import {
  CartService,
} from "../../shared/services/api/cart/CartService";
import { useDebounce } from "../../shared/hooks";
import { useAuthContext } from "../../shared/contexts";
import type { ICartItem } from "../../shared/types";

export const Cart = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cartProducts, setCartProducts] = useState<ICartItem[]>([]);

  const { debounce } = useDebounce();

  const { userId } = useAuthContext();

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
    <BaseLayout>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="">
          {!isLoading &&
            cartProducts.map((cartProduct, index) => (
              <CartCard
                key={`${cartProduct.productId}-${index}`}
                icon={cartProduct.thumbnail}
                id={cartProduct.productId}
                isLoading={isLoading}
                title={cartProduct.title}
                quantity={cartProduct.quantity}
              />
            ))}
        </div>
      )}
    </BaseLayout>
  );
};
