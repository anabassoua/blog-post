import { Link, useLoaderData } from "react-router-dom";

function Posts() {
  const allPosts = useLoaderData();

  return (
    <div className="container">
      <h1 className="page-title">Posts</h1>
      <div className="card-grid">
        {allPosts.map((post) => {
          return (
            <div key={post.id} className="card">
              <div className="card-header">{post.title}</div>
              <div className="card-body">
                <div className="card-preview-text">{post.body}</div>
              </div>
              <div className="card-footer">
                <Link className="btn" to={post.id.toString()}>
                  View
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function loader({ request: { signal } }) {
  return fetch("http://127.0.0.1:3000/posts", { signal });
}

export const postList = {
  element: <Posts />,
  loader,
};
