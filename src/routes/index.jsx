import { Navigate } from "react-router-dom";
import Home from "@/pages/user/home";
import UserLayout from "@/layouts/user-layout";
import WalikotaLayout from "@/layouts/walikota-layout";
import WalikotaDashboard from "@/pages/admin/dashboard";

export const publicRoutes = [
  {
    path: "/",
    element: <Navigate to="/home" replace />,
  },
  {
    path: "*",
    element: <Navigate to="/home" replace />,
  },
];

export const userRoutes = [
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "user",
        element: <Navigate to="/user/home" replace />,
      },
      {
        path: "user/home",
        element: <Home />,
      },
    ],
  },
];

export const walikotaRoutes = [
  {
    path: "/walikota",
    element: <WalikotaLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="/walikota/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <WalikotaDashboard />,
      },
    ],
  },
];
