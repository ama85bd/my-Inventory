/*
  Warnings:

  - You are about to drop the column `password` on the `Companies` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Companies` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Companies_username_key";

-- AlterTable
ALTER TABLE "Companies" DROP COLUMN "password",
DROP COLUMN "username",
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "PermissionGroup" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "UserGroup" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "CompanyPayment" (
    "id" UUID NOT NULL,
    "companyId" UUID NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "paidAt" TIMESTAMP(3),
    "paymentMethod" TEXT,
    "transactionId" TEXT,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyPayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TempCompanies" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "chargeAmount" DOUBLE PRECISION,
    "vatAmount" DOUBLE PRECISION,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "TempCompanies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CompanyPayment_companyId_key" ON "CompanyPayment"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "TempCompanies_id_key" ON "TempCompanies"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TempCompanies_email_key" ON "TempCompanies"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TempCompanies_username_key" ON "TempCompanies"("username");

-- AddForeignKey
ALTER TABLE "CompanyPayment" ADD CONSTRAINT "CompanyPayment_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
