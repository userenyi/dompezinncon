"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2563A6",
    },
    secondary: {
      main: "#17212B",
    },
    background: {
      default: "#F7F6F2",
      paper: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
  shape: {
    borderRadius: 10,
  },
});

export default theme;
