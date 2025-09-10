import { Mock } from "../axios-config";
import type { ICart, ICartItem } from "../../../types/cart";
import { safeRequest } from "../../../utils/safeRequest";

const getLoggedUserCart = (userId: number): Promise<ICart | null> =>
  safeRequest(async () => {
    const { data } = await Mock.get<ICart>(`/cart/${userId}`);
    if (!data) return null;

    const items = data.items ?? [];
    const totalProducts = items.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    return { ...data, items, totalProducts, subtotal };
  }, "getLoggedUserCart");

const addToCart = (userId: number, product: Omit<ICartItem, "quantity">) =>
  safeRequest(async () => {
    const cart = await getLoggedUserCart(userId);
    const newItem: ICartItem = { ...product, quantity: 1 };

    if (!cart) {
      await Mock.post(`/cart/${userId}/items`, newItem);
      return { userId, items: [newItem] };
    }

    const existingItem = cart.items.find(
      (i) => i.productId === product.productId
    );
    const updatedItems = existingItem
      ? cart.items.map((i) =>
          i.productId === product.productId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      : [...cart.items, newItem];

    await Mock.post(`/cart/${userId}/items`, newItem);
    return { ...cart, items: updatedItems };
  }, "addToCart");

const updateQuantity = (userId: number, productId: number, delta: number) =>
  safeRequest(async () => {
    const cart = await getLoggedUserCart(userId);
    if (!cart) return null;

    const item = cart.items.find((i) => i.productId === productId);
    if (!item) return null;

    const updatedItem = { ...item, quantity: item.quantity + delta };
    if (updatedItem.quantity <= 0) {
      return deleteProduct(userId, productId);
    }

    await Mock.put(`/cart/${userId}/items/${productId}`, updatedItem);
    return {
      ...cart,
      items: cart.items.map((i) =>
        i.productId === productId ? updatedItem : i
      ),
    };
  }, "updateQuantity");

const deleteProduct = (userId: number, productId: number) =>
  safeRequest(async () => {
    const cart = await getLoggedUserCart(userId);
    if (!cart) return null;

    await Mock.delete(`/cart/${userId}/items/${productId}`);
    return {
      ...cart,
      items: cart.items.filter((i) => i.productId !== productId),
    };
  }, "deleteProduct");

export const CartService = {
  getLoggedUserCart,
  addToCart,
  updateQuantity,
  deleteProduct,
};
