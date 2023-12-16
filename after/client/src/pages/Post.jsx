import { Link, useLoaderData } from "react-router-dom";

function Post() {
  const { comments, post, user } = useLoaderData();

  return (
    <div>
      <div className="container">
        <h1 className="page-title">{post.title}</h1>
        <span className="page-subtitle">
          By: <Link to={`/users/${user.id}`}>{user.name}</Link>
        </span>
        <div>{post.body}</div>
        <h3 className="mt-4 mb-2">Comments</h3>
        <div className="card-stack">
          {comments.map((comment) => (
            <div key={comment.id} className="card">
              <div className="card-body">
                <div className="text-sm mb-1">{comment.email}</div>
                {comment.body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

async function loader({ params, request: { signal } }) {
  const comments = fetch(
    `http://127.0.0.1:3000/posts/${params.postId}/comments`,
    {
      signal,
    }
  ).then((res) => res.json());

  const post = await fetch(`http://127.0.0.1:3000/posts/${params.postId}`, {
    signal,
  }).then((res) => res.json());

  const user = fetch(`http://127.0.0.1:3000/users/${params.postId}`, {
    signal,
  }).then((res) => res.json());

  return {
    comments: await comments,
    post: await post,
    user: await user,
  };
}

export const postPage = {
  loader,
  element: <Post />,
};
