import { CssVarsProvider } from "@mui/joy/styles";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CssVarsProvider>
      <App />
    </CssVarsProvider>
  </StrictMode>
);
