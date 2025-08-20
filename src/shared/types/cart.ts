import type { IProduct } from "./product";

export interface ICartItem extends IProduct {
  quantity: number;
}

export interface ICart {
  userId: number;
  items: ICartItem[];
}
