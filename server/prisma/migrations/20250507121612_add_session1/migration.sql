/*
  Warnings:

  - Added the required column `userAgent` to the `UserSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserSession" ADD COLUMN     "userAgent" TEXT NOT NULL;
