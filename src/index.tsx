import { Provider } from "@/components/ui/provider";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Obtén el elemento root
const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  // Renderiza la aplicación dentro del ChakraProvider
  root.render(
    <Provider>
      <App />
    </Provider>
  );
} else {
  console.error("No se encontró el elemento root");
}
