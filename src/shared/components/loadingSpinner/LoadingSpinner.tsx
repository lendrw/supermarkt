import { FaSpinner } from "react-icons/fa";
import { BaseLayout } from "../../layouts";

interface ILoadingSpinner {
  className?: string;
  isFullPage: boolean;
}
export const LoadingSpinner: React.FC<ILoadingSpinner> = ({
  className,
  isFullPage,
}) =>
  isFullPage ? (
    <BaseLayout className={`flex justify-center items-center  ${className}`}>
      <FaSpinner className="animate-spin text-blue-500 w-6" size={35} />
    </BaseLayout>
  ) : (
    <div className={`flex justify-center items-center ${className}`}>
      <FaSpinner className="animate-spin text-blue-500 w-6" size={35} />
    </div>
  );
