import { Button } from "@/components/ui/button";

const WalikotaDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard Walikota</h1>
      <p className="text-muted-foreground mb-8">
        Selamat datang di panel administrasi Walikota. Pantau dan kelola kota
        Anda dengan mudah.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-card rounded-xl shadow-sm">
          <h2 className="text-xl font-bold">Proyek Kota</h2>
          <p className="mt-2 text-muted-foreground">
            Kelola proyek infrastruktur dan pembangunan kota
          </p>
          <Button className="mt-4" variant="outline">
            Kelola Proyek
          </Button>
        </div>

        <div className="p-6 bg-card rounded-xl shadow-sm">
          <h2 className="text-xl font-bold">Anggaran</h2>
          <p className="mt-2 text-muted-foreground">
            Pantau dan kelola anggaran kota
          </p>
          <Button className="mt-4" variant="outline">
            Lihat Anggaran
          </Button>
        </div>

        <div className="p-6 bg-card rounded-xl shadow-sm">
          <h2 className="text-xl font-bold">Layanan Publik</h2>
          <p className="mt-2 text-muted-foreground">
            Manajemen layanan untuk warga kota
          </p>
          <Button className="mt-4" variant="outline">
            Atur Layanan
          </Button>
        </div>

        <div className="p-6 bg-card rounded-xl shadow-sm">
          <h2 className="text-xl font-bold">Acara Kota</h2>
          <p className="mt-2 text-muted-foreground">
            Jadwal dan kelola acara-acara kota
          </p>
          <Button className="mt-4" variant="outline">
            Kelola Acara
          </Button>
        </div>

        <div className="p-6 bg-card rounded-xl shadow-sm">
          <h2 className="text-xl font-bold">Pengumuman</h2>
          <p className="mt-2 text-muted-foreground">
            Buat dan kelola pengumuman resmi
          </p>
          <Button className="mt-4" variant="outline">
            Buat Pengumuman
          </Button>
        </div>

        <div className="p-6 bg-card rounded-xl shadow-sm">
          <h2 className="text-xl font-bold">Statistik Kota</h2>
          <p className="mt-2 text-muted-foreground">
            Lihat laporan dan statistik kota
          </p>
          <Button className="mt-4" variant="outline">
            Lihat Statistik
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WalikotaDashboard;
