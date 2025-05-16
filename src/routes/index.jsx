import { Navigate } from "react-router-dom";
import Home from "@/pages/user/home";
import Dashboard from "@/pages/admin/dashboard";

export const publicRoutes = [
  {
    path: "/",
    element: <Navigate to="/home" replace />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "*",
    element: <Navigate to="/home" replace />,
  },
];

export const userRoutes = [
  {
    path: "/user",
    element: <Navigate to="/user/home" replace />,
  },
  {
    path: "/user/home",
    element: <Home />,
  },
];

export const adminRoutes = [
  {
    path: "/admin",
    element: <Navigate to="/admin/dashboard" replace />,
  },
  {
    path: "/admin/dashboard",
    element: <Dashboard />,
  },
];
