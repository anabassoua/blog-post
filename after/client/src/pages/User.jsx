import { Link, useLoaderData } from "react-router-dom";

function User() {
  const { user, posts, todos } = useLoaderData();

  return (
    <div className="container">
      <h1 className="page-title">{user.name}</h1>
      <div className="page-subtitle">{user.email}</div>
      <div>
        <b>Company:</b> {user.company.name}
      </div>
      <div>
        <b>Website:</b> {user.website}
      </div>
      <div>
        <b>Address:</b> {user.address.street} {user.address.suite},{" "}
        {user.address.city}, {user.address.zipcode}
      </div>
      <h3 className="mt-4 mb-2">Posts</h3>
      <div className="card-grid">
        {posts.map((post) => {
          return (
            <div key={post.id} className="card">
              <div className="card-header">{post.title}</div>
              <div className="card-body">
                <div className="card-preview-text">{post.body}</div>
              </div>
              <div className="card-footer">
                <Link className="btn" to={`/posts/${post.id}`}>
                  View
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <h3 className="mt-4 mb-2">Todos</h3>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={todo.completed ? "strike-through" : undefined}
          >
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

async function loader({ params, request: { signal } }) {
  const user = fetch(`http://127.0.0.1:3000/users/${params.userId}`, {
    signal,
  }).then((res) => res.json());

  const posts = fetch(`http://127.0.0.1:3000/posts?userId=${params.userId}`, {
    signal,
  }).then((res) => res.json());

  const todos = fetch(`http://127.0.0.1:3000/todos?userId=${params.userId}`, {
    signal,
  }).then((res) => res.json());

  return { user: await user, posts: await posts, todos: await todos };
}

export const userPage = {
  element: <User />,
  loader,
};
