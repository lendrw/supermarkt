import React, { useState, useRef, useEffect } from "react";
import { SiCoinmarketcap } from "react-icons/si";
import { FaSearch } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import { NavLinks } from "./components/NavLinks";
import { useNavigate } from "react-router-dom";
import { NavSearchPreview } from "./components/NavSearchPreview";
import { ProductService } from "../../services/api";
import { useDebounce } from "../../hooks/UseDebounce";
import { useAuthContext, useCartContext } from "../../contexts";
import type { IProduct } from "../../types";

export const Navbar: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const { debounce } = useDebounce();

  const [searchTerm, setSearchTerm] = useState("");

  const { isAuthenticated, logout } = useAuthContext();

  const { totalProducts } = useCartContext();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    debounce(async () => {
      if (value.trim() === "") {
        setIsVisible(false);
        setProducts([]);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      const result = await ProductService.getSearchProduct(1, value);

      if (result instanceof Error) {
        setError(result.message);
        setProducts([]);
      } else {
        setProducts(result.products.slice(0, 5));
        setIsVisible(true);
      }

      setIsLoading(false);
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedTerm = searchTerm.trim();
    if (trimmedTerm !== "") {
      navigate(`/products/search/${trimmedTerm}`);
    } else {
      navigate(`/home`);
    }
  };

  const links = [
    {
      label: isAuthenticated ? "Logout" : "Login",
      onClick: () => {
        if (isAuthenticated) {
          logout();
        } else {
          navigate("/login");
        }
      },
    },
    { label: "Favorites", onClick: () => console.log("Favoritos") },
    {
      label: "",
      icon: <RiShoppingCartLine />,
      appendix: isAuthenticated && (
        <div
          data-testid="cart-total-products"
          className="bg-orange-500 w-4 h-4 md:w-5 md:h-5 text-white text-xs md:text-sm rounded-2xl flex justify-center items-center absolute top-1 left-1/1 -translate-x-1/2 -translate-y-1/2"
        >
          {totalProducts}
        </div>
      ),
      onClick: () => navigate("/cart"),
    },
  ];

  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed h-[85px] sm:h-[60px] top-0 left-0 right-0 z-50 bg-white shadow-md px-3 md:px-6 py-2 flex items-baseline sm:items-center justify-between">
      <div
        className=" flex text-lg  font-bold text-blue-600 cursor-pointer md:text-xl"
        onClick={() => {
          navigate(`/home`);
        }}
      >
        Super
        <SiCoinmarketcap className="w-6  h-6 md:w-7 md:h-7 text-orange-500" />
        arket
      </div>

      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 sm:translate-x-0 sm:static w-70 md:w-80 lg:w-100">
        <form
          ref={formRef}
          className="flex  h-9 md:h-10"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Search for a product"
            className="border border-blue-500 rounded-l-lg px-3 py-1 w-full md:w-80 lg:w-100 h-9 md:h-10 focus:outline-none placeholder-gray-400 placeholder:text-sm"
            value={searchTerm}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="border border-blue-500 bg-blue-500 w-9  text-white p-2 rounded-r-lg hover:bg-blue-600 flex items-center justify-center"
          >
            <FaSearch className="w-4 h-4" />
          </button>
          <NavSearchPreview
            isLoading={isLoading}
            products={products}
            error={error}
            isVisible={isVisible}
            onSelect={() => {
              setIsVisible(false);
              setSearchTerm("");
            }}
          />
        </form>
      </div>

      <NavLinks links={links} />
    </nav>
  );
};
