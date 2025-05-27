import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { images } from "@/constants/images";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#9CDE9F] text-black py-6 sm:py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 md:justify-between">
          <div className="max-w-md">
            <div className="mb-3 sm:mb-4">
              <img
                src={images.cityListLogo}
                alt="CityList Logo"
                className="h-8 sm:h-10 w-auto"
              />
            </div>
            <p className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4">
              Platform pelaporan keluhan masyarakat yang menghubungkan warga
              dengan pemerintah daerah untuk kota yang lebih baik.
            </p>
            <div className="flex gap-3 sm:gap-4">
              <Link
                to="#"
                className="text-gray-700 hover:text-[#4E9F60] transition-colors"
              >
                <FaFacebook size={16} />
              </Link>
              <Link
                to="#"
                className="text-gray-700 hover:text-[#4E9F60] transition-colors"
              >
                <FaInstagram size={16} />
              </Link>
              <Link
                to="#"
                className="text-gray-700 hover:text-[#4E9F60] transition-colors"
              >
                <FaTwitter size={16} />
              </Link>
            </div>
          </div>

          <div className="flex flex-col">
            <h4 className="font-semibold text-sm sm:text-base mb-2 sm:mb-3">
              Bantuan
            </h4>
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <Link
                to="#"
                className="text-xs sm:text-sm text-gray-700 hover:text-[#4E9F60] transition-colors"
              >
                FAQ
              </Link>
              <Link
                to="#"
                className="text-xs sm:text-sm text-gray-700 hover:text-[#4E9F60] transition-colors"
              >
                Panduan Penggunaan
              </Link>
              <Link
                to="#"
                className="text-xs sm:text-sm text-gray-700 hover:text-[#4E9F60] transition-colors"
              >
                Kebijakan Privasi
              </Link>
            </div>
          </div>

          <div className="flex flex-col">
            <h4 className="font-semibold text-sm sm:text-base mb-2 sm:mb-3">
              Kontak
            </h4>
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-[#4E9F60]" size={14} />
                <span className="text-xs sm:text-sm text-gray-700">
                  Jakarta, Indonesia
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaPhoneAlt className="text-[#4E9F60]" size={14} />
                <span className="text-xs sm:text-sm text-gray-700">
                  +62 896 8498 1540
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-[#4E9F60]" size={14} />
                <span className="text-xs sm:text-sm text-gray-700">
                  genqserve@gmail.com
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-[#4E9F60]/20 my-4 sm:my-6" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-2 sm:gap-4">
          <p className="text-[10px] sm:text-xs text-gray-500 text-center md:text-left">
            © {currentYear} CityList. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
