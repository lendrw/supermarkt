import { useContext } from "react";
import { CartContext } from "./CartContext/CartContext";
import { AuthContext } from "./AuthContext/AuthContext";

export const useCartContext = () => useContext(CartContext);
export const useAuthContext = () => useContext(AuthContext);