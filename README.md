# CityList

CityList adalah aplikasi web modern yang dirancang untuk memudahkan warga kota dalam melaporkan, memantau, dan mendapatkan solusi atas permasalahan di lingkungan sekitar mereka. Dengan CityList, pelaporan masalah seperti infrastruktur rusak, sampah menumpuk, atau kendala pelayanan publik menjadi lebih mudah, transparan, dan terpantau secara real-time.

---

## Apa Itu CityList?

CityList adalah platform pelaporan masyarakat berbasis web yang memungkinkan warga untuk:

- Membuat laporan masalah di lingkungan sekitar secara online.
- Melampirkan foto dan menentukan lokasi kejadian secara akurat.
- Memantau status penanganan laporan secara transparan.
- Mendapatkan notifikasi dan umpan balik dari petugas/admin.
- Berkontribusi aktif dalam menciptakan kota yang lebih baik.

Aplikasi ini juga menyediakan dashboard khusus untuk admin/petugas kota agar dapat mengelola, memverifikasi, dan menindaklanjuti setiap laporan yang masuk.

---

## Fitur Utama

- **Buat Laporan**: Formulir pelaporan yang mudah digunakan, dengan pilihan kategori, deskripsi dengan teknologi AI, lokasi, dan upload foto pendukung.
- **Pantau Status**: Setiap laporan memiliki status (Menunggu, Diproses, Selesai, Ditolak) yang dapat dipantau secara real-time.
- **Notifikasi & Umpan Balik**: Pengguna menerima notifikasi otomatis melalui email dan feedback dari admin terkait perkembangan laporan.
- **Manajemen Laporan (Admin)**: Admin dapat melihat seluruh laporan, memperbarui status, memberikan feedback, dan mengelola data pelapor.
- **Profil Pengguna**: Pengguna dapat melengkapi profil untuk memudahkan verifikasi dan penanganan laporan.
- **Dashboard Statistik**: Visualisasi data laporan, grafik, dan insight untuk admin.
- **Autentikasi Aman**: Login/registrasi dengan JWT, serta pengelolaan sesi yang aman.
- **UI/UX Modern**: Tampilan responsif, interaktif, dan mudah digunakan di berbagai perangkat.

---

## Tech Stack Frontend

- **React.js** (Vite) — Library utama untuk membangun UI.
- **Redux Toolkit** — State management aplikasi.
- **React Query** — Data fetching & caching.
- **Tailwind CSS** — Utility-first CSS framework untuk styling responsif.
- **date-fns** — Utility untuk manipulasi tanggal.
- **lucide-react** — Ikon modern berbasis React.
- **sonner** — Notifikasi toast.
- **js-cookie** — Manajemen cookie (token, sesi).
- **react-markdown** — Render konten markdown.
- **Chart.js & react-chartjs-2** — Visualisasi data laporan.
- **Radix UI** — Komponen UI aksesibel.
- **Lainnya**: axios, zod, embla-carousel, gsap, lottie dan lain-lain.

---

## Struktur Folder Frontend

```
├── .github/workflows/     # Workflow CI/CD (GitHub Actions)
├── public/                # File statis (ikon, gambar, favicon)
├── src/
│   ├── assets/            # Gambar, ikon, dan aset statis
│   ├── components/        # Komponen UI reusable
│   │   ├── auth/          # Komponen autentikasi (login, register, OTP)
│   │   ├── feedback/      # Komponen feedback & carousel
│   │   ├── home-user/     # Komponen halaman utama user
│   │   ├── navbar/        # Navigasi utama
│   │   ├── sidebar-admin/ # Sidebar & navbar admin
│   │   ├── ui/            # Komponen UI generik (button, input, dialog, dsb)
│   │   └── user/          # Komponen khusus user (laporan, detail, dsb)
│   ├── constants/         # Konstanta global (ikon, gambar)
│   ├── features/          # Redux slices & store
│   ├── hooks/             # Custom hooks (data fetching, logic)
│   ├── layouts/           # Layout halaman (user, admin)
│   ├── lib/               # Utility & helper functions
│   ├── pages/             # Halaman utama aplikasi (user, admin, auth)
│   ├── providers/         # Context & provider React
│   ├── routes/            # Routing aplikasi
│   └── services/          # API service layer (axios, endpoint)
├── .env                   # Konfigurasi environment (API URL, dsb)
├── Dockerfile             # Konfigurasi Docker build
├── docker-compose.yml     # Konfigurasi Docker Compose (jika ada)
├── .dockerignore          # File/folder yang diabaikan Docker
├── package.json           # Dependency & script npm
├── vite.config.js         # Konfigurasi Vite
└── README.md              # Dokumentasi proyek
```

---

## Cara Menjalankan Aplikasi

1. **Clone repository**

   ```sh
   git clone https://github.com/GenQServe/citilyst-frontend.git
   cd citilyst-fe
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Konfigurasi environment**

   - Buat file `.env` di root project, isi dengan URL API backend:

     ```env
     VITE_API_URL=https://api.citilyst.rekrutgenai.com/v1
     ```

   - Jika menggunakan backend lokal, sesuaikan dengan URL lokal:

     ```env
     VITE_FRONTEND_URL=`http://localhost:5173` (atau sesuai kebutuhan).
     ```

4. **Jalankan aplikasi (development)**

   ```sh
   npm run dev
   ```

   Aplikasi akan berjalan di `http://localhost:5173` (default Vite).

5. **Build untuk produksi**

   ```sh
   npm run build
   ```

   Hasil build ada di folder `dist/`.

---

## Menjalankan dengan Docker

1. **Build image Docker**

   ```sh
   docker build -t citylist-fe .
   ```

2. **Jalankan container**

   ```sh
   docker run -p 5173:5173 citylist-fe
   ```

   Atau gunakan `docker-compose` jika tersedia.

---

## Cara Kerja Singkat

- **Pengguna**: Login/daftar → Buat laporan → Pantau status → Dapat notifikasi & feedback → Laporan selesai.
- **Admin**: Login → Lihat & kelola laporan → Update status → Beri feedback → Statistik laporan.

---

**CityList** — Bersama wujudkan kota yang lebih baik!
