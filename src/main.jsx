import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import ThemeProvider from "./theme/ThemeProvider";
import { CssBaseline } from '@mui/material';
import { GenerateAppProvider } from "./Context/Context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
        <CssBaseline />
        <GenerateAppProvider>

        <App />
        </GenerateAppProvider>
    </ThemeProvider>
  </React.StrictMode>
);
