import { useRouteError } from "react-router-dom";

export function ErrorPage() {
  const error = useRouteError();
  return (
    <>
      <div>Something went wrong</div>
      {import.meta.env.MODE !== "production" && (
        <>
          <pre>{error.message}</pre>
          <pre>{error.stack}</pre>
        </>
      )}
    </>
  );
}
