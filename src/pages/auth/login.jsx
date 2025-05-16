import { AuthBanner } from "@/components/auth/auth-banner";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full">
      <AuthBanner />
      <LoginForm />
    </div>
  );
}
