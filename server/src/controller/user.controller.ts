import { Request, Response } from 'express';
import {
  createCompanyService,
  createTempCompanyService,
  deleteCompanyService,
} from '../service/user.service';
import { GetCompanyId } from '../schema/user.schema';

export const createTempCompanyHandler = async (req: Request, res: Response) => {
  try {
    const company = await createTempCompanyService(req.body);

    res.status(201).json(company);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const createCompanyHandler = async (req: Request, res: Response) => {
  try {
    const { username, password, ...restData } = req.body;

    const company = await createCompanyService(restData, username, password);

    res.status(201).json(company);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export async function deleteCompanyHandler(
  req: Request<GetCompanyId['params']>,
  res: Response
) {
  const companyId = req.params.companyId;
  const company = await deleteCompanyService(companyId);

  res.status(200).json(company);
}
