import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  registerUser,
  verifyOtp,
  resendOtp,
  getUserProfile,
  loginUser,
  googleLogin,
} from "@/services/auth-service";
import Cookies from "js-cookie";

export function useRegister() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data, variables) => {
      toast.success(data.message);
      navigate("/verify-otp", { state: { email: variables.email } });
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

  return useMutation({
    mutationFn: verifyOtp,
    onSuccess: (data, _, context) => {
      toast.success(data.message);
      Cookies.set("token", data.data.token);
      Cookies.remove("email");
      if (context?.onSuccess) {
        context.onSuccess(data);
      } else {
        navigate("/home", { replace: true });
      }
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
