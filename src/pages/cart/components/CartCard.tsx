import { useEffect, useState } from "react";
import { CartButton } from "../../../shared/utils/cartButton/CartButton";
import { useAuthContext, useCartContext } from "../../../shared/contexts";
import type { ICartItem } from "../../../shared/types";
import priceWithoutDiscount from "../../../shared/utils/discount";
import { RoundedButton } from "../../../shared/utils";

interface ICartCard {
  id: number;
  title: string;
  icon: string;
  price: number;
  brand: string;
  discountPercentage: number;
  shippingInformation: string;
  availabilityStatus: string;
  tags: string[];
}

export const CartCard: React.FC<ICartCard> = ({
  id,
  title,
  icon,
  price,
  availabilityStatus,
  brand,
  discountPercentage,
  shippingInformation,
  tags,
}) => {
  const { isAuthenticated, userId } = useAuthContext();
  const { cart, addToCart, increment, decrement, deleteProduct } =
    useCartContext();

  const [cartItem, setCartItem] = useState<ICartItem | undefined>(() =>
    cart?.items.find((item) => item.productId === id)
  );

  const [isInCart, setIsInCart] = useState<boolean>(!!cartItem);
  const [quantity, setQuantity] = useState<number>(cartItem?.quantity ?? 0);

  useEffect(() => {
    const item = cart?.items.find((item) => item.productId === id);
    setCartItem(item);
    setIsInCart(!!item);
    setQuantity(item?.quantity ?? 0);
  }, [cart, id]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAction = async (
    action: () => Promise<void>,
    errorMessage: string
  ) => {
    if (!userId) return;
    setIsLoading(true);
    setError(null);

    try {
      await action();
    } catch (err) {
      console.error(err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = () =>
    handleAction(
      () =>
        addToCart({
          productId: id,
          price,
          thumbnail: icon,
          title,
          availabilityStatus,
          brand,
          discountPercentage,
          shippingInformation,
          tags,
        }),
      "Erro ao adicionar ao carrinho"
    );

  const handleIncrement = () =>
    handleAction(() => increment(id), "Erro ao incrementar produto");

  const handleDecrement = () =>
    handleAction(() => decrement(id), "Erro ao decrementar produto");

  const handleDeleteProduct = () =>
    handleAction(() => deleteProduct(id), "Erro ao remover produto");

  useEffect(() => {
    const item = cart?.items.find((item) => item.productId === id);
    setCartItem(item);
    setIsInCart(!!item);
    setQuantity(item?.quantity ?? 0);
  }, [cart, id]);

  if (isInCart)
    return (
      <div className="shadow-md flex flex-row items-center bg-white rounded-2xl h-60 md:h-70 w-full md:w-[55vw]">
        {error ? (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <>
            <div className="">
              <img className="w-30 md:w-35 lg:w-50" src={icon} alt={title} />
            </div>
            <div className="flex flex-col justify-evenly h-54 md:h-60 lg:h-65 ">
              <h2 className="text-base md:text-xl lg:text-2xl">{title}</h2>

              <div className="flex gap-1 text-gray-500 text-sm md:text-base">
                <p className="text-gray-700">Brand:</p>
                <p className="underline text-gray-700">{brand}</p>
                <p>- Id: {id}</p>
              </div>

              {discountPercentage >= 10 && (
                <div className="flex gap-1 ">
                  <p className="text-gray-500 line-through text-sm">
                    U$ {priceWithoutDiscount(price, discountPercentage)}
                  </p>
                  <p className="bg-yellow-200 text-red-500 text-sm font-bold rounded-md w-17 text-center">
                    {discountPercentage.toFixed(0)}% OFF
                  </p>
                </div>
              )}

              <p className="text-base md:text-xl lg:text-2xl font-bold text-blue-700">
                U$ {price}
              </p>
              <p className="text-gray-700 text-sm md:text-base">
                {shippingInformation}
              </p>
              <p className="text-green-900 bg-green-200 text-center text-sm lg:text-base rounded-md w-20">
                {availabilityStatus}
              </p>

              <div className="flex flex-row gap-2 mt-1">
                <CartButton
                  isInCart={isInCart}
                  isLogged={isAuthenticated}
                  quantity={quantity}
                  isLoading={isLoading}
                  onAddToCart={handleAddToCart}
                  onIncrement={handleIncrement}
                  onDecrement={handleDecrement}
                />
                <RoundedButton
                  className="bg-red-600 hover:bg-red-700 text-white w-20"
                  onClick={handleDeleteProduct}
                >
                  Delete
                </RoundedButton>
              </div>
            </div>
          </>
        )}
      </div>
    );
};
