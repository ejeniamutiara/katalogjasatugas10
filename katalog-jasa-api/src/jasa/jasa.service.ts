import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '../generated/prisma/client';
import { CreateJasaDto } from './dto/create-jasa.dto';
import { UpdateJasaDto } from './dto/update-jasa.dto';

@Injectable()
export class JasaService {
  // Pekan 9: private jasa: Jasa[] = [];  <- diganti PrismaService
  constructor(private readonly prisma: PrismaService) {}

  create(createJasaDto: CreateJasaDto) {
    return this.prisma.jasa.create({ data: createJasaDto });
  }

  findAll() {
    return this.prisma.jasa.findMany({ orderBy: { id: 'asc' } });
  }

  async findOne(id: number) {
    const jasa = await this.prisma.jasa.findUnique({ where: { id } });
    if (!jasa) {
      throw new NotFoundException(`Jasa dengan id ${id} tidak ditemukan`);
    }
    return jasa;
  }

  async update(id: number, updateJasaDto: UpdateJasaDto) {
    await this.findOne(id); // 404 jika tidak ada
    return this.prisma.jasa.update({ where: { id }, data: updateJasaDto });
  }

  async remove(id: number) {
    await this.findOne(id); // 404 jika tidak ada
    return this.prisma.jasa.delete({ where: { id } });
  }

  // ===== (OPSIONAL) Query lanjutan =====

  cari(filter: { kategori?: string; tersedia?: string; maxHarga?: string }) {
    const where: Prisma.JasaWhereInput = {};
    if (filter.kategori) {
      where.kategori = { equals: filter.kategori, mode: 'insensitive' };
    }
    if (filter.tersedia !== undefined) {
      where.tersedia = filter.tersedia === 'true';
    }
    if (filter.maxHarga && !isNaN(Number(filter.maxHarga))) {
      where.harga = { lte: Number(filter.maxHarga) };
    }
    return this.prisma.jasa.findMany({ where, orderBy: { harga: 'asc' } });
  }

  async statistik() {
    const [total, tersedia, agregat, perKategori] = await Promise.all([
      this.prisma.jasa.count(),
      this.prisma.jasa.count({ where: { tersedia: true } }),
      this.prisma.jasa.aggregate({
        _avg: { harga: true, rating: true },
        _min: { harga: true },
        _max: { harga: true },
      }),
      this.prisma.jasa.groupBy({
        by: ['kategori'],
        _count: { _all: true },
        orderBy: { kategori: 'asc' },
      }),
    ]);

    return {
      totalJasa: total,
      jasaTersedia: tersedia,
      rataRataHarga: Math.round(agregat._avg.harga ?? 0),
      hargaTermurah: agregat._min.harga ?? 0,
      hargaTermahal: agregat._max.harga ?? 0,
      rataRataRating: Number((agregat._avg.rating ?? 0).toFixed(2)),
      perKategori: perKategori.map((k) => ({
        kategori: k.kategori,
        jumlah: k._count._all,
      })),
    };
  }
}
