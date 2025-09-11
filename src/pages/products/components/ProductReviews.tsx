import type { IProduct } from "../../../shared/types";
import { RenderStars } from "./RenderStars";

interface Props {
  product: IProduct;
}

export const ProductReviews: React.FC<Props> = ({ product }) => {
  return (
    <div className="mt-2">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900">
        Customer Reviews
      </h2>

      {(product.reviews ?? []).length === 0 ? (
        <p className="text-gray-600">No reviews available.</p>
      ) : (
        <div className="space-y-4">
          {(product.reviews ?? []).map((review, index) => (
            <div
              key={index}
              className="border border-gray-200 p-4 rounded shadow-sm"
            >
              <div className="flex justify-between items-center mb-1">
                <p className="font-bold text-gray-800">{review.reviewerName}</p>
                <p className="text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
              <div className="text-yellow-500 font-semibold">
                Rating: <RenderStars rating={review.rating} />
              </div>
              <p className="text-gray-700 mt-2 italic">"{review.comment}"</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
