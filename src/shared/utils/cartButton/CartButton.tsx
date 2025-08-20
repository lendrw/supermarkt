import { FaPlus, FaMinus } from "react-icons/fa";
import { RoundedButton } from "../roundedButton/RoundedButton";
import { useNavigate } from "react-router-dom"; // para redirecionar

interface CartButtonProps {
  isLogged: boolean;
  isInCart: boolean;
  quantity: number;
  onAddToCart?: () => void;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

export const CartButton: React.FC<CartButtonProps> = ({
  isInCart,
  isLogged,
  quantity,
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
    <div className="flex items-center gap-2">
      {!isInCart || !isLogged ? (
        <RoundedButton
          onClick={handleAddToCart}
          className="bg-orange-500 text-white rounded-3xl p-1 px-3 text-sm cursor-pointer"
        >
          Add to cart
        </RoundedButton>
      ) : (
        <div className="flex flex-row items-center justify-around bg-white w-24 rounded-3xl border-2 border-orange-500">
          <RoundedButton onClick={onDecrement}>
            <FaMinus size={14}/>
          </RoundedButton>
          <span>{quantity}</span>
          <RoundedButton onClick={onIncrement}>
            <FaPlus size={14}/>
          </RoundedButton>
        </div>
      )}
    </div>
  );
};
