import { Mock } from "../axios-config";
import type { ICart, IProduct } from "../../../types";



// Função para buscar carrinho do usuário logado
const getLoggedUserCart = async (userId: number): Promise<ICart | null> => {
  try {
    const { data } = await Mock.get<ICart[]>(`/carts?userId=${userId}`);

    if (data.length > 0) {
      return data[0]; // retorna o carrinho do usuário
    }

    return null; // se não existir
  } catch (error) {
    console.error("Erro ao buscar carrinho:", error);
    return null;
  }
};

const addToCart = async (userId: number, product: IProduct) => {
  const cart = await getLoggedUserCart(userId);

  if (!cart) {
    // cria novo carrinho para o user
    const newCart = {
      userId,
      items: [{ ...product, quantity: 1 }],
    };
    await Mock.post("/carts", newCart);
    return newCart;
  } else {
    // atualiza carrinho existente
    const updatedItems = [...cart.items, { ...product, quantity: 1 }];
    const updatedCart = { ...cart, items: updatedItems };

    await Mock.put(`/carts/${cart.id}`, updatedCart);
    return updatedCart;
  }
};

const updateQuantity = async (
  userId: number,
  productId: number,
  delta: number
) => {
  const cart = await getLoggedUserCart(userId);
  if (!cart) return null;

  const updatedItems = cart.items.map((item) =>
    item.id === productId
      ? { ...item, quantity: Math.max(1, item.quantity + delta) } // garante >= 1
      : item
  );

  const updatedCart = { ...cart, items: updatedItems };
  await Mock.put(`/carts/${cart.id}`, updatedCart);
  return updatedCart;
};

export const CartService = {
  getLoggedUserCart,
  addToCart,
  updateQuantity
};
