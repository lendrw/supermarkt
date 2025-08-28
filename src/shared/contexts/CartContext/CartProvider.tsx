import { useEffect, useState, useCallback } from "react";
import { CartService } from "../../services/api/cart/CartService";
import type { ICart, ICartItem } from "../../types";
import { CartContext } from "./CartContext";
import { useAuthContext } from "..";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { userId } = useAuthContext();
  const [cart, setCart] = useState<ICart | null>(null);

  const refreshCart = useCallback(async () => {
    if (!userId) return;
    const c = await CartService.getLoggedUserCart(userId);
    setCart(c);
  }, [userId]);

  const addToCart = useCallback(
    async (product: Omit<ICartItem, "quantity">) => {
      if (!userId) return;
      await CartService.addToCart(userId, product);
      await refreshCart();
    },
    [userId, refreshCart]
  );

  const increment = useCallback(
    async (productId: number) => {
      if (!userId) return;
      await CartService.updateQuantity(userId, productId, +1);
      await refreshCart();
    },
    [userId, refreshCart]
  );

  const decrement = useCallback(
    async (productId: number) => {
      if (!userId) return;
      await CartService.updateQuantity(userId, productId, -1);
      await refreshCart();
    },
    [userId, refreshCart]
  );

  const deleteProduct = useCallback(
    async (productId: number) => {
      if (!userId) return;
      await CartService.deleteProduct(userId, productId);
      await refreshCart();
    },
    [userId, refreshCart]
  );

  const subtotal = cart?.subtotal ?? 0;
  const totalProducts = cart?.totalProducts ?? 0;

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  return (
    <CartContext.Provider
      value={{ cart, refreshCart, addToCart, increment, decrement, deleteProduct, subtotal, totalProducts }}
    >
      {children}
    </CartContext.Provider>
  );
};
