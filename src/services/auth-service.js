import api from "@/lib/api";
import Cookies from "js-cookie";


export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  Cookies.set("email", userData.email, { expires: 1 });
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


export const updateUserProfile = async (userId, data) => {
  const response = await api.put(`/user/${userId}`, data);
  return response.data;
};

export const updateUserProfilePicture = async (userId, file) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await api.put(`/user/${userId}/profile-picture`, formData);
  return response.data;
};