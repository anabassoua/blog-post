import {
  Navigate,
  Outlet,
  ScrollRestoration,
  createBrowserRouter,
  useNavigation,
} from "react-router-dom";
import { postList } from "./pages/Posts";
import { postPage } from "./pages/Post";
import { userList } from "./pages/Users";
import { userPage } from "./pages/User";
import { todos } from "./pages/Todos";
import { Navbar } from "./Navbar";
import { LoadingSpinner } from "./LoadingSpinner";
import { ErrorPage } from "./ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <NavLayout />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Navigate to="/posts" /> },
          {
            path: "posts",
            children: [
              {
                index: true,
                ...postList,
              },
              {
                path: ":postId",
                ...postPage,
              },
            ],
          },

          {
            path: "users",
            children: [
              {
                index: true,
                ...userList,
              },
              {
                path: ":userId",
                ...userPage,
              },
            ],
          },
          {
            path: "/todos",
            ...todos,
          },
          { path: "*", element: <h1>Error 404</h1> },
        ],
      },
    ],
  },
]);

function NavLayout() {
  const { state } = useNavigation();

  return (
    <>
      <Navbar />
      <ScrollRestoration />
      {state === "loading" ? <LoadingSpinner /> : <Outlet />}
    </>
  );
}
