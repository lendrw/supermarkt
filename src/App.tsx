import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Navbar } from "./shared/components";
import { AppRoutes } from "./routes";
import { AuthProvider } from "./shared/contexts";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
