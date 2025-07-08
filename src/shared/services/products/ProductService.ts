import { Api } from "../axios-config";
import { Environment } from "../../environment";

export interface IProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  thumbnail: string;
  images: string[];
}

type TProductsWithCount = {
  products: IProduct[];
  limit: number;
  total: number;
};

export interface ICategory {
  slug: string;
  name: string;
  url: string;
}

type TCategories = {
  data: ICategory[];
};

const getAll = async (page: number): Promise<TProductsWithCount | Error> => {
  try {
    const limit = Environment.LIMIT;
    const skip = (page - 1) * limit;

    const response = await Api.get(`/products?limit=${limit}&skip=${skip}`);

    console.log(response);
    const data = response.data;

    return {
      products: data.products,
      limit: data.limit,
      total: data.total,
    };
  } catch (error: unknown) {
    console.error("Erro ao buscar produtos:", error);
    if (error instanceof Error) {
      return new Error(error.message || "Erro ao listar os produtos.");
    }
    return new Error("Erro ao listar os produtos.");
  }
};

const getById = async (id: number): Promise<IProduct | Error> => {
  try {
    const response = await Api.get(`/products/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("Erro ao buscar o produto:", error);
    if (error instanceof Error) {
      return new Error(error.message || "Erro ao mostrar o produto.");
    }
    return new Error("Erro ao mostrar o produto.");
  }
};

const getCategories = async (limit = 0): Promise<TCategories | Error> => {
  try {
    const response = await Api.get(`/products/categories?limit=${limit}`);

    console.log(response);

    return response;
  } catch (error: unknown) {
    console.error("Erro ao buscar produtos:", error);
    if (error instanceof Error) {
      return new Error(error.message || "Erro ao listar os produtos.");
    }
    return new Error("Erro ao listar os produtos.");
  }
};

const getProductsByCategory = async (
  page: number,
  slug: string | undefined
): Promise<TProductsWithCount | Error> => {
  try {
    const limit = Environment.LIMIT;
    const skip = (page - 1) * limit;

    const response = await Api.get(
      `/products/category/${slug}?limit=${limit}&skip=${skip}`
    );

    console.log(response);
    const data = response.data;

    return {
      products: data.products,
      limit: data.limit,
      total: data.total,
    };
  } catch (error: unknown) {
    console.error("Erro ao buscar produtos:", error);
    if (error instanceof Error) {
      return new Error(error.message || "Erro ao listar os produtos.");
    }
    return new Error("Erro ao listar os produtos.");
  }
};

export const ProductService = {
  getAll,
  getById,
  getCategories,
  getProductsByCategory,
};
