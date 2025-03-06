import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainRoute, SelectorRoute, ThankYouRoute } from "./routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainRoute />,
  },
  {
    path: "/selector",
    element: <SelectorRoute />,
  },
  {
    path: "/:formId",
    element: <MainRoute />,
  },
  {
    path: "/:formId/:id",
    element: <MainRoute />,
  },
  {
    path: "/:formId/:id/thank-you",
    element: <ThankYouRoute />,
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

function App() {
  return <RouterProvider router={router} />;
}

export default App;
