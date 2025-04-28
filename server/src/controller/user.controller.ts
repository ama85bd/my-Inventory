import { Request, Response } from 'express';
import { createCompanyService } from '../service/user.service';

export const createCompanyHandler = async (req: Request, res: Response) => {
  try {
    console.log('req.body', req.body);

    const company = await createCompanyService(req.body);

    res.status(201).json(company);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
