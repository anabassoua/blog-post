import { useLoaderData } from "react-router-dom";

function User() {
  const user = useLoaderData();

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
    </div>
  );
}

function loader({ params, request: { signal } }) {
  return fetch(`http://127.0.0.1:3000/users/${params.userId}`, {
    signal,
  });
}

export const userPage = {
  element: <User />,
  loader,
};
