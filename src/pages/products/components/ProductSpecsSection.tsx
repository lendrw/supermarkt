import type { IProduct } from "../../../shared/services/products/ProductService";

interface Props {
  product: IProduct;
}

export const ProductSpecsSection: React.FC<Props> = ({ product }) => (
  <div>
    <div className="mb-5">
      <h2 className="text-2xl text-gray-900">Dimensions</h2>
      <ul className="list-disc ml-6 text-gray-700">
        <li>Width: {product.dimensions.width.toFixed(0)}cm</li>
        <li>Height: {product.dimensions.height.toFixed(0)}cm</li>
        <li>Depth: {product.dimensions.depth.toFixed(0)}cm</li>
      </ul>
    </div>

    <div className="mb-5">
      <h2 className="text-2xl text-gray-900">Warranty</h2>
      <p className="text-gray-700">{product.warrantyInformation}</p>
    </div>

    <div className="mb-5">
      <h2 className="text-2xl text-gray-900">Return policy</h2>
      <p className="text-gray-700">{product.returnPolicy}</p>
    </div>
  </div>
);
