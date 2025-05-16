import { AuthBanner } from "@/components/auth/auth-banner";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen w-full">
      <AuthBanner />
      <RegisterForm />
    </div>
  );
}
