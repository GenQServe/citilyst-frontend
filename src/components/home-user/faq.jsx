import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import useGSAP from "@/hooks/use-gsap";
import { ChevronRight, Plus, Minus } from "lucide-react";
import { images } from "@/constants/images";

const faqItems = [
  {
    id: "item-1",
    question: "Apa itu CityList?",
    answer:
      "CityList adalah platform pelaporan warga yang menghubungkan masyarakat dengan pemerintah kota. Aplikasi ini memungkinkan pengguna melaporkan masalah di sekitar mereka seperti jalan rusak, sampah, atau masalah infrastruktur lainnya dengan bantuan AI untuk deskripsi otomatis.",
  },
  {
    id: "item-2",
    question: "Bagaimana cara membuat laporan?",
    answer:
      "Untuk membuat laporan, login ke akun Anda, pilih menu 'Buat Laporan', lengkapi informasi yang diperlukan seperti kategori masalah, lokasi, deskripsi, dan tambahkan foto jika ada. AI akan membantu memberikan deskripsi otomatis untuk mempermudah pelaporan. Setelah selesai, klik 'Kirim' dan laporan Anda akan diproses.",
  },
  {
    id: "item-3",
    question: "Berapa lama laporan akan diproses?",
    answer:
      "Waktu pemrosesan laporan bervariasi tergantung pada jenis dan prioritas masalah. Umumnya, laporan akan ditinjau dalam waktu 1-2 hari kerja dan tindak lanjut akan dilakukan berdasarkan urgensi masalah yang dilaporkan.",
  },
  {
    id: "item-4",
    question: "Apakah saya bisa melacak status laporan saya?",
    answer:
      "Ya, Anda dapat melacak status laporan melalui menu 'Cek Status' dengan memasukkan nomor laporan atau melihatnya di dashboard akun Anda. Status akan diperbarui secara real-time sesuai dengan perkembangan penanganan laporan.",
  },
  {
    id: "item-5",
    question: "Apakah aplikasi ini gratis?",
    answer:
      "Ya, CityList sepenuhnya gratis untuk digunakan oleh semua warga. Tidak ada biaya untuk membuat akun, mengirimkan laporan, atau memantau status laporan yang telah dibuat.",
  },
  {
    id: "item-6",
    question: "Bagaimana AI membantu dalam membuat laporan?",
    answer:
      "AI di CityList dapat memberikan deskripsi otomatis tentang masalah yang dilaporkan. Fitur ini membantu membuat laporan lebih akurat dan detail, serta menghemat waktu Anda dalam menjelaskan kondisi masalah yang terjadi.",
  },
  {
    id: "item-7",
    question: "Apakah identitas saya akan dirahasiakan?",
    answer:
      "CityList menghormati privasi pengguna. Data pribadi Anda tidak akan dibagikan ke publik, tetapi mungkin diperlukan oleh pihak berwenang untuk menindaklanjuti laporan. Anda juga dapat memilih untuk melaporkan secara anonim pada kasus tertentu.",
  },
];

const FAQ = () => {
  const sectionRef = useRef(null);
  const accordionRef = useRef(null);
  const imageRef = useRef(null);
  const moreRef = useRef(null);
  const [showAll, setShowAll] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [accordionHeights, setAccordionHeights] = useState({});

  useGSAP(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    timeline
      .fromTo(
        imageRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.2)" }
      )
      .fromTo(
        accordionRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      );
  }, []);

  useEffect(() => {
    if (moreRef.current) {
      if (showAll) {
        gsap.fromTo(
          moreRef.current,
          { height: 0, opacity: 0 },
          {
            height: "auto",
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          }
        );
      } else {
        gsap.to(moreRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
        });
      }
    }
  }, [showAll]);

  const toggleAccordion = (itemId) => {
    setActiveItem(activeItem === itemId ? null : itemId);
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-20 lg:py-24 overflow-hidden"
    >
      <div className="container mx-auto px-5 md:px-8 lg:px-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
          <div
            ref={imageRef}
            className="order-first lg:order-first mb-8 lg:mb-0"
          >
            <img
              src={images.faqImage}
              alt="Frequently Asked Questions"
              className="w-full max-w-md mx-auto"
            />
          </div>
          <div ref={accordionRef} className="w-full">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="w-full">
                {faqItems.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className="border-b border-gray-100 last:border-b-0"
                  >
                    <button
                      className="w-full py-6 px-6 flex justify-between items-center cursor-pointer text-left bg-transparent border-none"
                      onClick={() => toggleAccordion(item.id)}
                      aria-expanded={activeItem === item.id}
                    >
                      <h3 className="text-lg font-medium">{item.question}</h3>
                      {activeItem === item.id ? (
                        <Minus className="text-green-600 w-6 h-6 flex-shrink-0 ml-2" />
                      ) : (
                        <Plus className="text-green-600 w-6 h-6 flex-shrink-0 ml-2" />
                      )}
                    </button>
                    <div
                      className={`transition-all duration-300 ease-in-out overflow-hidden bg-white px-6 ${
                        activeItem === item.id ? "max-h-96" : "max-h-0"
                      }`}
                    >
                      <div className="py-4 text-gray-700">
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div
                  ref={moreRef}
                  className="overflow-hidden"
                  style={{
                    height: showAll ? "auto" : "0px",
                    opacity: showAll ? 1 : 0,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  {faqItems.slice(3).map((item) => (
                    <div
                      key={item.id}
                      className="border-b border-gray-100 last:border-b-0"
                    >
                      <button
                        className="w-full py-6 px-6 flex justify-between items-center cursor-pointer text-left bg-transparent border-none"
                        onClick={() => toggleAccordion(item.id)}
                        aria-expanded={activeItem === item.id}
                      >
                        <h3 className="text-lg font-medium">{item.question}</h3>
                        {activeItem === item.id ? (
                          <Minus className="text-green-600 w-6 h-6 flex-shrink-0 ml-2" />
                        ) : (
                          <Plus className="text-green-600 w-6 h-6 flex-shrink-0 ml-2" />
                        )}
                      </button>
                      <div
                        className={`transition-all duration-300 ease-in-out overflow-hidden bg-white px-6 ${
                          activeItem === item.id ? "max-h-96" : "max-h-0"
                        }`}
                      >
                        <div className="py-4 text-gray-700">
                          <p>{item.answer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="py-4 px-6">
                  <button
                    className="text-green-600 hover:text-green-700 font-medium flex items-center bg-transparent border-none cursor-pointer"
                    onClick={() => setShowAll((prev) => !prev)}
                  >
                    {showAll ? "Lihat lebih sedikit" : "Lihat lebih lanjut"}
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
