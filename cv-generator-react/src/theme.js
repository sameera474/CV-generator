// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#2563eb" },
    background: { default: "#f3f4f6" },
  },
  shape: { borderRadius: 14 },
});

export default theme;
