import { useEffect, useRef, useState } from "react";
import { useDebounce } from "../../../shared/hooks";
import { ProductService } from "../../../shared/services/api";
import type { ICategory } from "../../../shared/services/api";
import { CategoryCard } from "./CategoryCard";
import {
  LuBrush,
  LuSprayCan,
  LuSofa,
  LuShoppingBasket,
  LuLamp,
  LuUtensilsCrossed,
  LuLaptop,
  LuShirt,
  LuClock,
  LuSmartphone,
  LuBike,
  LuDroplet,
  LuDumbbell,
  LuGlasses,
  LuTabletSmartphone,
  LuCar,
  LuShoppingBag,
  LuGem,
  LuChevronLeft,
  LuChevronRight,
} from "react-icons/lu";
import { GiAmpleDress, GiHighHeel, GiRunningShoe } from "react-icons/gi";

export const CategoryBar: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<ICategory[]>([]);

  const categoryIcons = {
    beauty: LuBrush,
    fragrances: LuSprayCan,
    furniture: LuSofa,
    groceries: LuShoppingBasket,
    "home-decoration": LuLamp,
    "kitchen-accessories": LuUtensilsCrossed,
    laptops: LuLaptop,
    "mens-shirts": LuShirt,
    "mens-shoes": GiRunningShoe,
    "mens-watches": LuClock,
    "mobile-accessories": LuSmartphone,
    motorcycle: LuBike,
    "skin-care": LuDroplet,
    smartphones: LuSmartphone,
    "sports-accessories": LuDumbbell,
    sunglasses: LuGlasses,
    tablets: LuTabletSmartphone,
    tops: LuShirt,
    vehicle: LuCar,
    "womens-bags": LuShoppingBag,
    "womens-dresses": GiAmpleDress,
    "womens-jewellery": LuGem,
    "womens-shoes": GiHighHeel,
    "womens-watches": LuClock,
  };

  const { debounce } = useDebounce();

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      ProductService.getCategories().then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          setError(result.message);
        } else {
          setCategories(result.data);
        }
      });
    });
  }, [debounce]);

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = container.clientWidth;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {isLoading && !error && (
        <div className="relative px-8 bg-blue-900">
          <div className="flex overflow-x-auto no-scrollbar whitespace-nowrap scroll-smooth bg-blue-900">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="inline-block">
                <CategoryCard
                  isLoading={true}
                  id={i}
                  title=""
                  slug=""
                  icon={null}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {error && <p className="text-center text-red-500">{error}</p>}

      {!isLoading && !error && (
        <div className="relative px-8 bg-blue-900">
          <button
            onClick={() => scroll("left")}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full z-10"
          >
            <LuChevronLeft size={20} />
          </button>

          <div
            ref={scrollRef}
            className="flex overflow-x-auto no-scrollbar whitespace-nowrap scroll-smooth bg-blue-900"
          >
            {categories.map((category, index) => {
              const Icon =
                categoryIcons[category.slug as keyof typeof categoryIcons];
              return (
                <div key={index} className="inline-block">
                  <CategoryCard
                    isLoading={false}
                    id={index}
                    title={category.name}
                    slug={category.slug}
                    icon={Icon ? <Icon /> : <LuShoppingBasket />}
                  />
                </div>
              );
            })}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full z-10"
          >
            <LuChevronRight size={20} />
          </button>
        </div>
      )}
    </>
  );
};
