import { Api } from "../axios-config";
import { Environment } from "../../../environment";
import type { IProduct, TCategories, TProductsWithCount } from "../../../types";
import { safeRequest } from "../../../utils/safeRequest";

function mapProductsResponse(data: TProductsWithCount): TProductsWithCount {
  return {
    products: data.products,
    limit: data.limit,
    total: data.total,
  };
}

const getAll = async (page: number): Promise<TProductsWithCount | Error> => {
  const limit = Environment.LIMIT;
  const skip = (page - 1) * limit;

  const res = await safeRequest(
    () => Api.get(`/products?limit=${limit}&skip=${skip}`),
    "getAll products"
  );

  if (!res) return new Error("Failed to fetch products.");

  return mapProductsResponse(res.data);
};

const getById = async (id: number): Promise<IProduct | Error> => {
  const res = await safeRequest(() => Api.get(`/products/${id}`), "getById");

  if (!res) return new Error("Failed to fetch product.");

  return res.data;
};

const getCategories = async (limit = 0): Promise<TCategories | Error> => {
  const res = await safeRequest(
    () => Api.get(`/products/categories?limit=${limit}`),
    "getCategories"
  );

  if (!res) return new Error("Failed to fetch categories.");

  return res.data;
};

const getProductsByCategory = async (
  page: number,
  slug: string | undefined
): Promise<TProductsWithCount | Error> => {
  const limit = Environment.LIMIT;
  const skip = (page - 1) * limit;

  const res = await safeRequest(
    () => Api.get(`/products/category/${slug}?limit=${limit}&skip=${skip}`),
    "getProductsByCategory"
  );

  if (!res) return new Error("Failed to fetch products by category.");

  return mapProductsResponse(res.data);
};

const getSearchProduct = async (
  page: number,
  query: string
): Promise<TProductsWithCount | Error> => {
  const limit = Environment.LIMIT;
  const skip = (page - 1) * limit;

  const res = await safeRequest(
    () => Api.get(`/products/search?q=${query}&limit=${limit}&skip=${skip}`),
    "getSearchProduct"
  );

  if (!res) return new Error("Failed to search for products.");

  return mapProductsResponse(res.data);
};

export const ProductService = {
  getAll,
  getById,
  getCategories,
  getProductsByCategory,
  getSearchProduct,
};
