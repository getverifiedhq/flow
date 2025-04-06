import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainRoute, SelectorRoute, ThankYouRoute } from "./routes";

const router = createBrowserRouter([
  {
    path: "/",
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

function App() {
  return <RouterProvider router={router} />;
}

export default App;
