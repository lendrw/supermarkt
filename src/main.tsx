import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { worker } from "./mocks/browser";

// Start MSW in DEV and/or PROD if you want mocks on GitHub Pages
worker.start({
  serviceWorker: {
    url: '/supermarkt/mockServiceWorker.js',
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
