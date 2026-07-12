import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";

import { Toaster } from "react-hot-toast";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
      <AuthProvider>

  <App />

  <Toaster
    position="top-right"
    toastOptions={{
      duration: 6500,
      style: {
        borderRadius: "16px",
        padding: "16px",
        background: "#0f172a",
        color: "#ffffff",
      },
      success: {
        iconTheme: {
          primary: "#22c55e",
          secondary: "#ffffff",
        },
      },
      error: {
        iconTheme: {
          primary: "#ef4444",
          secondary: "#ffffff",
        },
      },
    }}
  />

</AuthProvider>
    </AuthProvider>
  </StrictMode>
);