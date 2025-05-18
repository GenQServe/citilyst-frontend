import { useState } from "react";
import { useUserProfile } from "@/hooks/use-auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
  Eye,
  EyeOff,
  X,
  Check,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  updateUserProfile,
  updateUserProfilePicture,
} from "@/services/auth-service";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const ProfileCard = ({ icon: Icon, label, value, loading = false, onEdit }) => (
  <div className="flex items-start space-x-3 p-4 rounded-lg bg-slate-50 relative hover:bg-slate-100 transition-colors group">
    <div className="mt-0.5 bg-white p-2 rounded-md">
      <Icon className="h-5 w-5 text-gray-500" />
    </div>
    <div className="space-y-1 flex-grow">
      <p className="text-sm text-gray-500">{label}</p>
      {loading ? (
        <Skeleton className="h-5 w-40" />
      ) : (
        <p className="font-medium break-words">{value || "Belum diatur"}</p>
      )}
    </div>
    {onEdit && (
      <Button
        size="icon"
        variant="ghost"
        className="opacity-0 group-hover:opacity-100 absolute right-2 top-2 h-7 w-7"
        onClick={onEdit}
      >
        <PenLine className="h-3.5 w-3.5" />
      </Button>
    )}
  </div>
);

export default function UserProfilePage() {
  const { data: user, isLoading, refetch } = useUserProfile();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [editedField, setEditedField] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    nik: "",
    phone_number: "",
    address: "",
    password: "",
    new_password: "",
    confirm_password: "",
    image_url: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordTab, setIsPasswordTab] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  // Mutasi untuk update profile data (tanpa gambar)
  const { mutate: updateProfile, isPending: isProfilePending } = useMutation({
    mutationFn: (data) => updateUserProfile(user?.id, data),
    onSuccess: () => {
      toast.success("Profil berhasil diperbarui");
      setIsEditing(false);
      setEditedField(null);
      queryClient.invalidateQueries(["userProfile"]);
      refetch();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal memperbarui profil");
    },
  });

  // Mutasi untuk update foto profil
  const { mutate: updateProfilePicture, isPending: isPicturePending } = useMutation({
    mutationFn: (file) => updateUserProfilePicture(user?.id, file),
    onSuccess: () => {
      toast.success("Foto profil berhasil diperbarui");
      setIsEditing(false);
      setEditedField(null);
      setPreviewImage(null);
      queryClient.invalidateQueries(["userProfile"]);
      refetch();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal memperbarui foto profil");
    },
  });

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
    setIsPasswordTab(field === "password");
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
    if (isPasswordTab) {
      toast.error("Ganti password harus lewat menu khusus (belum didukung)");
      return;
    }
    if (editedField === "image_url" && editForm.image_url) {
      updateProfilePicture(editForm.image_url);
    } else if (
      editedField &&
      ["name", "email", "nik", "phone_number", "address"].includes(editedField)
    ) {
      const payload = {};
      payload[editedField] = editForm[editedField];
      updateProfile(payload);
    } else {
      toast.error("Tidak ada perubahan data");
    }
  };

  const handleCloseDialog = () => {
    setIsEditing(false);
    setEditedField(null);
    setPreviewImage(null);
    setIsPasswordTab(false);
  };

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-2">
          <Loader className="h-10 w-10 animate-spin text-[#9DB17C]" />
          <p className="text-gray-500">Memuat data profil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full">
      <div className="container max-w-4xl py-12 px-4 md:px-6 flex flex-col">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-4">Profil Pengguna</h1>
        </div>

        <Card className="overflow-hidden border-none shadow-md">
          <CardHeader className="relative px-6 pt-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <Avatar className="h-24 w-24 border-4 border-white shadow-md ring-2 ring-[#9DB17C]/20">
                    <AvatarImage src={user?.image_url} alt={user?.name} />
                    <AvatarFallback className="text-2xl bg-[#9DB17C]/20 text-[#9DB17C]">
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute bottom-0 right-0 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 bg-[#9DB17C] hover:bg-[#8CA06B] transition-opacity shadow-md"
                    onClick={() => handleEditClick("image_url")}
                  >
                    <PenLine className="h-4 w-4 text-white" />
                  </Button>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{user?.name}</h2>
                  <Badge
                    variant="outline"
                    className="capitalize bg-[#9DB17C]/10 text-[#9DB17C] border-[#9DB17C]/20"
                  >
                    {user?.role || "User"}
                  </Badge>
                </div>
              </div>

              <Badge
                className={`${
                  user?.is_verified
                    ? "bg-emerald-500 hover:bg-emerald-600"
                    : "bg-yellow-500 hover:bg-yellow-600"
                }`}
              >
                {user?.is_verified ? "Terverifikasi" : "Belum Terverifikasi"}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="px-6 pt-4 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <ProfileCard
                icon={User}
                label="Nama Lengkap"
                value={user?.name}
                loading={false}
                onEdit={() => handleEditClick("name")}
              />

              <ProfileCard
                icon={User}
                label="Password"
                value="••••••••"
                loading={false}
                onEdit={() => handleEditClick("password")}
              />

              <ProfileCard
                icon={Calendar}
                label="Terdaftar Pada"
                value={formatDate(user?.created_at)}
                loading={false}
              />

              <ProfileCard
                icon={Clock}
                label="Terakhir Diperbarui"
                value={formatDate(user?.updated_at)}
                loading={false}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isEditing} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {isPasswordTab
                ? "Ubah Password"
                : editedField === "image_url"
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

          {isPasswordTab ? (
            <Tabs defaultValue="password" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="password" className="flex-1">
                  Ubah Password
                </TabsTrigger>
              </TabsList>
              <TabsContent value="password" className="mt-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password Saat Ini</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      onChange={handleInputChange}
                      value={editForm.password}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new_password">Password Baru</Label>
                  <div className="relative">
                    <Input
                      id="new_password"
                      name="new_password"
                      type={showPassword ? "text" : "password"}
                      onChange={handleInputChange}
                      value={editForm.new_password}
                      className="pr-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm_password">Konfirmasi Password</Label>
                  <div className="relative">
                    <Input
                      id="confirm_password"
                      name="confirm_password"
                      type={showPassword ? "text" : "password"}
                      onChange={handleInputChange}
                      value={editForm.confirm_password}
                      className="pr-10"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          ) : editedField === "image_url" ? (
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center">
                <Avatar className="h-24 w-24 mb-2 border-2 border-[#9DB17C]">
                  <AvatarImage
                    src={previewImage || user?.image_url}
                    alt={user?.name}
                  />
                  <AvatarFallback className="text-xl bg-[#9DB17C]/20 text-[#9DB17C]">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <Label
                  htmlFor="image"
                  className="cursor-pointer bg-[#9DB17C] text-white hover:bg-[#8CA06B] px-3 py-1.5 rounded-md flex items-center gap-1.5 text-sm"
                >
                  <Camera className="h-3.5 w-3.5" />
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
                <p className="text-xs text-center text-gray-500">
                  Foto baru dipilih
                </p>
              )}
            </div>
          ) : editedField === "address" ? (
            <div className="space-y-2">
              <Label htmlFor={editedField}>{`${
                editedField === "name"
                  ? "Nama"
                  : editedField === "email"
                  ? "Email"
                  : editedField === "nik"
                  ? "NIK"
                  : editedField === "phone_number"
                  ? "Nomor Telepon"
                  : "Alamat"
              }`}</Label>
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
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor={editedField}>{`${
                editedField === "name"
                  ? "Nama"
                  : editedField === "email"
                  ? "Email"
                  : editedField === "nik"
                  ? "NIK"
                  : "Nomor Telepon"
              }`}</Label>
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
              />
            </div>
          )}

          <DialogFooter className="sm:justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleCloseDialog}
              disabled={isPending}
            >
              <X className="h-4 w-4 mr-1.5" /> Batal
            </Button>
            <Button
              type="button"
              className="bg-[#9DB17C] hover:bg-[#8CA06B]"
              onClick={handleSubmit}
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader className="h-4 w-4 mr-2 animate-spin" /> Menyimpan...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-1.5" /> Simpan
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}