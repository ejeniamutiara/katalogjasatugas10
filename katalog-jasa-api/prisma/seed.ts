import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function main() {
  await prisma.jasa.createMany({
    data: [
      { nama: 'Desain Logo UMKM', kategori: 'Desain', deskripsi: '3 konsep logo + revisi 2x', harga: 150000, penyedia: 'Rina Art', rating: 4.8 },
      { nama: 'Edit Video Shorts', kategori: 'Video', deskripsi: 'Maks 60 detik, subtitle otomatis', harga: 75000, penyedia: 'Abung Studio', rating: 4.6 },
      { nama: 'Website Company Profile', kategori: 'Pemrograman', deskripsi: 'React + Tailwind, 5 halaman', harga: 1500000, penyedia: 'Dev Bandung', rating: 4.9 },
      { nama: 'Ilustrasi Karakter Anime', kategori: 'Desain', harga: 250000, penyedia: 'Mochi Draw', rating: 4.7, tersedia: false },
      { nama: 'Voice Over Narasi', kategori: 'Audio', deskripsi: 'Bahasa Indonesia, per 1 menit', harga: 50000, penyedia: 'Suara Kita', rating: 4.5 },
    ],
  });
  console.log('Seed selesai: 5 data jasa ditambahkan');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
