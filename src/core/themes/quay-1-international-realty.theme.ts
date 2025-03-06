import { createTheme } from "@mui/material/styles";

export const THEME_QUAY_1_INTERNATIONAL_REALTY = createTheme({
  palette: {
    background: {
      default: "#f6f6f6",
    },
    primary: { main: "#3c5aa5" },
    secondary: { main: "#ffc800" },
    error: { main: "hsl(344, 47%, 44%)" },
    success: { main: "hsl(92, 47%, 44%)" },
  },
  typography: {
    fontFamily: ["DM Sans", "sans-serif"].join(","),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#f6f6f6",
        },
      },
    },
  },
});
