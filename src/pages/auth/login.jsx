import { useState } from "react";
import { AuthBanner } from "@/components/auth/auth-banner";
import { LoginForm } from "@/components/auth/login-form";
import Loading from "@/components/loading";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex min-h-screen w-full relative">
      <AuthBanner />
      <LoginForm setLoading={setIsLoading} />

      {isLoading && (
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-40 h-40">
            <Loading />
          </div>
        </div>
      )}
    </div>
  );
}
