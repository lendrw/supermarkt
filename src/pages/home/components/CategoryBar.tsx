import { useEffect, useRef, useState } from "react";
import { useDebounce } from "../../../shared/hooks";
import { ProductService } from "../../../shared/services/api";
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
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import type { ICategory, TCategories } from "../../../shared/types";

export const CategoryBar: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<TCategories>([]);

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
          setCategories(result);
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

  const [toggle, setToggle] = useState(false);

  return (
    <>
      {isLoading && !error && (
        <div className="relative px-8 bg-blue-900">
          <div className="flex overflow-x-auto no-scrollbar whitespace-nowrap scroll-smooth bg-blue-900">
            {[...Array(12)].map((_, i) => (
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
        <div
          className={
            toggle
              ? "absolute min-h-[calc(100vh-85px)] sm:min-h-[calc(100vh-60px)] bg-blue-900 z-10 w-full"
              : "relative px-8  bg-blue-900"
          }
        >
          <button
            onClick={() => scroll("left")}
            className={
              toggle
                ? "hidden"
                : "absolute left-3 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full z-10"
            }
          >
            <LuChevronLeft size={20} />
          </button>

          <div
            ref={scrollRef}
            className={
              toggle
                ? "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 w-full"
                : "flex overflow-x-auto no-scrollbar whitespace-nowrap scroll-smooth"
            }
          >
            {(categories ?? []).map((category: ICategory, index: number) => {
              const Icon =
                categoryIcons[category.slug as keyof typeof categoryIcons];
              return (
                <div key={index} className="flex items-center justify-center">
                  <CategoryCard
                    isLoading={false}
                    id={index}
                    title={category.name}
                    slug={category.slug}
                    icon={
                      Icon ? (
                        <Icon className="text-blue-700 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
                      ) : (
                        <LuShoppingBasket className="text-gray-500 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
                      )
                    }
                  />
                </div>
              );
            })}
          </div>

          <button
            onClick={() => scroll("right")}
            className={
              toggle
                ? "hidden"
                : "absolute right-3 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full z-10"
            }
          >
            <LuChevronRight size={20} />
          </button>
          <div className="w-full flex items-center justify-center">
            <button
              onClick={() => setToggle(!toggle)}
              className="text-white hover:bg-blue-400 active:bg-blue-500 w-8 h-8 sm:w-10 sm:h-10 rounded-3xl flex justify-center items-center transition-colors duration-300 ease-in-out"
            >
              {toggle ? (
                <IoIosArrowUp size={30} />
              ) : (
                <IoIosArrowDown size={30} />
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
