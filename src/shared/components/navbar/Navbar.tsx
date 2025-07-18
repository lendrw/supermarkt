import React from "react";
import { SiCoinmarketcap } from "react-icons/si";
import { FaSearch } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import { NavLinks } from "./components/NavLinks";
import { Link, useNavigate } from "react-router-dom";

export const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.trim() !== "") {
      navigate(`/products/search/${value}`);
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
      <form className="flex">
        <input
          type="text"
          placeholder="Search for a product"
          className="border border-blue-500 rounded-l-lg px-3 py-1 focus:outline-none placeholder-gray-400 placeholder:text-sm"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="border border-blue-500 bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600"
        >
          <FaSearch className="w-4 h-4" />
        </button>
      </form>
      <NavLinks links={links} />
    </nav>
  );
};
