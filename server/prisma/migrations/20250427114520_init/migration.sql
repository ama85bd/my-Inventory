-- CreateTable
CREATE TABLE "Users" (
    "id" UUID NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "password" TEXT NOT NULL,
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
    "chargeAmount" DOUBLE PRECISION NOT NULL,
    "vatAmount" DOUBLE PRECISION NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "password" TEXT NOT NULL,
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

-- AddForeignKey
ALTER TABLE "PermissionGroup" ADD CONSTRAINT "PermissionGroup_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionGroup" ADD CONSTRAINT "PermissionGroup_updateBy_fkey" FOREIGN KEY ("updateBy") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
