import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Footer, Navbar } from "./shared/components";
import { AppRoutes } from "./routes";
import { AuthProvider } from "./shared/contexts/AuthContext/AuthProvider";
import { CartProvider } from "./shared/contexts/CartContext/CartProvider";
import { SearchProvider } from "./shared/contexts/SearchContext/SearchProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <SearchProvider>
            <Navbar />
            <AppRoutes />
            <Footer/>
          </SearchProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
