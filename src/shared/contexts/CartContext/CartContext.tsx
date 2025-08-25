import { createContext } from "react";
import type { ICartContext } from "../../types";

export const CartContext = createContext<ICartContext>({} as ICartContext);
