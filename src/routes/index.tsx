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
} from "../pages";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";


export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      <Route
        path="/products/:id"
        element={
          <PublicRoute>
            <ProductDetails />
          </PublicRoute>
        }
      />

      <Route
        path="/products"
        element={
          <PublicRoute>
            <AllProducts />
          </PublicRoute>
        }
      />

      <Route
        path="/products/category/:slug"
        element={
          <PublicRoute>
            <ProductListByCategory />
          </PublicRoute>
        }
      />

      <Route
        path="/products/search/:query/:page?"
        element={
          <PublicRoute>
            <SearchProduct />
          </PublicRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
