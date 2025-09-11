import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// MSW apenas em desenvolvimento
if (import.meta.env.DEV) {
  const { worker } = await import("./mocks/browser");
  worker.start({
    serviceWorker: {
      url: import.meta.env.BASE_URL + "mockServiceWorker.js"
    }
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
