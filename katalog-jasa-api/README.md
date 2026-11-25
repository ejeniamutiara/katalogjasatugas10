# Katalog Jasa API

**Tugas 10 – Implementasi REST API + PostgreSQL + ORM (Prisma)**
Nama: Ejenia Mutiara Karimuse — NIM: 103022400124

## Deskripsi

Katalog Jasa adalah aplikasi web marketplace jasa sederhana, tempat talent menawarkan layanan (desain, video, pemrograman, audio, dan lain-lain). Proyek ini dikembangkan sejak Pekan 2 (HTML → CSS → Tailwind → JavaScript/jQuery → React → REST API NestJS).

Pada Pekan 10, backend NestJS yang sebelumnya menyimpan data di **array (memori)** kini terhubung ke **PostgreSQL** melalui **Prisma ORM**, sehingga data tersimpan permanen dan tidak hilang saat server di-restart.

## Teknologi

- NestJS 11 (TypeScript)
- PostgreSQL 16
- Prisma ORM 7 (`@prisma/adapter-pg`)
- class-validator untuk validasi input

## Struktur Penting

```
prisma/
  schema.prisma          # model Jasa
  migrations/            # dibuat otomatis oleh prisma migrate dev
  seed.ts                # data contoh
prisma.config.ts         # konfigurasi Prisma (url database, seed)
src/
  prisma/
    prisma.service.ts    # PrismaService (provider)
    prisma.module.ts     # module global agar bisa di-inject di mana saja
  jasa/
    jasa.controller.ts   # TIDAK diubah dari Pekan 9 (5 endpoint CRUD)
    jasa.service.ts      # array -> Prisma Client
    dto/                 # CreateJasaDto, UpdateJasaDto
docs/
  requests.http          # kumpulan request untuk uji API
  screenshots/           # screenshot tiap tahapan
```

## Model Data (`schema.prisma`)

```prisma
model Jasa {
  id        Int      @id @default(autoincrement())
  nama      String   @db.VarChar(100)
  kategori  String   @db.VarChar(50)
  deskripsi String?
  harga     Int
  penyedia  String   @db.VarChar(100)
  rating    Float    @default(0)
  tersedia  Boolean  @default(true)
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@map("jasa")
}
```

## Cara Menjalankan

Syarat: Node.js 20.19 atau lebih baru, PostgreSQL sudah terpasang.

```bash
# 1. Salin file env lalu sesuaikan user/password PostgreSQL
cp .env.example .env          # Windows: copy .env.example .env

# 2. Install dependency (otomatis menjalankan prisma generate)
npm install

# 3. Buat database di PostgreSQL
#    lewat psql:  CREATE DATABASE katalog_jasa;
#    atau lewat pgAdmin: klik kanan Databases > Create > Database

# 4. Migrasi awal (membuat tabel jasa)
npx prisma migrate dev --name init

# 5. (Opsional) isi data contoh
npx prisma db seed

# 6. Jalankan server
npm run start:dev
```

API berjalan di `http://localhost:3000`. Untuk melihat isi tabel secara visual: `npx prisma studio`.

## Endpoint

| Method | Endpoint | Keterangan |
|--------|----------|------------|
| GET | `/jasa` | Ambil semua jasa |
| GET | `/jasa/:id` | Ambil satu jasa (404 jika tidak ada) |
| POST | `/jasa` | Tambah jasa |
| PATCH | `/jasa/:id` | Ubah jasa |
| DELETE | `/jasa/:id` | Hapus jasa |
| GET | `/jasa/cari?kategori=&tersedia=&maxHarga=` | **(Opsional)** filter dengan `where` |
| GET | `/jasa/statistik` | **(Opsional)** statistik dengan `count`, `aggregate`, `groupBy` |

Contoh body POST:

```json
{
  "nama": "Jasa Foto Produk",
  "kategori": "Fotografi",
  "deskripsi": "10 foto produk + edit",
  "harga": 200000,
  "penyedia": "Ejenia Studio",
  "rating": 4.9
}
```

Contoh respons `/jasa/statistik`:

```json
{
  "totalJasa": 5,
  "jasaTersedia": 3,
  "rataRataHarga": 431000,
  "hargaTermurah": 75000,
  "hargaTermahal": 1500000,
  "rataRataRating": 4.78,
  "perKategori": [
    { "kategori": "Desain", "jumlah": 2 },
    { "kategori": "Fotografi", "jumlah": 1 }
  ]
}
```

## Perubahan dari Pekan 9

Controller tidak diubah. Yang diganti hanya isi service:

```ts
// Pekan 9 (array)
private jasa: Jasa[] = [];
findAll() { return this.jasa; }

// Pekan 10 (Prisma)
constructor(private readonly prisma: PrismaService) {}
findAll() { return this.prisma.jasa.findMany({ orderBy: { id: 'asc' } }); }
```

NestJS otomatis menunggu `Promise` yang dikembalikan service, jadi controller tetap sama.

## Screenshot

### 1. Database PostgreSQL dibuat
![database](docs/screenshots/01-postgres-database.png)

### 2. Model Prisma
![schema](docs/screenshots/02-schema-prisma.png)

### 3. Migrasi awal
![migrate](docs/screenshots/03-migrate-dev.png)

### 4. Tabel terbentuk
![tabel](docs/screenshots/04-tabel-terbentuk.png)

### 5. PrismaService terhubung ke service
![prisma service](docs/screenshots/05-prisma-service.png)

### 6. Server berjalan
![server](docs/screenshots/06-server-jalan.png)

### 7–10. CRUD
![create](docs/screenshots/07-create.png)
![read](docs/screenshots/08-read.png)
![update](docs/screenshots/09-update.png)
![delete](docs/screenshots/10-delete.png)

### 11. Data tetap ada setelah restart
![restart](docs/screenshots/11-restart-data-tetap.png)

### 12. (Opsional) Filter dan statistik
![filter statistik](docs/screenshots/12-filter-statistik.png)

### 13–14. Tampilan desktop dan mobile
![desktop](docs/screenshots/13-tampilan-desktop.png)
![mobile](docs/screenshots/14-tampilan-mobile.png)
