import { createTheme } from "@mui/material/styles";

export const THEME_POCKET_PROPERTY = createTheme({
  palette: {
    background: {
      default: "#f6f6f6",
    },
    primary: { main: "#f30051" },
    secondary: { main: "#f30051" },
    error: { main: "#f30051" },
    success: { main: "#99e279" },
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
    MuiStepLabel: {
      styleOverrides: {
        label: {
          fontSize: "1rem",
        },
      },
    },
  },
});
