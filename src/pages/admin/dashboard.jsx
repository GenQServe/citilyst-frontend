import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3, 
  Calendar, 
  FileSpreadsheet, 
  MessageSquare, 
  Settings, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2 
} from "lucide-react";

const WalikotaDashboard = () => {
  // Sample data - in a real app, this would come from your API
  const stats = {
    totalReports: 128,
    pendingReports: 42,
    resolvedReports: 86,
    usersCount: 1580,
    popularCategories: [
      { name: "Infrastruktur Jalan", count: 48 },
      { name: "Limbah & Sampah", count: 37 },
      { name: "Lingkungan Hidup", count: 25 },
    ],
    recentReports: [
      { id: "RP-2023-001", title: "Jalan Rusak di Jl. Sudirman", status: "PENDING", date: "12 Mei 2023" },
      { id: "RP-2023-002", title: "Masalah Sampah di Taman Kota", status: "RESOLVED", date: "10 Mei 2023" },
      { id: "RP-2023-003", title: "Lampu Jalan Mati di Perumahan", status: "IN_REVIEW", date: "9 Mei 2023" },
      { id: "RP-2023-004", title: "Saluran Air Tersumbat", status: "PENDING", date: "7 Mei 2023" },
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING": return "text-yellow-500 bg-yellow-50";
      case "IN_REVIEW": return "text-blue-500 bg-blue-50";
      case "RESOLVED": return "text-green-500 bg-green-50";
      default: return "text-gray-500 bg-gray-50";
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Dashboard Walikota</h1>
        <p className="text-muted-foreground">
          Selamat datang di panel administrasi CitiLyst. Pantau dan kelola laporan warga dengan mudah.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-600 text-sm font-medium">Laporan Menunggu</p>
                <h3 className="text-2xl font-bold mt-1">{stats.pendingReports}</h3>
              </div>
              <div className="h-12 w-12 bg-amber-200 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-600 text-sm font-medium">Laporan Selesai</p>
                <h3 className="text-2xl font-bold mt-1">{stats.resolvedReports}</h3>
              </div>
              <div className="h-12 w-12 bg-emerald-200 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Total Pengguna</p>
                <h3 className="text-2xl font-bold mt-1">{stats.usersCount}</h3>
              </div>
              <div className="h-12 w-12 bg-blue-200 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Laporan Terbaru</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-xs text-left text-gray-500 border-b">
                      <th className="pb-2 font-medium">ID</th>
                      <th className="pb-2 font-medium">Judul</th>
                      <th className="pb-2 font-medium">Tanggal</th>
                      <th className="pb-2 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentReports.map((report) => (
                      <tr key={report.id} className="border-b border-gray-100">
                        <td className="py-3 text-sm">{report.id}</td>
                        <td className="py-3 text-sm font-medium">{report.title}</td>
                        <td className="py-3 text-sm text-gray-500">{report.date}</td>
                        <td className="py-3">
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(report.status)}`}>
                            {report.status === "PENDING" && "Menunggu"}
                            {report.status === "IN_REVIEW" && "Ditinjau"}
                            {report.status === "RESOLVED" && "Selesai"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-right">
                <Button variant="outline" size="sm" onClick={() => navigate('/walikota/laporan')}>
                  Lihat Semua Laporan
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Grafik Laporan Bulanan</CardTitle>
            </CardHeader>
            <CardContent className="px-2">
              <div className="h-[250px] flex items-center justify-center bg-gray-50 rounded-md">
                <div className="text-center px-4">
                  <BarChart3 className="h-16 w-16 mx-auto text-gray-300" />
                  <p className="mt-2 text-gray-500">Grafik statistik akan ditampilkan di sini</p>
                  <Button variant="outline" size="sm" className="mt-4">
                    Tampilkan Data
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Kategori Laporan Populer</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {stats.popularCategories.map((category, idx) => (
                  <li key={idx} className="flex items-center justify-between">
                    <span className="text-sm">{category.name}</span>
                    <div className="flex items-center">
                      <span className="text-sm font-medium">{category.count}</span>
                      <div className={`ml-2 w-16 h-2 rounded-full ${
                        idx === 0 ? 'bg-green-400' :
                        idx === 1 ? 'bg-blue-400' : 'bg-amber-400'
                      }`}></div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Aksi Cepat</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-2 text-sm" size="sm">
                  <FileSpreadsheet className="h-4 w-4" />
                  Kelola Laporan Warga
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 text-sm" size="sm">
                  <MessageSquare className="h-4 w-4" />
                  Buat Pengumuman
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 text-sm" size="sm">
                  <Calendar className="h-4 w-4" />
                  Jadwalkan Kegiatan
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 text-sm" size="sm">
                  <Settings className="h-4 w-4" />
                  Pengaturan Sistem
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Perkembangan Kota</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-md mb-2">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Peningkatan Penanganan</p>
                  <p className="text-xs text-gray-500">+15% dari bulan lalu</p>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mt-3">
                Tingkat penyelesaian laporan warga meningkat dibandingkan periode sebelumnya.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WalikotaDashboard;