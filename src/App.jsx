import { Routes, Route } from "react-router-dom";
import { publicRoutes, userRoutes, adminRoutes } from "./routes";

function App() {
  return (
    <Routes>
      {publicRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}

      {userRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}

      {adminRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}

export default App;
