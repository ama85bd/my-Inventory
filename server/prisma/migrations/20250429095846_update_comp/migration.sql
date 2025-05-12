/*
  Warnings:

  - You are about to drop the `TempCompanies` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `Companies` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Companies" ADD COLUMN     "password" TEXT,
ADD COLUMN     "username" TEXT;

-- DropTable
DROP TABLE "TempCompanies";

-- CreateIndex
CREATE UNIQUE INDEX "Companies_username_key" ON "Companies"("username");
