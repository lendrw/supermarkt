import { FaPlus, FaMinus, FaSpinner } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { RoundedButton } from "../roundedButton/RoundedButton";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

interface CartButtonProps {
  isLogged: boolean;
  isInCart: boolean;
  quantity: number;
  isLoading: boolean;
  className?: string;
  onAddToCart?: () => void;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

export const CartButton: React.FC<CartButtonProps> = ({
  isInCart,
  isLogged,
  quantity,
  isLoading,
  className,
  onAddToCart,
  onIncrement,
  onDecrement,
}) => {
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!isLogged) {
      navigate("/login");
    } else if (onAddToCart) {
      onAddToCart();
    }
  };

  return (
    <div className={clsx("flex items-center gap-2", className)}>
      {!isInCart || !isLogged ? (
        <RoundedButton
          type="button"
          onClick={handleAddToCart}
          className="bg-orange-500 text-white font-bold text-xs md:text-sm p-1 px-3 w-22 md:w-24 h-7 md:h-8 cursor-pointer flex flex-row items-center justify-around"
        >
          {isLoading ? (
            <FaSpinner className="animate-spin text-white" size={15} />
          ) : (
            "Add to cart"
          )}
        </RoundedButton>
      ) : (
        <div className="flex flex-row items-center justify-evenly bg-white w-22 md:w-24 h-7 md:h-8 rounded-3xl border-2 border-orange-500">
          <RoundedButton
            type="button"
            onClick={onDecrement}
            disabled={isLoading}
          >
            {quantity <2 ? <FaTrash size={14}/> : <FaMinus size={14} />}
          </RoundedButton>

          {isLoading ? (
            <FaSpinner className="animate-spin text-orange-500 w-6" size={15} />
          ) : (
            <span className="w-6 flex flex-row items-center justify-center">
              {quantity}
            </span>
          )}

          <RoundedButton
            type="button"
            onClick={onIncrement}
            disabled={isLoading}
          >
            <FaPlus size={14} />
          </RoundedButton>
        </div>
      )}
    </div>
  );
};
