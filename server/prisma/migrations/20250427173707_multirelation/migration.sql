/*
  Warnings:

  - A unique constraint covering the columns `[companyId,name]` on the table `UserGroup` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userGroupId` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "userGroupId" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserGroup_companyId_name_key" ON "UserGroup"("companyId", "name");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_userGroupId_fkey" FOREIGN KEY ("userGroupId") REFERENCES "UserGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
