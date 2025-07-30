import type { IProduct } from "../../../services/api";
import { useNavigate } from "react-router-dom";

interface NavSearchPreviewProps {
  products: IProduct[];
  isLoading: boolean;
  error?: string | null;
  isVisible: boolean;
  onSelect?: () => void;
}

export const NavSearchPreview: React.FC<NavSearchPreviewProps> = ({
  products,
  isLoading,
  error,
  isVisible,
  onSelect
}) => {
  const navigate = useNavigate();

  return (
    isVisible && (
      <div className="w-100 h-60 bg-white absolute rounded-lg top-14 shadow-lg p-4 z-50">
        {isLoading && <p>Carregando...</p>}

        {error && <p className="text-red-500">{error}</p>}

        {!isLoading && !error && products.length === 0 && (
          <p>No results found.</p>
        )}

        {!isLoading &&
          !error &&
          products.map((product) => (
            <p
              key={product.id}
              className="cursor-pointer hover:bg-blue-100 p-2 rounded"
              onClick={() => {
                navigate(`/products/${product.id}`);
                onSelect?.(); 
              }}
            >
              {product.title}
            </p>
          ))}
      </div>
    )
  );
};
