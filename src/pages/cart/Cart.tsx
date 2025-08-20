import { useEffect, useState } from "react";
import { BaseLayout } from "../../shared/layouts";
import { LoadingSpinner } from "../../shared/components";
import { CartCard } from "./components/CartCard";
import {
  CartService,
  type ICartItem,
} from "../../shared/services/api/cart/CartService";
import { useDebounce } from "../../shared/hooks";
import { useAuthContext } from "../../shared/contexts";

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {!isLoading &&
            cartProducts.map((cartProduct, index) => (
              <CartCard
                key={`${cartProduct.id}-${index}`}
                icon={cartProduct.thumbnail}
                id={cartProduct.id}
                isLoading={isLoading}
                title={cartProduct.title}
              />
            ))}
        </div>
      )}
    </BaseLayout>
  );
};
