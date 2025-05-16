import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const formSchema = z.object({
  otp: z.string().length(6, "OTP harus 6 digit"),
});

export function OtpForm() {
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(30);
  const inputRefs = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    let timer;
    if (resendDisabled && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [resendDisabled, countdown]);

  const onSubmit = (data) => {
    toast.success("Verifikasi berhasil", {
      description: "Akun Anda telah diverifikasi",
    });
  };

  const handleResendOtp = () => {
    if (!resendDisabled) {
      toast.info("OTP baru telah dikirim");
      setResendDisabled(true);
      setCountdown(30);
    }
  };

  const handleInputChange = (index, e) => {
    const value = e.target.value;

    if (value.length > 1) {
      e.target.value = value.charAt(0);
    }

    if (value !== "" && index < 5) {
      inputRefs[index + 1].current.focus();
    }

    const otpValue = inputRefs.map((ref) => ref.current.value).join("");
    form.setValue("otp", otpValue);
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, 6);

    if (/^\d+$/.test(pastedData)) {
      [...pastedData].forEach((char, index) => {
        if (index < 6) {
          inputRefs[index].current.value = char;
        }
      });

      if (pastedData.length === 6) {
        form.setValue("otp", pastedData);
      }

      if (pastedData.length < 6) {
        inputRefs[pastedData.length].current.focus();
      }
    }
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
            <CardTitle className="text-2xl font-bold">Verifikasi OTP</CardTitle>
            <p className="text-gray-500 text-sm mt-2">
              Masukkan kode 6 digit yang telah dikirimkan ke email Anda
            </p>
          </CardHeader>
          <CardContent className="px-0 space-y-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex gap-2 justify-between">
                          {[0, 1, 2, 3, 4, 5].map((index) => (
                            <Input
                              key={index}
                              ref={inputRefs[index]}
                              type="text"
                              inputMode="numeric"
                              className="w-12 h-12 text-center text-lg"
                              maxLength={1}
                              onChange={(e) => handleInputChange(index, e)}
                              onKeyDown={(e) => handleKeyDown(index, e)}
                              onPaste={index === 0 ? handlePaste : undefined}
                            />
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-[#9DB17C] hover:bg-[#8CA06B] text-white"
                >
                  Verifikasi
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="px-0 pb-0 pt-4">
            <div className="text-center w-full">
              <p className="text-sm text-gray-600 mb-2">Belum menerima kode?</p>
              <Button
                variant="ghost"
                size="sm"
                className={`text-[#9DB17C] hover:text-[#8CA06B] ${
                  resendDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={resendDisabled}
                onClick={handleResendOtp}
              >
                Kirim Ulang {resendDisabled && `(${countdown}s)`}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
