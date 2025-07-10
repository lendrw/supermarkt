import type { IProduct } from "../../../shared/services/api/products/ProductService";

interface Props {
  product: IProduct;
}

export const ProductDescriptionSection: React.FC<Props> = ({ product }) => (
  <div className="mb-5">
    <h2 className="text-2xl mb-2 text-gray-900">Product description</h2>
    <h3 className="text-xl mb-2 text-gray-900">{product.title}</h3>
    <p className="text-gray-700">{product.description}</p>
  </div>
);
