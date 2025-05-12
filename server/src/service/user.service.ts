import { Prisma } from '@prisma/client';
import { db } from '../../prisma/client';
import { hashPassword } from '../utils/hash';
import { PermissionNames } from '../constant/PermissionNames';
import { compare } from 'bcryptjs';
import { omit } from 'lodash';

export const createTempCompanyService = async (
  data: Prisma.CompaniesCreateInput
) => {
  try {
    if (!data.email || !data.password)
      throw new Error('Email and password required');

    const existing = await db.companies.findUnique({
      where: { email: data.email },
    });
    if (existing) throw new Error('Email already in use');

    const existingUsername = await db.users.findUnique({
      where: { username: data.username },
    });
    if (existingUsername) throw new Error('Username already in use');

    const hashed = await hashPassword(data.password);
    const company = await db.companies.create({
      data: { ...data, password: hashed },
    });

    console.log(company);
    return true;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const createCompanyService = async (
  data: Prisma.CompaniesCreateInput,
  username: string,
  password: string
) => {
  try {
    if (!data.email) throw new Error('Email required');

    const existing = await db.companies.findUnique({
      where: { email: data.email },
    });
    if (existing) throw new Error('Email already in use');

    const existingUsername = await db.users.findUnique({
      where: { username: username },
    });
    if (existingUsername) throw new Error('Username already in use');

    const hashed = await hashPassword(password);

    const result = await db.$transaction(async (tx) => {
      const company = await tx.companies.create({
        data: { ...data },
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
          username: username,
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

export const deleteCompanyService = async (companyId: string) => {
  try {
    return await db.$transaction(async (tx) => {
      const company = await db.companies.findUnique({
        where: {
          id: companyId as string,
        },
      });

      if (!company) {
        return { success: false, error: 'Company not exists' };
      }

      // Step 1: Delete PermissionGroupOnUserGroups records
      await tx.permissionGroupOnUserGroups.deleteMany({
        where: {
          userGroup: {
            companyId: companyId,
          },
        },
      });

      // Step 2: Delete PermissionGroups
      await tx.permissionGroup.deleteMany({
        where: {
          companyId: companyId,
        },
      });

      // Step 3: Delete Users
      await tx.users.deleteMany({
        where: {
          companyId: companyId,
        },
      });

      // Step 4: Delete UserGroups
      await tx.userGroup.deleteMany({
        where: {
          companyId: companyId,
        },
      });

      // Step 5: Finally delete the Company
      await tx.companies.delete({
        where: {
          id: companyId,
        },
      });

      return { message: 'Company and related data deleted successfully' };
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await db.users.findUnique({
    where: { email: email },
  });
  if (!user) {
    return false;
  }

  const isPasswordValid = await compare(password.toString(), user.password);

  if (!isPasswordValid) {
    return false;
  }
  return omit(user, 'password');
}
