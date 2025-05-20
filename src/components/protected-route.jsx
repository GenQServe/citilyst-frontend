import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const ProtectedRoute = ({
  children,
  allowedRoles = [],
  redirectPath = "/home",
}) => {
  const location = useLocation();
  const token = Cookies.get("token");

  if (!token) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      Cookies.remove("token");
      return <Navigate to={redirectPath} state={{ from: location }} replace />;
    }

    const hasRequiredRole =
      allowedRoles.length === 0 || allowedRoles.includes(decoded.role);

    if (!hasRequiredRole) {
      const redirectTo =
        decoded.role === "user"
          ? "/home"
          : decoded.role === "admin"
          ? "/admin/dashboard"
          : "/home";
      return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }

    return children;
  } catch (error) {
    Cookies.remove("token");
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }
};

export const PublicRoute = ({
  children,
  restrictedToUnauthenticated = false,
}) => {
  const location = useLocation();
  const token = Cookies.get("token");

  if (token && restrictedToUnauthenticated) {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp > currentTime) {
        const redirectTo =
          decoded.role === "user"
            ? "/home"
            : decoded.role === "admin"
            ? "/admin/dashboard"
            : "/home";
        return (
          <Navigate to={redirectTo || "/"} state={{ from: location }} replace />
        );
      }
    } catch (error) {
      Cookies.remove("token");
    }
  }

  return children;
};
