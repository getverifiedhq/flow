import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainRoute } from "./routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainRoute />,
  },
  {
    path: "/:id",
    element: <MainRoute />,
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

// const themeGetVerified = createTheme({
//   palette: {
//     background: {
//       default: "#f6f6f6",
//     },
//     primary: { main: "#635bff" },
//     secondary: { main: "#0a2540" },
//     error: { main: "#cd3d63" },
//     success: { main: "#93ad7c" },
//   },
//   typography: {
//     fontFamily: ["DM Sans", "sans-serif"].join(","),
//   },
//   components: {
//     MuiCssBaseline: {
//       styleOverrides: {
//         body: {
//           backgroundColor: "#f6f6f6",
//         },
//       },
//     },
//   },
// });

// const themeQuay1InternationalRealty = createTheme({
//   palette: {
//     background: {
//       default: "#f6f6f6",
//     },
//     primary: { main: "#3c5aa5" },
//     secondary: { main: "#d7ece8" },
//     error: { main: "hsl(344, 23%, 58%)" },
//     success: { main: "#93ad7c" },
//   },
//   typography: {
//     fontFamily: ["DM Sans", "sans-serif"].join(","),
//   },
//   components: {
//     MuiCssBaseline: {
//       styleOverrides: {
//         body: {
//           backgroundColor: "#f6f6f6",
//         },
//       },
//     },
//   },
// });

const themeRevoProperty = createTheme({
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

const theme = themeRevoProperty;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <RouterProvider router={router} />
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
