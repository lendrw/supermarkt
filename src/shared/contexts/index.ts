import { useContext } from "react";
import { CartContext } from "./CartContext/CartContext";
import { AuthContext } from "./AuthContext/AuthContext";
import { SearchContext } from "./SearchContext/SearchContext";

export const useCartContext = () => useContext(CartContext);
export const useAuthContext = () => useContext(AuthContext);
export const useSearchContext = () => {
  return useContext(SearchContext);
};
