import { createTheme } from "@mui/material/styles";

export const THEME_POCKET_PROPERTY = createTheme({
  palette: {
    background: {
      default: "#f6f6f6",
    },
    primary: { main: "#f30051" },
    secondary: { main: "#0a2540" },
    error: { main: "#cd3d63" },
    success: { main: "#93ad7c" },
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
