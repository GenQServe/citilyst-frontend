import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F4FFEE] px-4">
      <div className="w-full max-w-md">
        <DotLottieReact
          src="https://lottie.host/056b9dd4-994a-4c47-a835-c26008cbef80/lsr0k3YEMS.lottie"
          loop
          autoplay
        />
      </div>
      <h1 className="text-3xl font-bold mt-6 text-center">
        Halaman Tidak Ditemukan
      </h1>
      <p className="text-gray-600 mt-2 text-center max-w-md">
        Maaf, halaman yang Anda cari tidak dapat ditemukan atau telah
        dipindahkan.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <Button
          onClick={goBack}
          variant="outline"
          className="border-[#9DB17C] text-[#9DB17C] hover:bg-[#9DB17C]/10"
        >
          Kembali
        </Button>
        <Link to="/home">
          <Button className="bg-[#9DB17C] hover:bg-[#8CA06B] text-white">
            Kembali ke Beranda
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
