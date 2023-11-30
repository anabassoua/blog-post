import { useLoaderData } from "react-router-dom";

export function Users() {
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
                <a className="btn" href="user.html">
                  View
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
