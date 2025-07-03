import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface RenderStarsProps {
  rating: number;
  size?: number;
}

export const RenderStars: React.FC<RenderStarsProps> = ({ rating, size = 16 }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={i} className={`text-yellow-400`} style={{ width: size, height: size }} />);
  }

  if (hasHalfStar) {
    stars.push(
      <FaStarHalfAlt key="half" className={`text-yellow-400`} style={{ width: size, height: size }} />
    );
  }

  while (stars.length < 5) {
    stars.push(
      <FaRegStar
        key={`empty-${stars.length}`}
        className={`text-yellow-400`}
        style={{ width: size, height: size }}
      />
    );
  }

  return <div className="flex gap-0.5">{stars}</div>;
};
