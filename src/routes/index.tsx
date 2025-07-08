import { Routes, Route, Navigate } from "react-router-dom";
import { ProductDetails, ProductList, ProductListByCategory } from "../pages";
import { Home } from "../pages/home/Home";

export const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/home" element={<Home/>}/>
            <Route path="/products/:id" element={<ProductDetails/>}/>
            <Route path="/products" element={<ProductList/>}/>
            <Route path="/products/category/:slug" element={<ProductListByCategory/>}/>
            {/**<Route path="/products/search/:query/:page" element={<Search/>}/> */}
            <Route path="*" element={<Navigate to="/home"/>}/>
        </Routes>
    )
}