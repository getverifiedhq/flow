import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FormRoute } from "./routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeRoute />,
  },
  {
    path: "/view",
    element: <ViewRoute />,
  },
  {
    path: "/:organizationId",
    element: <HomeRoute />,
  },
  {
    path: "/:organizationId/:id",
    element: <MainRoute />,
  },
  {
    path: "/:organizationId/:id/payment",
    element: <PaymentRoute />,
  },
  {
    path: "/:organizationId/:id/view",
    element: <ViewRoute />,
  },
]);

const theme = createTheme({
  palette: {
    primary: { main: "#36a18b" },
    secondary: { main: "#d7ece8" },
  },
  typography: {
    fontFamily: ["DM Sans", "sans-serif"].join(","),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
