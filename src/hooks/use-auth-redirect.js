import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export function useAuthRedirect() {
  const [initialRedirect, setInitialRedirect] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
          Cookies.remove("token");
        } else {
          if (location.pathname === "/") {
            if (decoded.role === "admin") {
              setInitialRedirect("/walikota");
            } else {
              setInitialRedirect("/home");
            }
          } else if (
            location.pathname.startsWith("/walikota") &&
            decoded.role === "user"
          ) {
            setInitialRedirect("/home");
          } else if (
            (location.pathname.startsWith("/home") ||
              location.pathname === "/profile") &&
            decoded.role === "admin"
          ) {
            setInitialRedirect("/walikota");
          }
        }
      } catch (error) {
        Cookies.remove("token");
      }
    }
  }, [location.pathname]);

  return { initialRedirect };
}
