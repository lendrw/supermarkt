import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Navbar } from "./shared/components";
import { AppRoutes } from "./routes";
import { AuthProvider } from "./shared/contexts/AuthContext";
import { CartProvider } from "./shared/contexts/CartContext";
import { SearchProvider } from "./shared/contexts/SearchContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <SearchProvider>
            <Navbar />
            <AppRoutes />
          </SearchProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
