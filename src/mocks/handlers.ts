import { http, HttpResponse } from "msw";
import type { IUser, ICart, ICartItem } from "../shared/types";

const users: IUser[] = [
  {
    id: 1,
    email: "l@gmail.com",
    password: "abc",
    accessToken: "764da99e-75cf-4597-99ef-b70c2d9d3b83",
  },
  {
    id: 2,
    email: "j@gmail.com",
    password: "abc",
    accessToken: "764da99e-75cf-4597-99ef-b70c2d9d3b83",
  },
  {
    id: 3,
    email: "w@gmail.com",
    password: "umasenha",
    accessToken: "aba42a27-07e8-4884-a2e9-972d43960eda",
  },
];

const carts: ICart[] = [
  {
    id: 1,
    userId: 3,
    items: [
      {
        productId: 1,
        title: "Essence Mascara Lash Princess",
        thumbnail:
          "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
        price: 9.99,
        quantity: 1,
        availabilityStatus: "In Stock",
        brand: "Essence",
        discountPercentage: 10.48,
        shippingInformation: "Ships in 3-5 business days",
        tags: ["beauty", "mascara"],
      },
    ],
    totalProducts: 1,
    subtotal: 9.99,
  },
];

export const handlers = [
  http.get("/api/users", ({ request }) => {
    const url = new URL(request.url);
    const email = url.searchParams.get("email");
    const password = url.searchParams.get("password");

    if (email && password) {
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        return HttpResponse.json(
          { message: "Invalid credentials" },
          { status: 401 }
        );
      }

      return HttpResponse.json(
        {
          accessToken: user.accessToken,
          userId: user.id,
        },
        { status: 200 }
      );
    }

    if (email) {
      const user = users.find((u) => u.email === email);
      if (user) return HttpResponse.json([user], { status: 200 });
      return HttpResponse.json([], { status: 200 });
    }

    return HttpResponse.json(users, { status: 200 });
  }),

  http.post("/api/users", async ({ request }) => {
    const body = (await request.json()) as Partial<IUser> | null;

    if (!body || !body.email || !body.password) {
      return HttpResponse.json({ message: "Dados inválidos" }, { status: 400 });
    }

    const exists = users.some((u) => u.email === body.email);
    if (exists) {
      return HttpResponse.json(
        { message: "Email is already registered." },
        { status: 409 }
      );
    }

    const newUser: IUser = {
      id: users.length + 1,
      email: body.email,
      password: body.password,
      accessToken: crypto.randomUUID(),
    };

    users.push(newUser);

    return HttpResponse.json(
      {
        accessToken: newUser.accessToken,
        userId: newUser.id,
      },
      { status: 201 }
    );
  }),

  http.get("/api/cart/:userId", ({ params }) => {
    const { userId } = params;
    const cart = carts.find((c) => c.userId === Number(userId));
    if (!cart) {
      return HttpResponse.json(
        { message: "Carrinho não encontrado" },
        { status: 404 }
      );
    }
    return HttpResponse.json(cart, { status: 200 });
  }),

  http.put(
    "/api/cart/:userId/items/:productId",
    async ({ request, params }) => {
      const { userId, productId } = params;
      const body = (await request.json()) as Partial<ICartItem>;

      const cart = carts.find((c) => c.userId === Number(userId));
      if (!cart) {
        return HttpResponse.json(
          { message: "Carrinho não encontrado" },
          { status: 404 }
        );
      }

      const index = cart.items.findIndex(
        (i) => i.productId === Number(productId)
      );
      if (index === -1) {
        return HttpResponse.json(
          { message: "Produto não encontrado" },
          { status: 404 }
        );
      }

      cart.items[index] = { ...cart.items[index], ...body };

      cart.totalProducts = cart.items.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      cart.subtotal = cart.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      return HttpResponse.json(cart, { status: 200 });
    }
  ),

  http.delete("/api/cart/:userId/items/:productId", ({ params }) => {
    const { userId, productId } = params;

    const cart = carts.find((c) => c.userId === Number(userId));
    if (!cart) {
      return HttpResponse.json(
        { message: "Carrinho não encontrado" },
        { status: 404 }
      );
    }

    cart.items = cart.items.filter((i) => i.productId !== Number(productId));

    cart.totalProducts = cart.items.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    cart.subtotal = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    return HttpResponse.json(cart, { status: 200 });
  }),

  http.post("/api/cart/:userId/items", async ({ request, params }) => {
    const { userId } = params;
    const body = (await request.json()) as ICartItem;

    let cart = carts.find((c) => c.userId === Number(userId));

    if (!cart) {
      cart = {
        id: carts.length + 1,
        userId: Number(userId),
        items: [body],
        totalProducts: body.quantity,
        subtotal: body.price * body.quantity,
      };
      carts.push(cart);
      return HttpResponse.json(cart, { status: 201 });
    }

    const existingItem = cart.items.find(
      (item) => item.productId === body.productId
    );
    if (existingItem) {
      existingItem.quantity += body.quantity;
    } else {
      cart.items.push(body);
    }

    cart.totalProducts = cart.items.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    cart.subtotal = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    return HttpResponse.json(cart, { status: 200 });
  }),
];
