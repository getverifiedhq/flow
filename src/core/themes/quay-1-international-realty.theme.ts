import { createTheme } from "@mui/material/styles";

export const THEME_QUAY_1_INTERNATIONAL_REALTY = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#3c5aa5",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0bec5",
    },
    primary: { main: "#ffc800" },
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
          backgroundColor: "#3c5aa5",
        },
      },
    },
  },
});
