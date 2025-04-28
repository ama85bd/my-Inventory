-- CreateTable
CREATE TABLE "Users" (
    "id" UUID NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "gender" TEXT,
    "image" TEXT,
    "password" TEXT NOT NULL,
    "companyId" UUID NOT NULL,
    "userGroupId" UUID NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Companies" (
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
    "image" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PermissionGroup" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "isView" BOOLEAN NOT NULL DEFAULT false,
    "isCreate" BOOLEAN NOT NULL DEFAULT false,
    "isUpdate" BOOLEAN NOT NULL DEFAULT false,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,
    "updateBy" UUID NOT NULL,
    "companyId" UUID NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PermissionGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserGroup" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "companyId" UUID NOT NULL,
    "permissiongroupId" UUID NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PermissionGroupOnUserGroups" (
    "id" UUID NOT NULL,
    "userGroupId" UUID NOT NULL,
    "permissionGroupId" UUID NOT NULL,

    CONSTRAINT "PermissionGroupOnUserGroups_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_id_key" ON "Users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Companies_id_key" ON "Companies"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Companies_email_key" ON "Companies"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Companies_username_key" ON "Companies"("username");

-- CreateIndex
CREATE UNIQUE INDEX "PermissionGroup_id_key" ON "PermissionGroup"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserGroup_id_key" ON "UserGroup"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserGroup_companyId_name_key" ON "UserGroup"("companyId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "PermissionGroupOnUserGroups_id_key" ON "PermissionGroupOnUserGroups"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PermissionGroupOnUserGroups_userGroupId_permissionGroupId_key" ON "PermissionGroupOnUserGroups"("userGroupId", "permissionGroupId");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_userGroupId_fkey" FOREIGN KEY ("userGroupId") REFERENCES "UserGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionGroup" ADD CONSTRAINT "PermissionGroup_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionGroup" ADD CONSTRAINT "PermissionGroup_updateBy_fkey" FOREIGN KEY ("updateBy") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGroup" ADD CONSTRAINT "UserGroup_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionGroupOnUserGroups" ADD CONSTRAINT "PermissionGroupOnUserGroups_userGroupId_fkey" FOREIGN KEY ("userGroupId") REFERENCES "UserGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionGroupOnUserGroups" ADD CONSTRAINT "PermissionGroupOnUserGroups_permissionGroupId_fkey" FOREIGN KEY ("permissionGroupId") REFERENCES "PermissionGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
