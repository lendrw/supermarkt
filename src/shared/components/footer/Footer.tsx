import { SiCoinmarketcap } from "react-icons/si";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-900 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

        <div className="flex items-center text-xl font-bold cursor-pointer">
          Super
          <SiCoinmarketcap className="w-7 h-7 " />
          market
        </div>

        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">Contact</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
        </div>

        <div className="flex gap-4 text-xl">
          <a href="#" target="_blank" rel="noreferrer">
            <FaGithub className="hover:text-gray-300" />
          </a>
          <a href="#" target="_blank" rel="noreferrer">
            <FaLinkedin className="hover:text-gray-300" />
          </a>
          <a href="#" target="_blank" rel="noreferrer">
            <FaTwitter className="hover:text-gray-300" />
          </a>
        </div>
      </div>

      <div className="text-center text-xs text-gray-300 mt-4">
        © {new Date().getFullYear()} Supermarket. All rights reserved.
      </div>
    </footer>
  );
};
