-- DropForeignKey
ALTER TABLE "PermissionGroup" DROP CONSTRAINT "PermissionGroup_updateBy_fkey";

-- AlterTable
ALTER TABLE "PermissionGroup" ALTER COLUMN "updateBy" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "PermissionGroup" ADD CONSTRAINT "PermissionGroup_updateBy_fkey" FOREIGN KEY ("updateBy") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
