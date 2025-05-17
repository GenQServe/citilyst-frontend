import React from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div className="container max-w-4xl py-12 px-4 md:px-6">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Bell className="h-8 w-8 text-[#9DB17C]" />
          <h1 className="text-3xl font-bold">Notifikasi</h1>
        </div>
        
        <p className="text-gray-600 mb-8">
          Halaman ini menampilkan notifikasi dan pemberitahuan terkait aktivitas Anda.
        </p>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>Informasi Halaman</span>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">Info</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Fitur Notifikasi sedang dalam pengembangan. Segera Anda akan dapat:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Menerima pemberitahuan tentang status laporan Anda</li>
              <li>Mendapatkan notifikasi tentang kegiatan pemerintah kota</li>
              <li>Melihat pengumuman dan berita penting</li>
              <li>Mengelola pengaturan notifikasi</li>
            </ul>
            <p className="mt-4">
              Terima kasih atas kesabaran Anda sementara kami menyelesaikan pengembangan fitur ini.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}