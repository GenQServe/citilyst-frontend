import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Loader } from "lucide-react";
import Cookies from "js-cookie";
import { toast } from "sonner";

export function OAuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");

    if (token) {
      Cookies.set("token", token, {
        path: "/",
        secure: true,
        sameSite: "strict",
      });
      toast.success("Login berhasil!");
      navigate("/home", { replace: true });
    } else {
      toast.error("Login gagal, token tidak ditemukan");
      navigate("/login", { replace: true });
    }
  }, [navigate, location]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <Loader className="h-10 w-10 animate-spin text-[#9DB17C]" />
      <p className="mt-4 text-gray-600">Memproses autentikasi...</p>
    </div>
  );
}
