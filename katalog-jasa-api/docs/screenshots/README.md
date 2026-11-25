# Screenshot Tahapan

Simpan screenshot di folder ini dengan nama berikut supaya otomatis tampil di README utama.

| No | Nama file | Isi screenshot |
|----|-----------|----------------|
| 1 | `01-postgres-database.png` | pgAdmin / `psql` menampilkan database `katalog_jasa` sudah dibuat |
| 2 | `02-schema-prisma.png` | Isi file `prisma/schema.prisma` (model `Jasa`) di VS Code |
| 3 | `03-migrate-dev.png` | Terminal setelah `npx prisma migrate dev --name init` berhasil |
| 4 | `04-tabel-terbentuk.png` | Tabel `jasa` terlihat di pgAdmin (atau `\dt` di psql / Prisma Studio) |
| 5 | `05-prisma-service.png` | File `src/prisma/prisma.service.ts` dan `jasa.service.ts` |
| 6 | `06-server-jalan.png` | Terminal `npm run start:dev` menampilkan "API berjalan di http://localhost:3000" |
| 7 | `07-create.png` | POST `/jasa` berhasil (status 201) |
| 8 | `08-read.png` | GET `/jasa` dan GET `/jasa/:id` |
| 9 | `09-update.png` | PATCH `/jasa/:id` berhasil |
| 10 | `10-delete.png` | DELETE `/jasa/:id` berhasil |
| 11 | `11-restart-data-tetap.png` | Server dimatikan (Ctrl+C), dijalankan lagi, GET `/jasa` datanya masih ada |
| 12 | `12-filter-statistik.png` | (Opsional) GET `/jasa/cari?...` dan GET `/jasa/statistik` |
| 13 | `13-tampilan-desktop.png` | Frontend React menampilkan data dari API, ukuran desktop |
| 14 | `14-tampilan-mobile.png` | Frontend yang sama di mode mobile (Chrome DevTools → Ctrl+Shift+M) |
