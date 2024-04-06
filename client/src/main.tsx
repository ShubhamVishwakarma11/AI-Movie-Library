import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/authContext.tsx";
import { FavouriteContextProvider } from "./context/favouriteContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthContextProvider>
      <FavouriteContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </FavouriteContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
