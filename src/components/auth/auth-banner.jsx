import { images } from "@/constants/images";

export function AuthBanner() {
  return (
    <div className="hidden lg:block md:w-1/2 min-h-screen">
      <img
        src={images.authBanner}
        alt="Auth Banner"
        className="h-full w-full object-cover"
      />
    </div>
  );
}
