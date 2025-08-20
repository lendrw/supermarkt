import { Api } from "../axios-config";
import { Environment } from "../../../environment";
import type { IProduct, TCategories, TProductsWithCount } from "../../../types";



function handleApiError(error: unknown, fallbackMessage: string): Error {
  console.error(fallbackMessage, error);

  if (error instanceof Error) {
    return new Error(error.message || fallbackMessage);
  }

  return new Error(fallbackMessage);
}

const getAll = async (page: number): Promise<TProductsWithCount | Error> => {
  try {
    const limit = Environment.LIMIT;
    const skip = (page - 1) * limit;
    const res = await Api.get(`/products?limit=${limit}&skip=${skip}`);

    const data = res.data;

    return {
      products: data.products,
      limit: data.limit,
      total: data.total,
    };
  } catch (error) {
    return handleApiError(error, "Failed to fetch products.");
  }
};

const getById = async (id: number): Promise<IProduct | Error> => {
  try {
    const res = await Api.get(`/products/${id}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    return handleApiError(error, "Failed to fetch product.");
  }
};

const getCategories = async (limit = 0): Promise<TCategories | Error> => {
  try {
    const res = await Api.get(`/products/categories?limit=${limit}`);

    return res;
  } catch (error) {
    return handleApiError(error, "Failed to fetch categories.");
  }
};

const getProductsByCategory = async (
  page: number,
  slug: string | undefined
): Promise<TProductsWithCount | Error> => {
  try {
    const limit = Environment.LIMIT;
    const skip = (page - 1) * limit;

    const res = await Api.get(
      `/products/category/${slug}?limit=${limit}&skip=${skip}`
    );

    console.log(res);
    const data = res.data;

    return {
      products: data.products,
      limit: data.limit,
      total: data.total,
    };
  } catch (error) {
    return handleApiError(error, "Failed to fetch products.");
  }
};

const getSearchProduct = async (
  page: number,
  query: string
): Promise<TProductsWithCount | Error> => {
  try {
    const limit = Environment.LIMIT;
    const skip = (page - 1) * limit;

    const res = await Api.get(
      `/products/search?q=${query}&limit=${limit}&skip=${skip}`
    );
    console.log(res);

    const data = res.data;

    return {
      products: data.products,
      limit: data.limit,
      total: data.total,
    };
  } catch (error) {
    return handleApiError(error, "Failed to search for products.");
  }
};

export const ProductService = {
  getAll,
  getById,
  getCategories,
  getProductsByCategory,
  getSearchProduct,
};
