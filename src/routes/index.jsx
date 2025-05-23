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
import NotFoundPage from "@/pages/404";
import { ProtectedRoute, PublicRoute } from "@/components/protected-route";
import ManageReports from "@/pages/admin/manage-reports";

export const publicRoutes = [
  {
    path: "/",
    element: <Navigate to="/home" replace />,
  },
  {
    path: "/login",
    element: (
      <PublicRoute restrictedToUnauthenticated={true}>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute restrictedToUnauthenticated={true}>
        <RegisterPage />
      </PublicRoute>
    ),
  },
  {
    path: "/verify-otp",
    element: (
      <PublicRoute>
        <VerifyOtpPage />
      </PublicRoute>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
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
        path: "profile",
        element: (
          <ProtectedRoute allowedRoles={["user"]}>
            <UserProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "user/create-report",
        element: (
          <ProtectedRoute allowedRoles={["user"]}>
            <CreateLaporan />
          </ProtectedRoute>
        ),
      },
      {
        path: "user/check-status",
        element: (
          <ProtectedRoute allowedRoles={["user"]}>
            <CheckStatusPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
];

export const walikotaRoutes = [
  {
    path: "/",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <WalikotaLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Navigate to="/admin/dashboard" replace />,
      },
      {
        path: "admin/dashboard",
        element: <WalikotaDashboard />,
      },
      {
        path: "admin/manage-report",
        element: <ManageReports />,
      },
    ],
  },
];
