import { useRoutes } from "react-router-dom";
import Home from "../component/Home";
import Navbar from "../Layout/Navbar";

const Router = () => {
  const routes = [
    {
      path: "/",
      element: <Navbar />,
      children: [{ path: "/", element: <Home /> }],
    },
  ];
  let element = useRoutes(routes);

  return element;
};
export default Router;
