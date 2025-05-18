import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export function useAuthState() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const checkAuth = () => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error("Invalid token", error);
        Cookies.remove("token");
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  const handleLogout = () => {
    Cookies.remove("token");
    setUser(null);
    navigate("/home", { replace: true });
  };

  useEffect(() => {
    checkAuth();
    const intervalId = setInterval(checkAuth, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return {
    user,
    handleLogout,
    isAuthenticated: !!user,
  };
}
