import React, { createContext, useContext, useState, useEffect } from "react";
import { CartService } from "../services/api";
import type { ICart } from "../services/api";
import { useAuthContext } from "./AuthContext";

interface ICartContextData {
  cart: ICart | null;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext({} as ICartContextData);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<ICart | null>(null);
  const { userId } = useAuthContext();

  const refreshCart = async () => {
    if (!userId) return;
    const result = await CartService.getLoggedUserCart(userId);
    setCart(result);
  };

  useEffect(() => {
    refreshCart();
  }, [userId]);

  return (
    <CartContext.Provider value={{ cart, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
