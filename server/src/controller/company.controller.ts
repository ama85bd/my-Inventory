import { Response, Request } from 'express';
import { GetCompanies } from '../schema/company.schema';
import { GetAllActiveOrInactiveCompanies } from '../service/company.service';

export async function GetAllActiveOrInactiveCompaniesHandler(
  req: Request<GetCompanies['params']>,
  res: Response
): Promise<void> {
  try {
    const { isActive } = req.params;
    console.log('isActive', isActive);
    const companies = await GetAllActiveOrInactiveCompanies(
      isActive === 'yes' ? true : false
    );

    // Send the products as a JSON response
    res.status(200).json(companies);
  } catch (error) {
    console.error('Error during get companies:', error);
    res.status(404).json({ message: 'Server error' });
  }
}
