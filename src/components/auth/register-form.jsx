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
import { useRegister } from "@/hooks/use-auth";
import Cookies from "js-cookie";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.string().email("Email tidak valid").min(1, "Email wajib diisi"),
  nik: z
    .string()
    .min(16, "NIK harus 16 digit")
    .max(16, "NIK harus 16 digit")
    .regex(/^\d+$/, "NIK hanya boleh berisi angka"),
  password: z.string().min(8, "Password minimal 8 karakter"),
});

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: register, isPending } = useRegister();
  const navigate = useNavigate();

  useEffect(() => {
    const email = Cookies.get("email");
    if (email) {
      toast.info("Anda sudah terdaftar, silakan verifikasi OTP");
      navigate("/verify-otp");
    }
  }, [navigate]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      nik: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    register(data);
  };

  const handleBackClick = () => {
    Cookies.remove("email");
  };

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-8 lg:py-12">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-8 text-gray-600 hover:text-gray-900"
          onClick={handleBackClick}
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="font-medium">Kembali</span>
        </Link>

        <Card className="border-0 shadow-none">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-2xl font-bold">
              Daftar Akun CityList
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Lengkap</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan Nama Lengkap" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                  name="nik"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>NIK</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan NIK"
                          maxLength={16}
                          {...field}
                        />
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

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full bg-[#9DB17C] hover:bg-[#8CA06B] text-white"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <div className="flex items-center gap-2">
                        <Loader className="h-4 w-4 animate-spin" />
                        <span>Mendaftar...</span>
                      </div>
                    ) : (
                      "Daftar"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="px-0 pb-0 pt-4">
            <div className="text-center w-full">
              <p className="text-sm text-gray-600">
                Sudah punya akun?{" "}
                <Link
                  to="/login"
                  className="text-[#9DB17C] font-semibold hover:underline"
                  onClick={handleBackClick}
                >
                  Masuk
                </Link>
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
