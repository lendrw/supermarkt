import React from "react";
import { SiCoinmarketcap } from "react-icons/si";
import { FaSearch } from "react-icons/fa";

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <div className="flex text-xl font-bold text-blue-600">
        Super
        <SiCoinmarketcap className="w-7 h-7 text-orange-500" />
        arkt
      </div>
      <form className="flex">
        <input
          type="text"
          placeholder="Search for a product"
          className="border border-blue-500 rounded-l-lg px-3 py-1 focus:outline-none placeholder-gray-400 placeholder:text-sm"
        />
        <button
          type="submit"
          className="border border-blue-500 bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600"
        >
          <FaSearch className="w-4 h-4" />
        </button>
      </form>
      <ul className="flex gap-6 text-gray-700 font-medium">
        <li className="hover:text-blue-500 cursor-pointer">Início</li>
        <li className="hover:text-blue-500 cursor-pointer">Sobre</li>
        <li className="hover:text-blue-500 cursor-pointer">Favoritos</li>
        <li className="hover:text-blue-500 cursor-pointer">Carrinho</li>
        <li className="hover:text-blue-500 cursor-pointer">Login</li>
      </ul>
    </nav>
  );
};
