import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { CartService } from "../services/api/cart/CartService";
import type { ICart, ICartItem } from "../types";
import { useAuthContext } from "./AuthContext";

interface ICartContext {
  cart: ICart | null;
  refreshCart: () => Promise<void>;
  addToCart: (product: Omit<ICartItem, "quantity">) => Promise<void>;
  increment: (productId: number) => Promise<void>;
  decrement: (productId: number) => Promise<void>;
}

const CartContext = createContext<ICartContext>({} as ICartContext);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { userId } = useAuthContext();
  const [cart, setCart] = useState<ICart | null>(null);

  const refreshCart = useCallback(async () => {
    if (!userId) return;
    const c = await CartService.getLoggedUserCart(userId);
    setCart(c);
  }, [userId]);

  const addToCart = useCallback(async (product: Omit<ICartItem, "quantity">) => {
    if (!userId) return;
    await CartService.addToCart(userId, product);
    await refreshCart();
  }, [userId, refreshCart]);

  const increment = useCallback(async (productId: number) => {
    if (!userId) return;
    await CartService.updateQuantity(userId, productId, +1);
    await refreshCart();
  }, [userId, refreshCart]);

  const decrement = useCallback(async (productId: number) => {
    if (!userId) return;
    await CartService.updateQuantity(userId, productId, -1);
    await refreshCart();
  }, [userId, refreshCart]);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  return (
    <CartContext.Provider value={{ cart, refreshCart, addToCart, increment, decrement }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
