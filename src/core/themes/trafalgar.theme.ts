import { createTheme } from "@mui/material/styles";

export const THEME_TRAFALGAR = createTheme({
  palette: {
    background: {
      default: "#f6f6f6",
    },
    primary: { main: "#6e0d16" },
    secondary: { main: "#bfd630" },
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
