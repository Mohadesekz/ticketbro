import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import { Home, Calendar, Setting, Shop, Messenger } from "./pages";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "calendar",
        element: <Calendar />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "messenger",
        element: <Messenger />,
      },
      {
        path: "setting",
        element: <Setting />,
      },
    ],
  },
]);
