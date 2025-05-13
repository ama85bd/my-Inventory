import { db } from '../../prisma/client';

export async function GetAllActiveOrInactiveCompanies(isActive: boolean) {
  try {
    const companies = await db.companies.findMany({
      where: { isActive: isActive },
    });
    return companies;
  } catch (error) {
    console.log(error);
  }
}
