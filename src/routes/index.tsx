import { Routes, Route, Navigate } from "react-router-dom";
import { ProductDetails, ProductList } from "../pages";

export const AppRoutes = () => {

    return (
        <Routes>
            {/**<Route path="/products/home" element={<Home/>}/> */}
            <Route path="/products/:id" element={<ProductDetails/>}/>
            <Route path="/products" element={<ProductList/>}/>
            {/**<Route path="/products/search/:query/:page" element={<Search/>}/> */}
            <Route path="*" element={<Navigate to="/products"/>}/>
        </Routes>
    )
}