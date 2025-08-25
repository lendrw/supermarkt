import { Mock } from "../axios-config";
import type { ICart, ICartItem } from "../../../types/cart";

const getLoggedUserCart = async (userId: number): Promise<ICart | null> => {
  const { data } = await Mock.get<ICart[]>(`/carts?userId=${userId}`);
  
  if (data.length === 0) return null;

  const cart = data[0];

  const totalProducts = cart.items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return {
    ...cart,
    totalProducts,
    subtotal,
  };
};


const addToCart = async (userId: number, product: Omit<ICartItem, "quantity">) => {
  const cart = await getLoggedUserCart(userId);
  const newItem: ICartItem = {
    productId: product.productId,
    title: product.title,
    thumbnail: product.thumbnail,
    price: product.price,
    quantity: 1,
  };

  if (!cart) {
    const newCart = { userId, items: [newItem] };
    await Mock.post("/carts", newCart);
    return newCart;
  } else {
    const existingItem = cart.items.find(item => item.productId === product.productId);

    let updatedItems;
    if (existingItem) {
      updatedItems = cart.items.map(item =>
        item.productId === product.productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedItems = [...cart.items, newItem];
    }

    const updatedCart = { ...cart, items: updatedItems };
    await Mock.put(`/carts/${cart.id}`, updatedCart);
    return updatedCart;
  }
};

const updateQuantity = async (userId: number, productId: number, delta: number) => {
  const cart = await getLoggedUserCart(userId);
  if (!cart) return null;

  const updatedItems = cart.items
    .map(item =>
      item.productId === productId
        ? { ...item, quantity: item.quantity + delta }
        : item
    )
    .filter(item => item.quantity > 0); 

  const updatedCart = { ...cart, items: updatedItems };
  await Mock.put(`/carts/${cart.id}`, updatedCart);
  return updatedCart;
};

export const CartService = {
  getLoggedUserCart,
  addToCart,
  updateQuantity,
};
