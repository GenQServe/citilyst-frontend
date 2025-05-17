import { useUserProfile } from "@/hooks/use-auth";
import {
  Calendar,
  MapPin,
  Phone,
  Mail,
  Clock,
  User,
  Loader,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileCard = ({ icon: Icon, label, value, loading = false }) => (
  <div className="flex items-start space-x-3 p-4 rounded-lg bg-slate-50">
    <div className="mt-0.5 bg-white p-2 rounded-md">
      <Icon className="h-5 w-5 text-gray-500" />
    </div>
    <div className="space-y-1">
      <p className="text-sm text-gray-500">{label}</p>
      {loading ? (
        <Skeleton className="h-5 w-40" />
      ) : (
        <p className="font-medium">{value || "Belum diatur"}</p>
      )}
    </div>
  </div>
);

export default function UserProfilePage() {
  const { data: user, isLoading } = useUserProfile();

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
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
    <div className="container max-w-4xl py-12 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Profil Pengguna</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20 border-2 border-[#9DB17C]">
                  <AvatarImage src={user?.image_url} alt={user?.name} />
                  <AvatarFallback className="text-xl bg-[#9DB17C]/20 text-[#9DB17C]">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
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
                  user?.is_verified ? "bg-emerald-500" : "bg-yellow-500"
                }`}
              >
                {user?.is_verified ? "Terverifikasi" : "Belum Terverifikasi"}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProfileCard
                icon={Mail}
                label="Email"
                value={user?.email}
                loading={false}
              />

              <ProfileCard
                icon={User}
                label="NIK"
                value={user?.nik}
                loading={false}
              />

              <ProfileCard
                icon={Phone}
                label="Nomor Telepon"
                value={user?.phone_number}
                loading={false}
              />

              <ProfileCard
                icon={MapPin}
                label="Alamat"
                value={user?.address}
                loading={false}
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
    </div>
  );
}
