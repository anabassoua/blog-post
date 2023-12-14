import { Link, useLoaderData } from "react-router-dom";

function Post() {
  const post = useLoaderData();

  return (
    <div>
      <div className="container">
        <h1 className="page-title">{post.title}</h1>
        {/* <span class="page-subtitle">
          By: <a href="user.html">Leanne Graham</a>
        </span> */}
        <div>{post.body}</div>
        {/* <h3 class="mt-4 mb-2">Comments</h3> */}
        {/* <div class="card-stack">
          <div class="card">
            <div class="card-body">
              <div class="text-sm mb-1">Eliseo@gardner.biz</div>
              laudantium enim quasi est quidem magnam voluptate ipsam eos
              tempora quo necessitatibus dolor quam autem quasi reiciendis et
              nam sapiente accusantium
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

function loader({ params, request: { signal } }) {
  return fetch(`http://127.0.0.1:3000/posts/${params.postId}`, {
    signal,
  });
}

export const postPage = {
  loader,
  element: <Post />,
};
