import { AuthBanner } from "@/components/auth/auth-banner";
import { OtpForm } from "@/components/auth/otp-form";

export default function VerifyOtpPage() {
  return (
    <div className="flex min-h-screen w-full">
      <AuthBanner />
      <OtpForm />
    </div>
  );
}
