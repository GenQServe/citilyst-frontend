import api from "@/lib/api";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  Cookies.set("email", userData.email, { expires: 300 / 86400 }); // 5 minutes (300 seconds / seconds per day)
  return response.data;
};

export const verifyOtp = async (otpData) => {
  const email = Cookies.get("email");
  const payload = {
    email,
    otp: otpData.otp,
  };
  const response = await api.post("/auth/verify-otp", payload);
  return response.data;
};

export const resendOtp = async () => {
  const email = Cookies.get("email");
  const payload = { email };
  const response = await api.post("/auth/resend-otp", payload);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

export const googleLogin = async () => {
  const redirectUri = `${import.meta.env.VITE_FRONTEND_URL}/`;
  const response = await api.get(
    `/auth/google?redirect_uri=${redirectUri}&path=/`
  );
  return response.data;
};

export const getUserProfile = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

export const updateUserProfile = async (data) => {
  const token = Cookies.get("token");
  if (!token) {
    throw new Error("No token found");
  }

  const decoded = jwtDecode(token);
  const userId = decoded.sub;

  const response = await api.put(`/user/${userId}`, data);
  return response.data;
};

export const updateUserProfilePicture = async (file) => {
  const token = Cookies.get("token");
  if (!token) {
    throw new Error("No token found");
  }

  const decoded = jwtDecode(token);
  const userId = decoded.sub;

  const formData = new FormData();
  formData.append("file", file);

  const response = await api.put(`/user/${userId}/profile-picture`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
