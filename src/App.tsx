import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Navbar } from "./shared/components";
import { AppRoutes } from "./routes";
import { AuthProvider } from "./shared/contexts";
import { SearchProvider } from "./shared/contexts/SearchContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <SearchProvider>
          <Navbar />
          <AppRoutes />
        </SearchProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
