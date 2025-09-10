import { useNavigate } from "react-router-dom";
import priceWithoutDiscount from "../../../shared/utils/discount";
import { RenderStars } from "./RenderStars";
import { CartButton } from "../../../shared/utils/cartButton/CartButton";
import { useAuthContext, useCartContext } from "../../../shared/contexts";
import type { ICartItem } from "../../../shared/types";
import { useEffect, useState } from "react";

interface IProductCardProps {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  rating: number;
  discountPercentage: number;
  availabilityStatus: string;
  brand: string;
  shippingInformation: string;
  tags: string[];
  isRoundedCard?: boolean;
  hasShadow?: boolean;
}

export const ProductCard: React.FC<IProductCardProps> = ({
  id,
  title,
  thumbnail,
  price,
  rating,
  discountPercentage,
  availabilityStatus,
  brand,
  shippingInformation,
  tags,
  isRoundedCard = true,
  hasShadow = true,
}) => {
  const navigate = useNavigate();
  const { isAuthenticated, userId } = useAuthContext();
  const { cart, addToCart, increment, decrement } = useCartContext();

  const [cartItem, setCartItem] = useState<ICartItem | undefined>(() =>
    cart?.items.find((item) => item.productId === id)
  );

  const [isInCart, setIsInCart] = useState<boolean>(!!cartItem);
  const [quantity, setQuantity] = useState<number>(cartItem?.quantity ?? 0);

  useEffect(() => {
    const item = cart?.items?.find((item) => item.productId === id);
    setCartItem(item);
    setIsInCart(!!item);
    setQuantity(item?.quantity ?? 0);
  }, [cart, id]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddToCart = async () => {
    if (!userId) return;
    setIsLoading(true);
    setError(null);

    try {
      await addToCart({
        productId: id,
        price,
        thumbnail,
        title,
        availabilityStatus,
        brand,
        discountPercentage,
        shippingInformation,
        tags,
      });
    } catch (err) {
      setError("Erro ao adicionar ao carrinho");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIncrement = async () => {
    if (!userId || !isInCart) return;
    setIsLoading(true);

    try {
      await increment(id);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecrement = async () => {
    if (!userId || !isInCart) return;
    setIsLoading(true);

    try {
      await decrement(id);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`flex flex-col p-3 md:p-4 gap-2 md:gap-0  transition relative bg-white ${
        isRoundedCard && "rounded-lg"
      } ${hasShadow && "shadow hover:shadow-md"}`}
    >
      <div
        key={id}
        className="cursor-pointer"
        onClick={() => navigate(`/products/${id}`)}
      >
        <img
          alt={title}
          src={thumbnail}
          className="h-40 w-full object-contain mb-4"
        />
        <h2 className="text-sm md:text-base font-semibold mb-2">{title}</h2>
        <div className="flex items-center gap-2">
          <span className="text-blue-600 font-bold text-sm md:text-base">
            U$ {price.toFixed(2)}
          </span>
          {discountPercentage >= 10 && (
            <span className="text-gray-500 line-through text-sm">
              U$ {priceWithoutDiscount(price, discountPercentage)}
            </span>
          )}
        </div>
        <div className="flex gap-1 items-center justify-end mt-1">
          <RenderStars rating={rating} />
        </div>
        {discountPercentage >= 10 && (
          <p className="bg-yellow-200 text-red-500 text-md font-bold rounded-md absolute p-1 top-0 right-0">
            -{discountPercentage.toFixed(0)}%
          </p>
        )}
      </div>

      <CartButton
        isInCart={isInCart}
        isLogged={isAuthenticated}
        quantity={quantity}
        isLoading={isLoading}
        onAddToCart={handleAddToCart}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        className="mt-auto"
      />
    </div>
  );
};
