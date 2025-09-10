import { BaseLayout } from "../../shared/layouts";
import { CartCard } from "./components/CartCard";
import {  useCartContext } from "../../shared/contexts";
import { RoundedButton } from "../../shared/utils";
import { CartProductRecomendation } from "./components/CartProductRecomendation";

export const Cart = () => {
  const { items, totalProducts, subtotal } = useCartContext();

  return (
    <BaseLayout className="flex flex-col md:flex-row justify-around relative p-4 ">
      <div className="h-full flex flex-col gap-5">
        {totalProducts > 0 ? (
          items.map((cartProduct, index) => (
            <CartCard
              key={`${cartProduct.productId}-${index}`}
              icon={cartProduct.thumbnail}
              id={cartProduct.productId}
              title={cartProduct.title}
              price={cartProduct.price}
              availabilityStatus={cartProduct.availabilityStatus}
              brand={cartProduct.brand}
              discountPercentage={cartProduct.discountPercentage}
              shippingInformation={cartProduct.shippingInformation}
              tags={cartProduct.tags}
            />
          ))
        ) : (
          <div className="shadow-md flex flex-row items-center justify-center text-xl text-blue-700 bg-white rounded-2xl mt-5 mb-4 h-60 md:h-70 w-full md:w-[55vw] lg:w-170">
            Your cart is empty
          </div>
        )}
      </div>

      <div className="flex flex-col p-2 gap-6">
        {totalProducts > 0 && (
          <div className="bg-white shadow-md rounded-2xl w-full md:w-[35vw] h-40 lg:h-50 flex flex-col items-center justify-center gap-5 p-2">
            <h2 className="text-lg lg:text-2xl text-center">
              Subtotal ({totalProducts}
              {totalProducts > 1 ? " products" : " product"}):{" "}
              <span className="font-bold text-blue-700">
                U$ {subtotal.toFixed(2)}
              </span>
            </h2>
            <RoundedButton
              type="button"
              className="bg-orange-500 hover:bg-orange-600 text-white h-8 w-40 lg:w-45"
            >
              Complete order
            </RoundedButton>
          </div>
        )}
        <CartProductRecomendation />
      </div>
    </BaseLayout>
  );
};