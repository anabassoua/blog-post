import { useLoaderData } from "react-router-dom";

export function Post() {
  const post = useLoaderData();
  console.log("Fetched user data:", post);
  return (
    <div>
      <div className="container">
        <h1 className="page-title">{post.title}</h1>
        <span className="page-subtitle">
          By: <a href="user.html">Leanne Graham</a>
        </span>
        <div>{post.body}</div>
      </div>
    </div>
  );
}
