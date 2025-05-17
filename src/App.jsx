import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes, userRoutes, walikotaRoutes } from "@/routes";
import { Toaster } from "sonner";
import { PageSkeleton } from "./components/skeleton-loader";
import { useAuthRedirect } from "@/hooks/use-auth-redirect";

function App() {
  const { initialRedirect } = useAuthRedirect();

  if (initialRedirect) {
    return <Navigate to={initialRedirect} replace />;
  }

  return (
    <>
      <Toaster position="bottom-right" richColors closeButton />
      <Suspense fallback={<PageSkeleton />}>
        <Routes>
          {publicRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}

          {userRoutes.map((route) =>
            route.children ? (
              <Route key={route.path} path={route.path} element={route.element}>
                {route.children.map((childRoute) => (
                  <Route
                    key={childRoute.path}
                    path={childRoute.path}
                    element={childRoute.element}
                  />
                ))}
              </Route>
            ) : (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            )
          )}

          {walikotaRoutes.map((route) =>
            route.children ? (
              <Route key={route.path} path={route.path} element={route.element}>
                {route.children.map((childRoute) => (
                  <Route
                    key={childRoute.path}
                    path={childRoute.path}
                    element={childRoute.element}
                  />
                ))}
              </Route>
            ) : (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            )
          )}
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
