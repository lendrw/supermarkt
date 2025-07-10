import { Routes, Route, Navigate } from "react-router-dom";
import { ProductDetails, ProductList, ProductListByCategory } from "../pages";
import { Home, Login } from "../pages";

export const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/products/:id" element={<ProductDetails/>}/>
            <Route path="/products" element={<ProductList/>}/>
            <Route path="/products/category/:slug" element={<ProductListByCategory/>}/>
            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
    )
}