import { createBrowserRouter } from "react-router-dom";
import { RouteObject } from "react-router-dom";
import App from "./App";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    errorElement: <div>error</div>,
    children: [],
  },
];

const router = createBrowserRouter(routes);

export default router;
