import { FaSpinner } from "react-icons/fa";

export const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-[calc(100vh-60px)]">
    <FaSpinner className="animate-spin text-blue-500 w-6" size={35} />
  </div>
);
