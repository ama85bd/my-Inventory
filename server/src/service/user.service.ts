import { Prisma } from '@prisma/client';
import { db } from '../../prisma/client';
import { hashPassword } from '../utils/hash';
import { PermissionNames } from '../constant/PermissionNames';

export const createCompanyService = async (
  data: Prisma.CompaniesCreateInput
) => {
  try {
    if (!data.email || !data.password)
      throw new Error('Email and password required');

    const existing = await db.companies.findUnique({
      where: { email: data.email },
    });
    if (existing) throw new Error('Email already in use');

    const hashed = await hashPassword(data.password);

    const result = await db.$transaction(async (tx) => {
      const company = await tx.companies.create({
        data: { ...data, password: hashed },
      });

      const permissionGroups = await Promise.all(
        PermissionNames.map((permissionName) =>
          tx.permissionGroup.create({
            data: {
              name: permissionName,
              isView: true,
              isCreate: true,
              isUpdate: true,
              isDelete: true,
              companyId: company.id,
            },
          })
        )
      );

      // Create UserGroup ("Admin Group")
      const userGroup = await tx.userGroup.create({
        data: {
          name: 'Admin Group',
          companyId: company.id,
        },
      });

      // Link all PermissionGroups to UserGroup
      await Promise.all(
        permissionGroups.map((pg) =>
          tx.permissionGroupOnUserGroups.create({
            data: {
              userGroupId: userGroup.id,
              permissionGroupId: pg.id,
            },
          })
        )
      );

      // Create Admin User
      const user = await tx.users.create({
        data: {
          firstname: data.name,
          phone: data.phone,
          email: data.email,
          username: data.username,
          password: hashed,
          companyId: company.id,
          userGroupId: userGroup.id,
        },
      });

      // Update updateBy in PermissionGroups
      await Promise.all(
        permissionGroups.map((pg) =>
          tx.permissionGroup.update({
            where: { id: pg.id },
            data: { updateBy: user.id },
          })
        )
      );

      return { company, user, userGroup, permissionGroups };
    });

    console.log(result);
    return true;
  } catch (error: any) {
    throw new Error(error);
  }
};
