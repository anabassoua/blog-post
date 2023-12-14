import {
  Navigate,
  Outlet,
  ScrollRestoration,
  createBrowserRouter,
  useNavigation,
} from "react-router-dom";
import { Posts } from "./Posts";
import { Users } from "./Users";
import { Todos } from "./Todos";
import { Navbar } from "./Navbar";
import { Post } from "./Post";
import { User } from "./User";
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
                element: <Posts />,
                loader: ({ request: { signal } }) => {
                  return fetch("http://127.0.0.1:3000/posts", { signal });
                },
              },
              {
                path: ":postId",
                loader: ({ params, request: { signal } }) => {
                  return fetch(`http://127.0.0.1:3000/posts/${params.postId}`, {
                    signal,
                  });
                },
                element: <Post />,
              },
            ],
          },

          {
            path: "users",
            children: [
              {
                index: true,
                element: <Users />,
                loader: ({ request: { signal } }) => {
                  return fetch("http://127.0.0.1:3000/users", { signal });
                },
              },
              {
                path: ":userId",
                loader: ({ params, request: { signal } }) => {
                  return fetch(`http://127.0.0.1:3000/users/${params.userId}`, {
                    signal,
                  });
                },
                element: <User />,
              },
            ],
          },
          {
            path: "/todos",
            element: <Todos />,
            loader: ({ request: { signal } }) => {
              return fetch("http://127.0.0.1:3000/todos", { signal });
            },
          },
          { path: "*", element: <h1>Error 404</h1> },
        ],
      },
    ],
  },
]);

function NavLayout() {
  const { state } = useNavigation();
  // state === "loading";
  return (
    <>
      <Navbar />
      <ScrollRestoration />
      {state === "loading" ? <LoadingSpinner /> : <Outlet />}
    </>
  );
}
