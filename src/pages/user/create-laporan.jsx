import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import {
  Camera,
  MapPin,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  UploadCloud,
  Home,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import useGSAP from "@/hooks/use-gsap";

export default function CreateLaporan() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pageRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6 }
    ).fromTo(
      formRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 }
    );
  }, []);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 0) {
      const newImages = files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (step < 3) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      alert("Laporan berhasil dibuat!");
      navigate("/user/laporan-saya");
    }, 2000);
  };

  const goToPreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-10">
      <div ref={pageRef} className="w-full max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 ref={titleRef} className="text-2xl md:text-3xl font-bold">
            Buat Laporan
          </h1>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Lengkapi detail laporan untuk menyampaikan keluhan Anda
          </p>
        </div>

        <div className="mb-10">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex flex-col items-center flex-1 ${
                  s < 3 ? "relative" : ""
                }`}
              >
                <div
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                    s === step
                      ? "bg-[#9DB17C] text-white"
                      : s < step
                      ? "bg-[#4E9F60] text-white"
                      : "bg-white border border-[#9DB17C] text-[#9DB17C]"
                  }`}
                >
                  {s < step ? (
                    <CheckCircle className="h-4 w-4 md:h-5 md:w-5" />
                  ) : (
                    s
                  )}
                </div>

                <span
                  className={`text-xs md:text-sm text-center ${
                    s === step ? "font-medium text-[#9DB17C]" : "text-gray-600"
                  }`}
                >
                  {s === 1
                    ? "Detail Laporan"
                    : s === 2
                    ? "Tambah Media"
                    : "Konfirmasi"}
                </span>

                {s < 3 && (
                  <div className="absolute top-4 md:top-5 left-1/2 w-full h-[2px] bg-gray-200 -z-10">
                    <div
                      className={`h-full bg-[#9DB17C] transition-all duration-500 ${
                        s < step ? "w-full" : "w-0"
                      }`}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <Card className="shadow-md border-[#E2E8F0]">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-1">
            {step === 1 && (
              <>
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl text-[#2D3748]">
                    Detail Laporan
                  </CardTitle>
                  <CardDescription>
                    Masukkan informasi detail tentang laporan Anda
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-[#4A5568]">
                      Kategori Laporan
                    </Label>
                    <Select
                      value={category}
                      onValueChange={setCategory}
                      required
                    >
                      <SelectTrigger className="w-full border-[#E2E8F0] focus:ring-[#9DB17C]">
                        <SelectValue placeholder="Pilih kategori laporan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="infrastruktur">
                          Infrastruktur Jalan
                        </SelectItem>
                        <SelectItem value="limbah">Limbah & Sampah</SelectItem>
                        <SelectItem value="lingkungan">
                          Lingkungan Hidup
                        </SelectItem>
                        <SelectItem value="air">Pelayanan Air</SelectItem>
                        <SelectItem value="listrik">
                          Listrik & Penerangan
                        </SelectItem>
                        <SelectItem value="lainnya">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-[#4A5568]">
                      Judul Laporan
                    </Label>
                    <Input
                      id="title"
                      placeholder="Masukkan judul laporan"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="border-[#E2E8F0] focus:ring-[#9DB17C]"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-[#4A5568]">
                      Deskripsi Laporan
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Deskripsikan keluhan atau masalah yang ingin Anda laporkan secara detail"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="min-h-[120px] border-[#E2E8F0] focus:ring-[#9DB17C]"
                      rows={5}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-[#4A5568]">
                      Lokasi
                    </Label>
                    <div className="relative">
                      <Input
                        id="location"
                        placeholder="Masukkan alamat lokasi kejadian"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="pr-10 border-[#E2E8F0] focus:ring-[#9DB17C]"
                        required
                      />
                      <MapPin className="h-5 w-5 absolute right-3 top-2.5 text-gray-400" />
                    </div>
                  </div>
                </CardContent>
              </>
            )}

            {step === 2 && (
              <>
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl text-[#2D3748]">
                    Lampirkan Media
                  </CardTitle>
                  <CardDescription>
                    Tambahkan foto untuk memperkuat laporan Anda (opsional)
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-[#E2E8F0] rounded-lg p-6 bg-gray-50 transition-all hover:bg-gray-100">
                    <UploadCloud className="h-8 w-8 md:h-10 md:w-10 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-4 text-center max-w-xs mx-auto">
                      Seret & lepas gambar di sini, atau klik tombol di bawah
                    </p>

                    <Label
                      htmlFor="image-upload"
                      className="cursor-pointer bg-[#9DB17C] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#8CA06B] transition-colors"
                    >
                      <Camera className="h-4 w-4" />
                      <span>Pilih Gambar</span>
                    </Label>

                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </div>

                  {images.length > 0 && (
                    <div>
                      <Label className="block mb-3 text-[#4A5568]">
                        Gambar terpilih ({images.length})
                      </Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {images.map((img, index) => (
                          <div
                            key={index}
                            className="relative rounded-md overflow-hidden border border-gray-200 aspect-square"
                          >
                            <img
                              src={img.preview}
                              alt={`Preview ${index}`}
                              className="w-full h-full object-cover"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-1 right-1 w-6 h-6 rounded-full opacity-90 hover:opacity-100"
                              onClick={() => removeImage(index)}
                            >
                              &times;
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </>
            )}

            {step === 3 && (
              <>
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl text-[#2D3748]">
                    Konfirmasi Laporan
                  </CardTitle>
                  <CardDescription>
                    Periksa kembali detail laporan Anda sebelum mengirim
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-5 space-y-5 border border-[#EDF2F7]">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Kategori</p>
                      <Badge
                        variant="outline"
                        className="bg-[#9DB17C]/10 text-[#9DB17C] font-medium"
                      >
                        {category || "Tidak dipilih"}
                      </Badge>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        Judul Laporan
                      </p>
                      <p className="font-medium text-[#2D3748]">
                        {title || "Tidak ada judul"}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-1">Deskripsi</p>
                      <p className="text-sm text-[#4A5568]">
                        {description || "Tidak ada deskripsi"}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-1">Lokasi</p>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-[#9DB17C]" />
                        <p className="text-[#4A5568]">
                          {location || "Tidak ada lokasi"}
                        </p>
                      </div>
                    </div>

                    {images.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-500 mb-2">
                          Media ({images.length})
                        </p>
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 overflow-hidden">
                          {images.map((img, index) => (
                            <img
                              key={index}
                              src={img.preview}
                              alt={`Preview ${index}`}
                              className="w-full aspect-square object-cover rounded-md border border-gray-200"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3">
                    <div className="flex gap-3">
                      <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                      <div className="text-sm text-yellow-700">
                        <p className="font-medium">Perhatian</p>
                        <p className="mt-1">
                          Pastikan data yang Anda masukkan sudah benar. Laporan
                          yang sudah dikirim tidak dapat diubah.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </>
            )}

            <CardFooter className="flex justify-between pt-6 px-6 pb-6 gap-4">
              {step > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={goToPreviousStep}
                  className="border-[#9DB17C] text-[#9DB17C] hover:bg-[#9DB17C]/10 transition-colors"
                >
                  Kembali
                </Button>
              ) : (
                <div></div>
              )}

              <Button
                type="submit"
                className="bg-[#9DB17C] hover:bg-[#8CA06B] transition-colors flex-1 md:flex-none md:min-w-[140px]"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin mr-2">◌</span>
                    Memproses...
                  </>
                ) : step < 3 ? (
                  <>
                    Lanjutkan
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </>
                ) : (
                  "Kirim Laporan"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
