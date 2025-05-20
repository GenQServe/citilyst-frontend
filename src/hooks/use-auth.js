import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  registerUser,
  verifyOtp,
  resendOtp,
  getUserProfile,
  loginUser,
  googleLogin,
  updateUserProfile,
  updateUserProfilePicture,
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
      
      // Decode JWT token to check user role
      try {
        const token = data.data.token;
        // Assuming the token is in format: header.payload.signature
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decoded = JSON.parse(window.atob(base64));
        
        // Redirect based on role with a slight delay
        setTimeout(() => {
          if (decoded.role === 'admin') {
            navigate('/admin/dashboard', { replace: true });
          } else {
            navigate('/home', { replace: true });
          }
        }, 100);
      } catch (error) {
        // If token decoding fails, default to home
        navigate('/home', { replace: true });
      }
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

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries(["userProfile"]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update profile");
    },
  });
}

export function useUpdateProfilePicture() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserProfilePicture,
    onSuccess: () => {
      toast.success("Profile picture updated successfully");
      queryClient.invalidateQueries(["userProfile"]);
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to update profile picture"
      );
    },
  });
}
