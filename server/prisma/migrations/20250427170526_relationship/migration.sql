/*
  Warnings:

  - Added the required column `companyId` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `permissiongroupId` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Companies" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "companyId" UUID NOT NULL,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "permissiongroupId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_permissiongroupId_fkey" FOREIGN KEY ("permissiongroupId") REFERENCES "PermissionGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
