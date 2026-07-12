import React from "react";
import ReactDOM from "react-dom/client";

import App from "@/App.jsx";
import "@/styles/globals.css";

import { StreamAuthProvider } from "@/lib/StreamAuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StreamAuthProvider>
      <App />
    </StreamAuthProvider>
  </React.StrictMode>
);