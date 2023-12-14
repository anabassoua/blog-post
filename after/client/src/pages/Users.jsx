import { Link, useLoaderData } from "react-router-dom";

function Users() {
  const users = useLoaderData();

  return (
    <div className="container">
      <h1 className="page-title">Users</h1>
      <div className="card-grid">
        {users.map((user) => {
          return (
            <div key={user.id} className="card">
              <div className="card-header">{user.name}</div>
              <div className="card-body">
                <div>{user.company.name}</div>
                <div>{user.website}</div>
                <div>{user.email}</div>
              </div>
              <div className="card-footer">
                <Link className="btn" to={user.id.toString()}>
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
  return fetch("http://127.0.0.1:3000/users", { signal });
}

export const userList = {
  loader,
  element: <Users />,
};
