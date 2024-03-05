/*
  Warnings:

  - You are about to drop the column `price` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "product" DROP COLUMN "price",
ADD COLUMN     "pricePurchase" DECIMAL(20,5) NOT NULL DEFAULT 0,
ADD COLUMN     "priceSale" DECIMAL(20,5) NOT NULL DEFAULT 0,
ADD COLUMN     "stock" DECIMAL(20,5) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "date" TIMESTAMP(3),
ADD COLUMN     "lastLogin" TIMESTAMP(3),
ADD COLUMN     "state" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "client" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "identification" VARCHAR NOT NULL,
    "phone" VARCHAR NOT NULL,
    "address" VARCHAR NOT NULL,
    "birthday" DATE NOT NULL,
    "lastPurchase" DATE NOT NULL,
    "shopping" INTEGER NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sales" (
    "id" SERIAL NOT NULL,
    "code" INTEGER NOT NULL,
    "idClient" INTEGER NOT NULL,
    "idSeller" INTEGER NOT NULL,
    "products" VARCHAR NOT NULL,
    "tax" DECIMAL(20,5) NOT NULL,
    "userId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,

    CONSTRAINT "sales_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "client_name_key" ON "client"("name");

-- CreateIndex
CREATE UNIQUE INDEX "client_identification_key" ON "client"("identification");

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
