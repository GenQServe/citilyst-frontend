import { useState } from "react";
import {
  useUserProfile,
  useUpdateProfile,
  useUpdateProfilePicture,
} from "@/hooks/use-auth";
import {
  Calendar,
  MapPin,
  Phone,
  Mail,
  Clock,
  User,
  Loader,
  PenLine,
  Camera,
  X,
  Check,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const ProfileCard = ({ icon: Icon, label, value, loading = false, onEdit }) => (
  <div className="flex items-start space-x-3 p-4 rounded-lg bg-white border border-gray-100 shadow-sm relative hover:shadow-md transition-all group">
    <div className="mt-0.5 bg-[#9DB17C]/10 p-2 rounded-full">
      <Icon className="h-5 w-5 text-[#9DB17C]" />
    </div>
    <div className="space-y-1 flex-grow">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      {loading ? (
        <Skeleton className="h-5 w-40" />
      ) : (
        <p className="font-medium break-words text-gray-700">
          {value || "Belum diatur"}
        </p>
      )}
    </div>
    {onEdit && (
      <Button
        size="icon"
        variant="ghost"
        className="opacity-0 group-hover:opacity-100 absolute right-2 top-2 h-7 w-7 text-[#9DB17C] hover:bg-[#9DB17C]/10"
        onClick={onEdit}
      >
        <PenLine className="h-3.5 w-3.5" />
      </Button>
    )}
  </div>
);

export default function UserProfilePage() {
  const { data: user, isLoading } = useUserProfile();
  const { mutate: updateProfile, isPending: isProfilePending } =
    useUpdateProfile();
  const { mutate: updateProfilePicture, isPending: isPicturePending } =
    useUpdateProfilePicture();

  const [isEditing, setIsEditing] = useState(false);
  const [editedField, setEditedField] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    nik: "",
    phone_number: "",
    address: "",
    image_url: null,
  });
  const [previewImage, setPreviewImage] = useState(null);

  const isPending = isProfilePending || isPicturePending;

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleEditClick = (field) => {
    setEditedField(field);
    setEditForm((prev) => ({
      ...prev,
      [field]: user?.[field] || "",
    }));
    setIsEditing(true);
    if (field === "image_url") setPreviewImage(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditForm((prev) => ({
        ...prev,
        image_url: file,
      }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    if (editedField === "image_url" && editForm.image_url) {
      updateProfilePicture(editForm.image_url);
      setIsEditing(false);
    } else if (
      editedField &&
      ["name", "email", "nik", "phone_number", "address"].includes(editedField)
    ) {
      const payload = {};
      payload[editedField] = editForm[editedField];
      updateProfile(payload);
      setIsEditing(false);
    } else {
      toast.error("Tidak ada perubahan data");
    }
  };

  const handleCloseDialog = () => {
    setIsEditing(false);
    setEditedField(null);
    setPreviewImage(null);
  };

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="flex flex-col items-center gap-2">
          <div className="relative h-16 w-16 flex items-center justify-center">
            <div className="absolute h-16 w-16 rounded-full border-4 border-t-[#9DB17C] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
            <div className="absolute h-12 w-12 rounded-full border-4 border-t-transparent border-r-[#9DB17C]/70 border-b-transparent border-l-transparent animate-spin"></div>
          </div>
          <p className="text-gray-500 font-medium mt-2">
            Memuat data profil...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full min-h-[calc(100vh-64px)]">
      <div className="container max-w-5xl py-12 px-4 md:px-6 flex flex-col">
        <div className="mb-8 relative">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">
            Profil Pengguna
          </h1>
          <div className="h-1 w-24 bg-[#9DB17C] rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card className="overflow-hidden border-none shadow-lg bg-white">
              <CardHeader className="relative px-6 pt-6 pb-4 border-b bg-[#9DB17C]/5">
                <div className="flex flex-col items-center text-center">
                  <div className="relative group mb-3">
                    <div className="absolute inset-0 rounded-full bg-[#9DB17C]/20 blur-lg transform scale-110 group-hover:scale-125 transition-all duration-300"></div>
                    <Avatar className="h-32 w-32 border-4 border-white shadow-lg ring-2 ring-[#9DB17C]/30 relative">
                      <AvatarImage src={user?.image_url} alt={user?.name} />
                      <AvatarFallback className="text-4xl bg-[#9DB17C]/20 text-[#9DB17C]">
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute bottom-0 right-1 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 bg-[#9DB17C] hover:bg-[#8CA06B] transition-all shadow-md"
                      onClick={() => handleEditClick("image_url")}
                    >
                      <PenLine className="h-4 w-4 text-white" />
                    </Button>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mt-2">
                    {user?.name}
                  </h2>
                  <p className="text-gray-500 text-sm mb-2">{user?.email}</p>
                  <div className="flex gap-2 flex-wrap justify-center">
                    <Badge
                      variant="outline"
                      className="capitalize bg-[#9DB17C]/10 text-[#9DB17C] border-[#9DB17C]/20"
                    >
                      {user?.role || "User"}
                    </Badge>
                    <Badge
                      className={`${
                        user?.is_verified
                          ? "bg-emerald-500 hover:bg-emerald-600"
                          : "bg-yellow-500 hover:bg-yellow-600"
                      }`}
                    >
                      {user?.is_verified
                        ? "Terverifikasi"
                        : "Belum Terverifikasi"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="px-6 pt-6 pb-6 bg-gradient-to-b from-[#9DB17C]/5 to-transparent">
                <div className="flex flex-col gap-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Calendar className="h-4 w-4 text-[#9DB17C]" />
                    <p className="text-sm text-gray-600">
                      Terdaftar pada {formatDate(user?.created_at)}
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="h-4 w-4 text-[#9DB17C]" />
                    <p className="text-sm text-gray-600">
                      Terakhir diperbarui {formatDate(user?.updated_at)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="overflow-hidden border-none shadow-lg bg-white">
              <CardHeader className="relative px-6 pt-6 pb-4 border-b">
                <div className="flex flex-row items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Informasi Pribadi
                  </h3>
                  <Badge
                    variant="outline"
                    className="capitalize bg-[#9DB17C]/5 border-[#9DB17C]/30 text-[#9DB17C]"
                  >
                    Data Pengguna
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="px-6 py-6">
                <div className="grid grid-cols-1 gap-4">
                  <ProfileCard
                    icon={User}
                    label="Nama Lengkap"
                    value={user?.name}
                    loading={false}
                    onEdit={() => handleEditClick("name")}
                  />

                  <ProfileCard
                    icon={Mail}
                    label="Email"
                    value={user?.email}
                    loading={false}
                    onEdit={() => handleEditClick("email")}
                  />

                  <ProfileCard
                    icon={User}
                    label="NIK"
                    value={user?.nik}
                    loading={false}
                    onEdit={() => handleEditClick("nik")}
                  />

                  <ProfileCard
                    icon={Phone}
                    label="Nomor Telepon"
                    value={user?.phone_number}
                    loading={false}
                    onEdit={() => handleEditClick("phone_number")}
                  />

                  <ProfileCard
                    icon={MapPin}
                    label="Alamat"
                    value={user?.address}
                    loading={false}
                    onEdit={() => handleEditClick("address")}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={isEditing} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-md ">
          <DialogHeader>
            <DialogTitle>
              {editedField === "image_url"
                ? "Ubah Foto Profil"
                : `Ubah ${
                    editedField === "name"
                      ? "Nama"
                      : editedField === "email"
                      ? "Email"
                      : editedField === "nik"
                      ? "NIK"
                      : editedField === "phone_number"
                      ? "Nomor Telepon"
                      : "Alamat"
                  }`}
            </DialogTitle>
          </DialogHeader>

          {editedField === "image_url" ? (
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center">
                <Avatar className="h-32 w-32 mb-4 border-2 border-[#9DB17C]">
                  <AvatarImage
                    src={previewImage || user?.image_url}
                    alt={user?.name}
                  />
                  <AvatarFallback className="text-2xl bg-[#9DB17C]/20 text-[#9DB17C]">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <Label
                  htmlFor="image"
                  className="cursor-pointer bg-[#9DB17C] text-white hover:bg-[#8CA06B] px-4 py-2 rounded-md flex items-center gap-2 text-sm transition-colors"
                >
                  <Camera className="h-4 w-4" />
                  Pilih Foto
                </Label>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
              {previewImage && (
                <div className="text-xs text-center text-gray-500 bg-[#9DB17C]/5 p-2 rounded-md border border-[#9DB17C]/20">
                  <p>Foto baru dipilih dan siap diunggah</p>
                </div>
              )}
            </div>
          ) : editedField === "address" ? (
            <div className="space-y-3">
              <Label htmlFor={editedField} className="text-sm font-medium">
                {`${
                  editedField === "name"
                    ? "Nama"
                    : editedField === "email"
                    ? "Email"
                    : editedField === "nik"
                    ? "NIK"
                    : editedField === "phone_number"
                    ? "Nomor Telepon"
                    : "Alamat"
                }`}
              </Label>
              <Textarea
                id={editedField}
                name={editedField}
                value={editForm[editedField]}
                onChange={handleInputChange}
                placeholder={`Masukkan ${
                  editedField === "name"
                    ? "nama"
                    : editedField === "email"
                    ? "email"
                    : editedField === "nik"
                    ? "NIK"
                    : editedField === "phone_number"
                    ? "nomor telepon"
                    : "alamat"
                }`}
                rows={3}
                className="resize-none focus-visible:ring-[#9DB17C]"
              />
            </div>
          ) : (
            <div className="space-y-3">
              <Label htmlFor={editedField} className="text-sm font-medium">
                {`${
                  editedField === "name"
                    ? "Nama"
                    : editedField === "email"
                    ? "Email"
                    : editedField === "nik"
                    ? "NIK"
                    : "Nomor Telepon"
                }`}
              </Label>
              <Input
                id={editedField}
                name={editedField}
                value={editForm[editedField]}
                onChange={handleInputChange}
                placeholder={`Masukkan ${
                  editedField === "name"
                    ? "nama"
                    : editedField === "email"
                    ? "email"
                    : editedField === "nik"
                    ? "NIK"
                    : "nomor telepon"
                }`}
                className="focus-visible:ring-[#9DB17C]"
              />
            </div>
          )}

          <DialogFooter className="sm:justify-end gap-2 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCloseDialog}
              disabled={isPending}
              className="border-gray-300 hover:bg-gray-50"
            >
              <X className="h-4 w-4 mr-2" /> Batal
            </Button>
            <Button
              type="button"
              className="bg-[#9DB17C] hover:bg-[#8CA06B] text-white"
              onClick={handleSubmit}
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <div className="h-4 w-4 mr-2 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                  Menyimpan...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" /> Simpan
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
