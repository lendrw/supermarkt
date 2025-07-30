import React, { useState, useRef, useEffect } from "react";
import { SiCoinmarketcap } from "react-icons/si";
import { FaSearch } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import { NavLinks } from "./components/NavLinks";
import { useNavigate } from "react-router-dom";
import { NavSearchPreview } from "./components/NavSearchPreview";
import { ProductService, type IProduct } from "../../services/api";
import { useDebounce } from "../../hooks/UseDebounce";

export const Navbar: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const { debounce } = useDebounce();

  const [searchTerm, setSearchTerm] = useState("");

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
    { label: "Login", onClick: () => console.log("Login") },
    { label: "Início", onClick: () => console.log("Início") },
    { label: "Sobre", onClick: () => console.log("Sobre") },
    { label: "Favoritos", onClick: () => console.log("Favoritos") },
    {
      label: "",
      icon: <RiShoppingCartLine />,
      onClick: () => console.log("Carrinho"),
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
    <nav className="fixed h-[60px] top-0 left-0 right-0 z-50 bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <div
        className="flex text-xl font-bold text-blue-600 cursor-pointer"
        onClick={() => {
          navigate(`/home`);
        }}
      >
        Super
        <SiCoinmarketcap className="w-7 h-7 text-orange-500" />
        arkt
      </div>

      <form ref={formRef} className="flex" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for a product"
          className="border border-blue-500 rounded-l-lg px-3 py-1 w-90 h-10 focus:outline-none placeholder-gray-400 placeholder:text-sm"
          value={searchTerm}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="border border-blue-500 bg-blue-500 w-10 text-white p-2 rounded-r-lg hover:bg-blue-600 flex items-center justify-center"
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

      <NavLinks links={links} />
    </nav>
  );
};
