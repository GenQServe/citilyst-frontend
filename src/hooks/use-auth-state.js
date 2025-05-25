import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useLocation } from "react-router-dom";

export function useAuthState() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const checkAuth = () => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        Cookies.remove("token");
        setUser(null);
        if (!location.pathname.startsWith("/login")) {
          navigate("/login", { replace: true });
        }
      }
    } else {
      setUser(null);
      if (
        !location.pathname.startsWith("/login") &&
        !location.pathname.startsWith("/register") &&
        !location.pathname.startsWith("/verify-otp") &&
        !location.pathname === "/home" &&
        !location.pathname === "/"
      ) {
        navigate("/login", { replace: true });
      }
    }
  };

  const handleLogout = () => {
    Cookies.remove("token");
    setUser(null);
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    checkAuth();
    const intervalId = setInterval(checkAuth, 60000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    checkAuth();
  }, [location]);

  return {
    user,
    handleLogout,
    isAuthenticated: !!user,
  };
}
