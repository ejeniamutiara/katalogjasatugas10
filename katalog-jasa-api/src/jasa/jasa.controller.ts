import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { JasaService } from './jasa.service';
import { CreateJasaDto } from './dto/create-jasa.dto';
import { UpdateJasaDto } from './dto/update-jasa.dto';

// Controller ini SAMA seperti Pekan 9 untuk 5 endpoint CRUD.
// Yang berubah hanya isi JasaService (array -> Prisma).
// Dua endpoint bertanda (OPSIONAL) adalah tambahan untuk query lanjutan.
@Controller('jasa')
export class JasaController {
  constructor(private readonly jasaService: JasaService) {}

  @Post()
  create(@Body() createJasaDto: CreateJasaDto) {
    return this.jasaService.create(createJasaDto);
  }

  @Get()
  findAll() {
    return this.jasaService.findAll();
  }

  // (OPSIONAL) filter: GET /jasa/cari?kategori=Desain&tersedia=true&maxHarga=200000
  @Get('cari')
  cari(
    @Query('kategori') kategori?: string,
    @Query('tersedia') tersedia?: string,
    @Query('maxHarga') maxHarga?: string,
  ) {
    return this.jasaService.cari({ kategori, tersedia, maxHarga });
  }

  // (OPSIONAL) statistik: GET /jasa/statistik
  @Get('statistik')
  statistik() {
    return this.jasaService.statistik();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.jasaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateJasaDto: UpdateJasaDto,
  ) {
    return this.jasaService.update(id, updateJasaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.jasaService.remove(id);
  }
}
