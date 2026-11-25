-- CreateTable
CREATE TABLE "jasa" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR(100) NOT NULL,
    "kategori" VARCHAR(50) NOT NULL,
    "deskripsi" TEXT,
    "harga" INTEGER NOT NULL,
    "penyedia" VARCHAR(100) NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "tersedia" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "jasa_pkey" PRIMARY KEY ("id")
);
