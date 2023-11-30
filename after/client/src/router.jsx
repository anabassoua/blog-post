import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import { Posts } from "./Posts";
import { Users } from "./Users";
import { Todos } from "./Todos";
import { Navbar } from "./Navbar";
import { Post } from "./Post";

export const router = createBrowserRouter([
  {
    element: <NavLayout />,
    children: [
      { path: "/", element: <Navigate to="/posts" /> },
      {
        path: "/posts",
        element: <Posts />,
        loader: ({ request: { signal } }) => {
          return fetch("http://127.0.0.1:3000/posts", { signal });
        },
        children: [
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
        path: "/users",
        element: <Users />,
        loader: ({ request: { signal } }) => {
          return fetch("http://127.0.0.1:3000/users", { signal });
        },
      },
      {
        path: "/todos",
        element: <Todos />,
        loader: ({ request: { signal } }) => {
          return fetch("http://127.0.0.1:3000/todos", { signal });
        },
      },
    ],
  },
]);

function NavLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
