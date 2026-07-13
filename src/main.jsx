import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { StreamAuthProvider } from "./lib/StreamAuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StreamAuthProvider>
    <App />
  </StreamAuthProvider>
);