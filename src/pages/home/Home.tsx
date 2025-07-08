import { useEffect, useRef, useState } from "react";
import { BaseLayout } from "../../shared/layouts";
import { useDebounce } from "../../shared/hooks";
import { ProductService } from "../../shared/services/products/ProductService";
import type { ICategory } from "../../shared/services/products/ProductService";
import { CategoryCard } from "./components/CategoryCard";
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

export const Home = () => {
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
      const scrollAmount = 200;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <BaseLayout>
      {isLoading && <p className="text-center">Carregando categorias...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!isLoading && !error && (
        <div className="relative px-8">
          {/* Botão esquerdo */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full z-10"
          >
            <LuChevronLeft size={20} />
          </button>

          {/* Container com rolagem horizontal */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto no-scrollbar gap-2 whitespace-nowrap scroll-smooth"
          >
            {categories.map((category, index) => {
              const Icon =
                categoryIcons[category.slug as keyof typeof categoryIcons];
              return (
                <div key={index} className="inline-block">
                  <CategoryCard
                    id={index}
                    title={category.name}
                    slug={category.slug}
                    icon={Icon ? <Icon /> : <LuShoppingBasket />}
                  />
                </div>
              );
            })}
          </div>

          {/* Botão direito */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full z-10"
          >
            <LuChevronRight size={20} />
          </button>
        </div>
      )}
    </BaseLayout>
  );
};
