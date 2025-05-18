import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import {
  registerUser,
  verifyOtp,
  resendOtp,
  getUserProfile,
  loginUser,
  googleLogin,
} from "@/services/auth-service";
import { setUser } from "@/features/slices/authSlice";
import Cookies from "js-cookie";

export function useRegister() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/verify-otp");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Registration failed");
    },
  });
}

export function useLogin() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success(data.message);
      Cookies.set("token", data.data.token);
      navigate("/home", { replace: true });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Login failed");
    },
  });
}

export function useGoogleLogin() {
  return useMutation({
    mutationFn: googleLogin,
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Google login failed");
    },
  });
}

export function useVerifyOtp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: verifyOtp,
    onSuccess: (data) => {
      toast.success(data.message);
      dispatch(setUser(data.data));
      Cookies.remove("email");
      navigate("/profile");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "OTP verification failed");
    },
  });
}

export function useResendOtp() {
  return useMutation({
    mutationFn: resendOtp,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    },
  });
}

export function useUserProfile() {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    select: (data) => data.data,
    onError: () => {
      toast.error("Failed to fetch user profile");
    },
  });
}
