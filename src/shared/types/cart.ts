export interface ICartItem {
  productId: number;
  title: string;
  thumbnail: string;
  price: number;
  quantity: number;
  brand: string;
  discountPercentage: number;
  shippingInformation: string;
  availabilityStatus: string;
  tags: string[];
}

export interface ICart {
  id: number;
  userId: number;
  items: ICartItem[];
  subtotal: number;
  totalProducts: number;
}

export interface ICartContext {
  cart: ICart | null;
  subtotal: number;
  totalProducts: number;
  refreshCart: () => Promise<void>;
  addToCart: (product: Omit<ICartItem, "quantity">) => Promise<void>;
  increment: (productId: number) => Promise<void>;
  decrement: (productId: number) => Promise<void>;
  deleteProduct: (productId: number) => Promise<void>;
}
