import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { OrdersProvider } from "./store/OrdersContext";
import { AppProvider } from "./store/AppContext";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <AppProvider>
      <OrdersProvider>
        <App />
      </OrdersProvider>
    </AppProvider>
  </React.StrictMode>
);
