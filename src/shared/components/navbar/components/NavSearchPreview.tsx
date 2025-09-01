
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../../index";
import type { IProduct } from "../../../types";

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
      <div className="w-80 h-auto bg-white absolute rounded-lg top-14 shadow-lg p-4 z-50 flex flex-col">
        {isLoading && <LoadingSpinner isFullPage={false}/>}

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
