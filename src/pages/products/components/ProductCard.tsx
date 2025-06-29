import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

interface IProductCardProps {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  rating: number;
  discountPercentage: number;
}

export const ProductCard: React.FC<IProductCardProps> = ({
  id,
  title,
  thumbnail,
  price,
  rating,
  discountPercentage,
}) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400 w-4 h-4" />);
    }

    if (hasHalfStar) {
      stars.push(
        <FaStarHalfAlt key="half" className="text-yellow-400 w-4 h-4" />
      );
    }

    while (stars.length < 5) {
      stars.push(
        <FaRegStar
          key={`empty-${stars.length}`}
          className="text-yellow-400 w-4 h-4"
        />
      );
    }

    return stars;
  };

  return (
    <div
      key={id}
      className="rounded-lg p-4 shadow hover:shadow-md transition relative bg-white"
    >
      <img
        alt={title}
        src={thumbnail}
        className="h-40 w-full object-contain mb-4"
      />
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <div className="flex items-center gap-2">
        <span className="text-blue-600 font-bold">U$ {price.toFixed(2)}</span>
        {discountPercentage >= 10 && (
          <span className="text-gray-500 line-through text-sm">
            U$ {(price / (1 - discountPercentage / 100)).toFixed(2)}
          </span>
        )}
      </div>
      <p className="flex gap-1 items-center justify-end mt-1">
        {renderStars(rating)}
      </p>
      {discountPercentage >= 10 && (
        <p className="bg-yellow-200 text-red-500 text-lg font-bold rounded-md absolute p-1 top-0 right-0">
          {discountPercentage.toFixed(0)}% OFF
        </p>
      )}
    </div>
  );
};
