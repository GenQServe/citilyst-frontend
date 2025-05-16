import { Routes, Route } from "react-router-dom";
import { publicRoutes, userRoutes, walikotaRoutes } from "./routes";

function App() {
  return (
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
          <Route key={route.path} path={route.path} element={route.element} />
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
          <Route key={route.path} path={route.path} element={route.element} />
        )
      )}
    </Routes>
  );
}

export default App;
