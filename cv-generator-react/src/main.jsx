// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "./theme.js";
import * as pdfjsLib from "pdfjs-dist";

import "./styles/global.css";
import "./styles/templates.css";

// Set the worker source for PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
