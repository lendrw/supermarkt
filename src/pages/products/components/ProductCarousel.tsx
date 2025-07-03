import { useState } from "react";

interface Props {
  product: {
    title: string;
    images: string[];
  };
}

export const ProductCarousel: React.FC<Props> = ({ product }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <>
      {/* Carousel */}
      <div className="flex gap-4">
        {/* Thumbnails */}
        <div className="flex flex-col gap-2">
          {product.images.map((imgUrl, index) => (
            <img
              key={index}
              src={imgUrl}
              alt={`thumb ${index}`}
              onClick={() => handleThumbnailClick(index)}
              className={`w-20 h-20 object-cover cursor-pointer rounded-lg border-2 ${
                selectedIndex === index
                  ? "border-blue-400"
                  : "border-transparent"
              }`}
            />
          ))}
        </div>

        {/* Main image */}
        <div className="w-96 h-96 rounded overflow-hidden cursor-zoom-in">
          <img
            src={product.images[selectedIndex]}
            alt={`main ${selectedIndex}`}
            className="w-full h-full object-contain"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center"
          onClick={() => setIsModalOpen(false)}
        >
          <img
            src={product.images[selectedIndex]}
            alt="Zoom"
            className="max-w-4xl max-h-full object-contain cursor-zoom-out"
          />
        </div>
      )}
    </>
  );
};
