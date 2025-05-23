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
    <footer className="bg-[#9CDE9F] text-black py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-10 md:gap-8 md:flex-row md:justify-between">
          <div className="max-w-md flex-1">
            <div className="mb-4">
              <img
                src={images.cityListLogo}
                alt="CityList Logo"
                className="h-10 w-auto"
              />
            </div>
            <p className="text-sm text-gray-700 mb-4">
              Platform pelaporan keluhan masyarakat yang menghubungkan warga
              dengan pemerintah daerah untuk kota yang lebih baik.
            </p>
            <div className="flex gap-4">
              <Link
                to="#"
                className="text-gray-700 hover:text-[#4E9F60] transition-colors"
              >
                <FaFacebook size={18} />
              </Link>
              <Link
                to="#"
                className="text-gray-700 hover:text-[#4E9F60] transition-colors"
              >
                <FaInstagram size={18} />
              </Link>
              <Link
                to="#"
                className="text-gray-700 hover:text-[#4E9F60] transition-colors"
              >
                <FaTwitter size={18} />
              </Link>
            </div>
          </div>

          <div className="w-full flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-base mb-3">Menu</h4>
              <div className="flex flex-col gap-2">
                <Link
                  to="/home"
                  className="text-sm text-gray-700 hover:text-[#4E9F60] transition-colors"
                >
                  Beranda
                </Link>
                <Link
                  to="/user/create-report"
                  className="text-sm text-gray-700 hover:text-[#4E9F60] transition-colors"
                >
                  Buat Laporan
                </Link>
                <Link
                  to="/user/check-status"
                  className="text-sm text-gray-700 hover:text-[#4E9F60] transition-colors"
                >
                  Cek Status
                </Link>
                <Link
                  to="/user/notifications"
                  className="text-sm text-gray-700 hover:text-[#4E9F60] transition-colors"
                >
                  Notifikasi
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-base mb-3">Bantuan</h4>
              <div className="flex flex-col gap-2">
                <Link
                  to="#"
                  className="text-sm text-gray-700 hover:text-[#4E9F60] transition-colors"
                >
                  FAQ
                </Link>
                <Link
                  to="#"
                  className="text-sm text-gray-700 hover:text-[#4E9F60] transition-colors"
                >
                  Pusat Bantuan
                </Link>
                <Link
                  to="#"
                  className="text-sm text-gray-700 hover:text-[#4E9F60] transition-colors"
                >
                  Kebijakan Privasi
                </Link>
                <Link
                  to="#"
                  className="text-sm text-gray-700 hover:text-[#4E9F60] transition-colors"
                >
                  Syarat & Ketentuan
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-base mb-3">Kontak</h4>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-[#4E9F60]" size={14} />
                  <span className="text-sm text-gray-700">
                    Jakarta, Indonesia
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaPhoneAlt className="text-[#4E9F60]" size={14} />
                  <span className="text-sm text-gray-700">
                    +62 896 8498 1540
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-[#4E9F60]" size={14} />
                  <span className="text-sm text-gray-700">
                    info@citylist.id
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-[#4E9F60]/20 my-6" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 text-center md:text-left">
            © {currentYear} CityList. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
