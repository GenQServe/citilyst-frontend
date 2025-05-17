import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { icons } from "@/constants/icons";
import { useLogin, useGoogleLogin } from "@/hooks/use-auth";
import Cookies from "js-cookie";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email("Email tidak valid").min(1, "Email wajib diisi"),
  password: z.string().min(1, "Password wajib diisi"),
});

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending: isLoggingIn } = useLogin();
  const { mutate: loginWithGoogle, isPending: isGoogleLoggingIn } =
    useGoogleLogin();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const email = Cookies.get("email");
    if (email) {
      toast.info("Lanjutkan pendaftaran Anda terlebih dahulu");
      navigate("/verify-otp");
    }
  }, [navigate]);

  const onSubmit = (data) => {
    login(data);
  };

  const handleGoogleLogin = () => {
    loginWithGoogle();
  };

  return (
    <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-8 md:py-12">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-8 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="font-medium">Kembali</span>
        </Link>

        <Card className="border-0 shadow-none">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-2xl font-bold">
              Masuk ke CityList
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0 space-y-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Masukkan Password"
                            className="pr-10"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-[#9DB17C] hover:underline"
                  >
                    Lupa Password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#9DB17C] hover:bg-[#8CA06B] text-white"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? (
                    <div className="flex items-center gap-2">
                      <Loader className="h-4 w-4 animate-spin" />
                      <span>Masuk...</span>
                    </div>
                  ) : (
                    "Masuk"
                  )}
                </Button>
              </form>
            </Form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-sm text-gray-500">
                  atau Masuk dengan
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              type="button"
              className="w-full flex items-center justify-center gap-2 border-gray-300"
              onClick={handleGoogleLogin}
              disabled={isGoogleLoggingIn}
            >
              {isGoogleLoggingIn ? (
                <div className="flex items-center gap-2">
                  <Loader className="h-4 w-4 animate-spin" />
                  <span>Memproses...</span>
                </div>
              ) : (
                <>
                  <img
                    src={icons.googleIcon}
                    alt="Google"
                    className="w-5 h-5"
                  />
                  Masuk dengan Google
                </>
              )}
            </Button>
          </CardContent>
          <CardFooter className="px-0 pb-0 pt-4">
            <div className="text-center w-full">
              <p className="text-sm text-gray-600">
                Belum punya akun?{" "}
                <Link
                  to="/register"
                  className="text-[#9DB17C] font-semibold hover:underline"
                >
                  Daftar Sekarang
                </Link>
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
