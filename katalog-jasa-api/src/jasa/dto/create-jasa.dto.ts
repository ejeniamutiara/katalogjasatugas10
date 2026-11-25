import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateJasaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nama: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  kategori: string;

  @IsOptional()
  @IsString()
  deskripsi?: string;

  @IsInt()
  @Min(0)
  harga: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  penyedia: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating?: number;

  @IsOptional()
  @IsBoolean()
  tersedia?: boolean;
}
