import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard/:subreddit",
    element: <Dashboard />,
  },
]);

export { routes };
