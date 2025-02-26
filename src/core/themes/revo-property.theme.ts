import { createTheme } from "@mui/material/styles";

export const THEME_REVO_PROPERTY = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#000000",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0bec5",
    },
    primary: { main: "#93ad7c" },
    error: { main: "hsl(344, 23%, 58%)" },
    success: { main: "#93ad7c" },
  },
  typography: {
    fontFamily: ["DM Sans", "sans-serif"].join(","),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#000000",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          color: "#ffffff",
        },
      },
    },
  },
});
