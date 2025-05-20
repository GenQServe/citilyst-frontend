import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import {
  Camera,
  MapPin,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  UploadCloud,
  Home,
  FileText,
  Trash2,
  Loader2,
  Calendar,
  Info,
} from "lucide-react";
import { toast } from "sonner";
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
import { Progress } from "@/components/ui/progress";
import {
  useDistrictsWithVillages,
  useReportCategories,
} from "@/hooks/use-locations";
import { useGenerateReportDescription } from "@/hooks/use-reports";
import {
  setCategory,
  setTitle,
  setDescription,
  setDistrictId,
  setVillageId,
  setLocation,
  setImages,
  setStep,
  setIsSubmitting,
} from "@/features/slices/reportSlice";

export default function CreateLaporan() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const fileInputRef = useRef(null);
  const pageRef = useRef(null);
  const titleRef = useRef(null);

  const {
    categoryId,
    categoryKey,
    title,
    description,
    districtId,
    villageId,
    location,
    images,
    step,
    isSubmitting,
  } = useSelector((state) => state.report);

  const [progress, setProgress] = useState(33);

  const { data: districtsData, isLoading: isLoadingDistricts } =
    useDistrictsWithVillages();
  const { data: categoriesData, isLoading: isLoadingCategories } =
    useReportCategories();
  const { mutate: generateDescription, isPending: isGeneratingDescription } =
    useGenerateReportDescription();

  const districts = districtsData?.data || [];
  const categories = categoriesData?.data || [];

  const selectedDistrict = districts.find(
    (district) => district.id === districtId
  );
  const villagesInSelectedDistrict = selectedDistrict?.villages || [];

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 0) {
      const newImages = files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      dispatch(setImages([...images, ...newImages]));
    }
  };

  const removeImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    dispatch(setImages(updatedImages));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (step < 3) {
      dispatch(setStep(step + 1));
      setProgress(step === 1 ? 66 : 100);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    dispatch(setIsSubmitting(true));

    try {
      const token = Cookies.get("token");
      if (!token) {
        toast.error("Silakan login terlebih dahulu");
        dispatch(setIsSubmitting(false));
        return;
      }

      const decoded = jwtDecode(token);
      if (!decoded || !decoded.sub) {
        toast.error("Token tidak valid");
        dispatch(setIsSubmitting(false));
        return;
      }

      const selectedCategory = categories.find((cat) => cat.id === categoryId);
      if (!selectedCategory) {
        toast.error("Kategori tidak valid");
        dispatch(setIsSubmitting(false));
        return;
      }

      const reportData = {
        user_id: decoded.sub,
        category_key: selectedCategory.key,
        district_id: districtId,
        village_id: villageId,
        description: description,
        location: location,
      };

      generateDescription(reportData);
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Terjadi kesalahan saat mengirim laporan");
      dispatch(setIsSubmitting(false));
    }
  };

  const goToPreviousStep = () => {
    if (step > 1) {
      dispatch(setStep(step - 1));
      setProgress(step === 3 ? 66 : 33);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add("border-[#9DB17C]", "bg-[#9DB17C]/5");
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("border-[#9DB17C]", "bg-[#9DB17C]/5");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("border-[#9DB17C]", "bg-[#9DB17C]/5");

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (files.length > 0) {
      const newImages = files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      dispatch(setImages([...images, ...newImages]));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleDistrictChange = (value) => {
    dispatch(setDistrictId(value));
    dispatch(setVillageId(""));
  };

  const handleSelectCategory = (id) => {
    const selectedCategory = categories.find((cat) => cat.id === id);
    if (selectedCategory) {
      dispatch(
        setCategory({
          id: selectedCategory.id,
          key: selectedCategory.key,
        })
      );
    }
  };

  const getSelectedCategoryName = () => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Tidak dipilih";
  };

  const getSelectedDistrictName = () => {
    const district = districts.find((dist) => dist.id === districtId);
    return district ? district.name : "";
  };

  const getSelectedVillageName = () => {
    const district = districts.find((dist) => dist.id === districtId);
    if (!district) return "";

    const village = district.villages.find((v) => v.id === villageId);
    return village ? village.name : "";
  };

  const getFullLocation = () => {
    const districtName = getSelectedDistrictName();
    const villageName = getSelectedVillageName();

    let fullLocation = "";

    if (districtName && villageName) {
      fullLocation = `Kecamatan ${districtName}, Kelurahan ${villageName}`;
      if (location) {
        fullLocation += `, ${location}`;
      }
    } else {
      fullLocation = location || "Tidak ada lokasi";
    }

    return fullLocation;
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div ref={pageRef} className="w-full max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1
              ref={titleRef}
              className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#4E9F60] to-[#9DB17C]"
            >
              Buat Laporan
            </h1>
            <p className="text-gray-600 mt-2">
              Sampaikan masalah di lingkungan sekitar Anda dengan mudah
            </p>
          </div>

          <div className="mb-8">
            <Progress value={progress} className="h-2 bg-gray-200" />

            <div className="flex items-center justify-between mt-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      s === step
                        ? "bg-[#4E9F60] text-white ring-4 ring-[#9DB17C]/20"
                        : s < step
                        ? "bg-[#9DB17C] text-white"
                        : "bg-white border-2 border-gray-200 text-gray-400"
                    }`}
                  >
                    {s < step ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : s === 1 ? (
                      <FileText className="h-5 w-5" />
                    ) : s === 2 ? (
                      <Camera className="h-5 w-5" />
                    ) : (
                      <CheckCircle className="h-5 w-5" />
                    )}
                  </div>

                  <span
                    className={`text-sm mt-2 font-medium ${
                      s === step ? "text-[#4E9F60]" : "text-gray-500"
                    }`}
                  >
                    {s === 1
                      ? "Detail Laporan"
                      : s === 2
                      ? "Tambah Media"
                      : "Konfirmasi"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Card className="shadow-lg border-0 overflow-hidden">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-1">
                {step === 1 && (
                  <>
                    <CardHeader className="border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-opacity-10 rounded-full">
                          <FileText className="h-5 w-5 text-[#4E9F60]" />
                        </div>
                        <div>
                          <CardTitle className="text-xl text-[#2D3748]">
                            Detail Laporan
                          </CardTitle>
                          <CardDescription>
                            Masukkan informasi detail laporan Anda
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-6 pb-2 px-6">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label
                            htmlFor="category"
                            className="text-[#4A5568] font-medium"
                          >
                            Kategori Laporan
                          </Label>
                          <Select
                            value={categoryId}
                            onValueChange={handleSelectCategory}
                            required
                            disabled={isLoadingCategories}
                          >
                            <SelectTrigger className="w-full border-gray-200 focus-visible:ring-[#9DB17C] h-11">
                              <SelectValue placeholder="Pilih kategori laporan" />
                            </SelectTrigger>
                            <SelectContent className="shadow-lg">
                              {categories.map((category) => (
                                <SelectItem
                                  key={category.id}
                                  value={category.id}
                                  className="cursor-pointer"
                                >
                                  {category.name.charAt(0).toUpperCase() +
                                    category.name.slice(1)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="title"
                            className="text-[#4A5568] font-medium"
                          >
                            Judul Laporan
                          </Label>
                          <Input
                            id="title"
                            placeholder="Contoh: Jalan Berlubang di Depan Pasar Minggu"
                            value={title}
                            onChange={(e) => dispatch(setTitle(e.target.value))}
                            className="border-gray-200 focus-visible:ring-[#9DB17C] h-11"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="description"
                            className="text-[#4A5568] font-medium"
                          >
                            Deskripsi Laporan
                          </Label>
                          <Textarea
                            id="description"
                            placeholder="Deskripsikan masalah secara detail. Contoh: Jalan berlubang dengan diameter sekitar 1 meter dan kedalaman 30 cm yang sangat membahayakan pengendara."
                            value={description}
                            onChange={(e) =>
                              dispatch(setDescription(e.target.value))
                            }
                            className="min-h-[150px] border-gray-200 focus-visible:ring-[#9DB17C]"
                            rows={5}
                            required
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Semakin detail informasi yang Anda berikan, semakin
                            mudah pihak berwenang menindaklanjuti
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="district"
                            className="text-[#4A5568] font-medium"
                          >
                            Kecamatan
                          </Label>
                          <Select
                            value={districtId}
                            onValueChange={handleDistrictChange}
                            required
                            disabled={isLoadingDistricts}
                          >
                            <SelectTrigger className="w-full border-gray-200 focus-visible:ring-[#9DB17C] h-11">
                              <SelectValue placeholder="Pilih kecamatan" />
                            </SelectTrigger>
                            <SelectContent className="shadow-lg">
                              {districts.map((district) => (
                                <SelectItem
                                  key={district.id}
                                  value={district.id}
                                  className="cursor-pointer"
                                >
                                  {district.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="village"
                            className="text-[#4A5568] font-medium"
                          >
                            Kelurahan
                          </Label>
                          <Select
                            value={villageId}
                            onValueChange={(value) =>
                              dispatch(setVillageId(value))
                            }
                            required
                            disabled={
                              !districtId ||
                              villagesInSelectedDistrict.length === 0
                            }
                          >
                            <SelectTrigger className="w-full border-gray-200 focus-visible:ring-[#9DB17C] h-11">
                              <SelectValue placeholder="Pilih kelurahan" />
                            </SelectTrigger>
                            <SelectContent className="shadow-lg">
                              {villagesInSelectedDistrict.map((village) => (
                                <SelectItem
                                  key={village.id}
                                  value={village.id}
                                  className="cursor-pointer"
                                >
                                  {village.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="location"
                            className="text-[#4A5568] font-medium"
                          >
                            Detail Lokasi Kejadian
                          </Label>
                          <div className="relative">
                            <Input
                              id="location"
                              placeholder="Contoh: Jl. Pahlawan No. 123, RT 02/RW 03, dekat Toko Maju Jaya"
                              value={location}
                              onChange={(e) =>
                                dispatch(setLocation(e.target.value))
                              }
                              className="pr-10 border-gray-200 focus-visible:ring-[#9DB17C] h-11"
                              required
                            />
                            <MapPin className="h-5 w-5 absolute right-3 top-3 text-gray-400" />
                          </div>
                          <p className="text-xs text-gray-500 flex items-center mt-1 gap-1">
                            <Info className="h-3 w-3" />
                            Sertakan nama jalan, RT/RW, dan titik acuan terdekat
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </>
                )}

                {step === 2 && (
                  <>
                    <CardHeader className="bg-gradient-to-r from-[#9DB17C]/10 to-[#4E9F60]/5 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#4E9F60] bg-opacity-10 rounded-full">
                          <Camera className="h-5 w-5 text-[#4E9F60]" />
                        </div>
                        <div>
                          <CardTitle className="text-xl text-[#2D3748]">
                            Tambah Dokumentasi
                          </CardTitle>
                          <CardDescription>
                            Foto akan membantu petugas menilai tingkat keparahan
                            masalah
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-6 pb-2 px-6">
                      <div className="space-y-6">
                        <div
                          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-8 bg-gray-50 hover:bg-gray-50/80 transition-all duration-300 cursor-pointer group"
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          onClick={triggerFileInput}
                        >
                          <div className="w-16 h-16 mb-4 rounded-full bg-[#4E9F60]/10 flex items-center justify-center">
                            <UploadCloud className="h-8 w-8 text-[#4E9F60]" />
                          </div>

                          <h3 className="text-base font-medium text-gray-700 mb-1">
                            Unggah Foto
                          </h3>
                          <p className="text-sm text-gray-500 mb-4 text-center max-w-xs">
                            Seret & lepas gambar di sini, atau klik untuk
                            memilih file
                          </p>

                          <Button
                            type="button"
                            className="bg-[#4E9F60] hover:bg-[#3d7d4c] transition-colors"
                          >
                            <Camera className="mr-2 h-4 w-4" />
                            Pilih Foto
                          </Button>

                          <p className="text-xs text-gray-500 mt-4">
                            Format: JPG, PNG, HEIC (maks. 5MB per foto)
                          </p>

                          <Input
                            ref={fileInputRef}
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
                            <div className="border-t border-gray-100 pt-5">
                              <div className="flex items-center justify-between mb-3">
                                <Label className="font-medium text-[#4A5568]">
                                  Foto terlampir ({images.length})
                                </Label>
                                {images.length > 0 && (
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8 px-2"
                                    onClick={() => dispatch(setImages([]))}
                                  >
                                    <Trash2 className="h-3.5 w-3.5 mr-1" />
                                    Hapus semua
                                  </Button>
                                )}
                              </div>
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {images.map((img, index) => (
                                  <div
                                    key={index}
                                    className="relative group rounded-lg overflow-hidden border border-gray-200 aspect-square bg-gray-100"
                                  >
                                    <img
                                      src={img.preview}
                                      alt={`Preview ${index + 1}`}
                                      className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
                                    <Button
                                      type="button"
                                      size="icon"
                                      className="absolute top-2 right-2 w-7 h-7 rounded-full opacity-0 group-hover:opacity-100 bg-white text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 shadow-sm"
                                      onClick={() => removeImage(index)}
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </Button>
                                    <Badge className="absolute bottom-2 left-2 bg-black/60 text-white text-xs hover:bg-black/60">
                                      Foto {index + 1}
                                    </Badge>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
                          <div className="flex gap-3">
                            <Info className="h-5 w-5 text-blue-600 flex-shrink-0" />
                            <div className="text-sm text-blue-700">
                              <p className="font-medium">Tips</p>
                              <p className="mt-1">
                                Foto yang jelas dan dari berbagai sudut akan
                                membantu petugas menilai situasi dengan lebih
                                baik.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </>
                )}

                {step === 3 && (
                  <>
                    <CardHeader className="bg-gradient-to-r from-[#9DB17C]/10 to-[#4E9F60]/5 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#4E9F60] bg-opacity-10 rounded-full">
                          <CheckCircle className="h-5 w-5 text-[#4E9F60]" />
                        </div>
                        <div>
                          <CardTitle className="text-xl text-[#2D3748]">
                            Konfirmasi Laporan
                          </CardTitle>
                          <CardDescription>
                            Periksa kembali detail laporan Anda sebelum mengirim
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-6 pb-2 px-6">
                      <div className="space-y-6">
                        <div className="bg-gray-50 rounded-xl p-5 space-y-5 border border-gray-100">
                          <div className="flex items-center gap-4">
                            <Badge
                              variant="outline"
                              className="bg-[#4E9F60]/10 text-[#4E9F60] font-medium py-1.5 px-3 rounded-lg"
                            >
                              {getSelectedCategoryName()}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="bg-gray-100/80 text-gray-700 font-medium py-1.5 px-3 rounded-lg flex items-center gap-1.5"
                            >
                              <Calendar className="h-3.5 w-3.5" />
                              {new Date().toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </Badge>
                          </div>

                          <div className="border-t border-gray-200 pt-4">
                            <p className="text-sm text-gray-500 mb-1">
                              Judul Laporan
                            </p>
                            <h3 className="font-semibold text-xl text-gray-800">
                              {title || "Tidak ada judul"}
                            </h3>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500 mb-1">
                              Deskripsi
                            </p>
                            <p className="text-gray-700 text-base whitespace-pre-line">
                              {description || "Tidak ada deskripsi"}
                            </p>
                          </div>

                          <div className="border-t border-gray-200 pt-4">
                            <p className="text-sm text-gray-500 mb-1">Lokasi</p>
                            <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-100/50">
                              <MapPin className="h-5 w-5 text-[#4E9F60]" />
                              <p className="text-gray-700">
                                {getFullLocation()}
                              </p>
                            </div>
                          </div>

                          {images.length > 0 && (
                            <div className="border-t border-gray-200 pt-4">
                              <p className="text-sm text-gray-500 mb-2">
                                Media ({images.length} foto)
                              </p>
                              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                {images.map((img, index) => (
                                  <div
                                    key={index}
                                    className="relative aspect-square"
                                  >
                                    <img
                                      src={img.preview}
                                      alt={`Preview ${index + 1}`}
                                      className="w-full h-full object-cover rounded-lg border border-gray-200"
                                    />
                                    <div className="absolute bottom-0 right-0 bg-black bg-opacity-60 text-white text-xs py-0.5 px-2 rounded-tl-md rounded-br-md">
                                      {index + 1}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                          <div className="flex gap-3">
                            <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0" />
                            <div className="text-sm text-amber-700">
                              <p className="font-medium">Perhatian</p>
                              <p className="mt-1">
                                Dengan mengirimkan laporan ini, Anda menyatakan
                                bahwa informasi yang diberikan adalah benar.
                                Laporan yang sudah dikirim tidak dapat diubah.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </>
                )}

                <CardFooter className="bg-gray-50/80 border-t border-gray-100 flex justify-between py-5 px-6 gap-4">
                  {step > 1 ? (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={goToPreviousStep}
                      className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                    >
                      Kembali
                    </Button>
                  ) : (
                    <div></div>
                  )}

                  <Button
                    type="submit"
                    className={`${
                      step === 3
                        ? "bg-[#4E9F60] hover:bg-[#3d7d4c]"
                        : "bg-[#9DB17C] hover:bg-[#8CA06B]"
                    } transition-colors min-w-[140px]`}
                    disabled={isSubmitting || isGeneratingDescription}
                  >
                    {isSubmitting || isGeneratingDescription ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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

            <div className="mt-6 text-center">
              <Button
                variant="ghost"
                className="text-white bg-red-500 hover:bg-red-600 transition-colors"
                onClick={() => navigate(-1)}
              >
                <Home className="mr-1 h-4 w-4" />
                Kembali ke Beranda
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
