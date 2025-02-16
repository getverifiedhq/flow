import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FormRoute } from "./routes";
import { CssBaseline } from "@mui/material";

const router = createBrowserRouter([
  {
    path: "/",
    element: <FormRoute />,
  },
]);

// const theme = createTheme({
//   palette: {
//     primary: { main: "#36a18b" },
//     secondary: { main: "#d7ece8" },
//   },
//   typography: {
//     fontFamily: ["DM Sans", "sans-serif"].join(","),
//   },
// });

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#000000",
      paper: "#121212",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0bec5",
    },
    primary: { main: "#93ad7c" },
    secondary: { main: "#d7ece8" },
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
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
