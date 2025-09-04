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
  // Mock para categorias
  http.get("https://dummyjson.com/products/categories", ({ request }) => {
    return HttpResponse.json([
      "beauty",
      "fragrances",
      "furniture",
      "groceries",
      "home-decoration",
    ]);
  }),

  // Mock para produtos
  http.get("https://dummyjson.com/products", ({ request }) => {
    const url = new URL(request.url);
    const limit = url.searchParams.get("limit") ?? "20";
    const skip = url.searchParams.get("skip") ?? "0";

    return HttpResponse.json({
      products: [
        { id: 1, title: "Product 1", price: 100 },
        { id: 2, title: "Product 2", price: 200 },
      ],
      total: 2,
      skip: Number(skip),
      limit: Number(limit),
    });
  }),
  
  // GET usuários (com suporte a query params)
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

      // 🔑 Aqui retornamos o token e id do usuário
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

  // POST usuário (cadastro)
  http.post("/api/users", async ({ request }) => {
    const body = (await request.json()) as Partial<IUser> | null;

    if (!body || !body.email || !body.password) {
      return HttpResponse.json({ message: "Dados inválidos" }, { status: 400 });
    }

    // checar se email já existe
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

    // 🔑 retorna direto os dados de autenticação
    return HttpResponse.json(
      {
        accessToken: newUser.accessToken,
        userId: newUser.id,
      },
      { status: 201 }
    );
  }),

  // GET carrinho por userId
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

  // PUT carrinho
  http.put("/api/cart/:userId", async ({ request, params }) => {
    const { userId } = params;
    const body = (await request.json()) as Partial<ICart> | null;

    if (!body || !body.items) {
      return HttpResponse.json({ message: "Dados inválidos" }, { status: 400 });
    }

    const index = carts.findIndex((c) => c.userId === Number(userId));

    if (index === -1) {
      const items = body.items as ICartItem[];

      const totalProducts = items.reduce((acc, item) => acc + item.quantity, 0);
      const subtotal = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      const newCart: ICart = {
        id: carts.length + 1,
        userId: Number(userId),
        items,
        totalProducts,
        subtotal,
      };

      carts.push(newCart);
      return HttpResponse.json(newCart, { status: 201 });
    }

    carts[index] = {
      ...carts[index],
      ...body,
      totalProducts: body.items!.reduce((acc, item) => acc + item.quantity, 0),
      subtotal: body.items!.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
    };
  }),
];
