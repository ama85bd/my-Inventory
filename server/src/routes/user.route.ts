import { Express } from 'express';
import validate from '../middleware/validateResource';
import { createCompanySchema, getCompanyIdSchema } from '../schema/user.schema';
import {
  createCompanyHandler,
  createTempCompanyHandler,
  deleteCompanyHandler,
} from '../controller/user.controller';

function userRoutes(app: Express) {
  app.post(
    '/api/company/registration',
    validate(createCompanySchema),
    createTempCompanyHandler
  );
  app.post(
    '/api/company/',
    validate(createCompanySchema),
    createCompanyHandler
  );

  app.delete(
    '/api/company/hard-delete/:companyId',
    validate(getCompanyIdSchema),
    deleteCompanyHandler
  );
}

export default userRoutes;
