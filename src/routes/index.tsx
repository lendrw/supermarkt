// src/routes/AppRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import {
  ProductDetails,
  AllProducts,
  ProductListByCategory,
  Home,
  Login,
  SearchProduct,
  Register,
  Cart,
} from "../pages";
import { PrivateRoute } from "./PrivateRoute";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/products/:id" element={<ProductDetails />} />

      <Route path="/products" element={<AllProducts />} />

      <Route
        path="/products/category/:slug"
        element={<ProductListByCategory />}
      />

      <Route
        path="/products/search/:query/:page?"
        element={<SearchProduct />}
      />

      <Route
        path="/cart"
        element={
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
