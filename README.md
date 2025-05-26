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

1. **Buat Laporan**: Formulir pelaporan yang sederhana dan intuitif, dilengkapi kategori, deskripsi dibantu AI, lokasi kejadian, dan fitur unggah foto untuk mendukung laporan.

2. **Pantau Status**: Setiap laporan memiliki status yang jelas (Menunggu, Diproses, Selesai, Ditolak) dan dapat dipantau pengguna secara real-time melalui dashboard.

3. **Notifikasi & Umpan Balik**: Pengguna menerima notifikasi otomatis melalui email mengenai perkembangan laporan, serta dapat melihat umpan balik dari admin.

4. **Manajemen Laporan (Admin)**: Admin memiliki akses untuk melihat semua laporan, memperbarui status, memberikan respon, serta mengelola data pelapor secara efisien.

5. **Profil Pengguna**: Pengguna dapat melengkapi profil pribadi untuk mendukung proses verifikasi identitas dan mempercepat penanganan laporan.

6. **Dashboard Statistik**: Admin disediakan tampilan grafik dan visualisasi data laporan yang informatif, untuk mendukung analisis dan pengambilan keputusan.

7. **Autentikasi Aman**: Sistem login dan registrasi menggunakan JWT serta dukungan Google OAuth, memastikan keamanan dan kemudahan akses bagi pengguna.

8. **UI/UX Modern**: Desain antarmuka yang responsif, menarik, dan mudah digunakan di berbagai perangkat, memberikan pengalaman pengguna yang optimal.

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
   cd citilyst-frontend
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
