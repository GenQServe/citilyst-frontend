import { Navigate } from "react-router-dom";
import Home from "@/pages/user/home";
import UserLayout from "@/layouts/user-layout";
import WalikotaLayout from "@/layouts/walikota-layout";
import WalikotaDashboard from "@/pages/admin/dashboard";
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";
import VerifyOtpPage from "@/pages/auth/verify-otp";
import UserProfilePage from "@/pages/user/me";
import CreateLaporan from "@/pages/user/create-laporan"; 
import CheckStatusPage from "@/pages/user/check-status";
import NotificationsPage from "@/pages/user/notifications";

export const publicRoutes = [
  {
    path: "/",
    element: <Navigate to="/home" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/verify-otp",
    element: <VerifyOtpPage />,
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
      {
        path: "me",
        element: <UserProfilePage />,
      },
      {
        path: "user/create-report",
        element: <CreateLaporan />, 
      },
      {
        path: "user/check-status", 
        element: <CheckStatusPage />, 
      },
      {
        path: "user/notifications", 
        element: <NotificationsPage />, 
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