import Browse from "./Browse";
import Login from "./Login";
import Error from "./Error";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import { auth } from "../utils/firbase";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: auth?.currentUser ? (
        <Navigate to="/browse" replace={true} />
      ) : (
        <Login />
      ),
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    {
      path: "/error",
      element: <Error />,
    },
  ]);

  return (
    <div className="m-0 p-0">
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
