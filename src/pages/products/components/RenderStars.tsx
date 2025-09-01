import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface RenderStarsProps {
  rating: number;
}

export const RenderStars: React.FC<RenderStarsProps> = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  // classes de tamanho responsivo
  const sizeClasses = "w-3 h-3 sm:w-4 sm:h-4 ";

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={i} className={`text-yellow-400 ${sizeClasses}`} />);
  }

  if (hasHalfStar) {
    stars.push(
      <FaStarHalfAlt key="half" className={`text-yellow-400 ${sizeClasses}`} />
    );
  }

  while (stars.length < 5) {
    stars.push(
      <FaRegStar
        key={`empty-${stars.length}`}
        className={`text-yellow-400 ${sizeClasses}`}
      />
    );
  }

  return <div className="flex gap-0.5">{stars}</div>;
};
