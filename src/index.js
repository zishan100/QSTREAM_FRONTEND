import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { SnackbarProvider } from "notistack";

const root = createRoot(document.getElementById("root"));

root.render(
  <SnackbarProvider
    autoHideDuration={1000}
    maxSnack={1}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    preventDuplicate
  >
    <App />
  </SnackbarProvider>
);
