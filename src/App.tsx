import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainRoute, ThankYouRoute } from "./routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainRoute />,
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

function App() {
  return <RouterProvider router={router} />;
}

export default App;
