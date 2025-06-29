import { Environment } from "../../environment";
import { Api } from "../axios-config";

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

const getAll = async (): Promise<TProductsWithCount | Error> => {
  try {
    const response = await Api.get("/products");

    const data = response.data;

    return {
      products: data.products,
      limit: data.limit,
      total: data.total,
    };
    
  } catch (error: any) {
    console.error("Erro ao buscar produtos:", error);
    return new Error(error.message || "Erro ao listar os produtos.");
  }
};

export const ProductService = {
  getAll,
};
