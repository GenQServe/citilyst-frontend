import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { 
  Camera, 
  MapPin, 
  CheckCircle,
  AlertCircle,
  ChevronRight,
  UploadCloud
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
  CardTitle 
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

  // Animation with GSAP
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

  // Handle image uploads
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 0) {
      // Convert images to preview URLs
      const newImages = files.map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      
      setImages(prev => [...prev, ...newImages]);
    }
  };

  // Remove an image
  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  // Handle form submission (temporary mock)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (step < 3) {
      // Move to next step
      setStep(step + 1);
      // Scroll to top when changing steps
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    // On final step, submit the form
    setIsSubmitting(true);
    
    // Mock API call with timeout
    setTimeout(() => {
      setIsSubmitting(false);
      // Show success feedback and redirect
      alert("Laporan berhasil dibuat!");
      navigate("/user/laporan-saya"); // This route would need to be created separately
    }, 2000);
  };

  // Go back to previous step
  const goToPreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 py-8 px-4">
      <div ref={pageRef} className="w-full max-w-3xl">
        <div className="text-center mb-8">
          <h1 ref={titleRef} className="text-3xl font-bold">Buat Laporan</h1>
          <p className="text-gray-600 mt-2">
            Lengkapi detail laporan untuk menyampaikan keluhan Anda
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((s) => (
              <div 
                key={s}
                className={`flex flex-col items-center flex-1 ${s < 3 ? "relative" : ""}`}
              >
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    s === step 
                      ? "bg-[#9DB17C] text-white"
                      : s < step 
                        ? "bg-[#4E9F60] text-white"
                        : "bg-white border border-[#9DB17C] text-[#9DB17C]"
                  }`}
                >
                  {s < step ? <CheckCircle className="h-5 w-5" /> : s}
                </div>
                
                <span className={`text-xs text-center ${
                  s === step ? "font-medium text-[#9DB17C]" : "text-gray-600"
                }`}>
                  {s === 1 ? "Detail Laporan" : s === 2 ? "Tambah Media" : "Konfirmasi"}
                </span>
                
                {s < 3 && (
                  <div className="absolute top-5 left-1/2 w-full h-[2px] bg-gray-200">
                    <div 
                      className={`h-full bg-[#9DB17C] ${s < step ? "w-full" : "w-0"}`}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <Card className="shadow-sm">
          <form ref={formRef} onSubmit={handleSubmit}>
            {step === 1 && (
              <>
                <CardHeader>
                  <CardTitle>Detail Laporan</CardTitle>
                  <CardDescription>
                    Masukkan informasi detail tentang laporan Anda
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Kategori Laporan</Label>
                    <Select 
                      value={category} 
                      onValueChange={setCategory} 
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori laporan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="infrastruktur">Infrastruktur Jalan</SelectItem>
                        <SelectItem value="limbah">Limbah & Sampah</SelectItem>
                        <SelectItem value="lingkungan">Lingkungan Hidup</SelectItem>
                        <SelectItem value="air">Pelayanan Air</SelectItem>
                        <SelectItem value="listrik">Listrik & Penerangan</SelectItem>
                        <SelectItem value="lainnya">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">Judul Laporan</Label>
                    <Input
                      id="title"
                      placeholder="Masukkan judul laporan"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Deskripsi Laporan</Label>
                    <Textarea
                      id="description"
                      placeholder="Deskripsikan keluhan atau masalah yang ingin Anda laporkan secara detail"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={5}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Lokasi</Label>
                    <div className="relative">
                      <Input
                        id="location"
                        placeholder="Masukkan alamat lokasi kejadian"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="pr-10"
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
                <CardHeader>
                  <CardTitle>Lampirkan Media</CardTitle>
                  <CardDescription>
                    Tambahkan foto untuk memperkuat laporan Anda (opsional)
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
                    <UploadCloud className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-4 text-center">
                      Seret & lepas gambar di sini, atau klik tombol di bawah
                    </p>
                    
                    <Label
                      htmlFor="image-upload"
                      className="cursor-pointer bg-[#9DB17C] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#8CA06B]"
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
                      <Label className="block mb-2">Gambar terpilih ({images.length})</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {images.map((img, index) => (
                          <div key={index} className="relative rounded-md overflow-hidden border border-gray-200">
                            <img 
                              src={img.preview} 
                              alt={`Preview ${index}`}
                              className="w-full h-24 object-cover"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-1 right-1 w-6 h-6"
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
                <CardHeader>
                  <CardTitle>Konfirmasi Laporan</CardTitle>
                  <CardDescription>
                    Periksa kembali detail laporan Anda sebelum mengirim
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Kategori</p>
                      <Badge variant="outline" className="bg-[#9DB17C]/10 text-[#9DB17C]">
                        {category || "Tidak dipilih"}
                      </Badge>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Judul Laporan</p>
                      <p className="font-medium">{title || "Tidak ada judul"}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Deskripsi</p>
                      <p className="text-sm">{description || "Tidak ada deskripsi"}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Lokasi</p>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <p>{location || "Tidak ada lokasi"}</p>
                      </div>
                    </div>

                    {images.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Media ({images.length})</p>
                        <div className="flex gap-2 overflow-x-auto pb-2">
                          {images.map((img, index) => (
                            <img 
                              key={index}
                              src={img.preview} 
                              alt={`Preview ${index}`}
                              className="w-16 h-16 object-cover rounded-md border border-gray-200"
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
                          Pastikan data yang Anda masukkan sudah benar. 
                          Laporan yang sudah dikirim tidak dapat diubah.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </>
            )}
            
            <CardFooter className="flex justify-between pt-6">
              {step > 1 ? (
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={goToPreviousStep}
                >
                  Kembali
                </Button>
              ) : (
                <div></div>
              )}
              
              <Button 
                type="submit" 
                className="bg-[#9DB17C] hover:bg-[#8CA06B]"
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