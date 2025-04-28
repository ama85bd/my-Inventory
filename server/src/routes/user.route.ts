import { Express } from 'express';
import validate from '../middleware/validateResource';
import { createCompanySchema } from '../schema/user.schema';
import { createCompanyHandler } from '../controller/user.controller';

function userRoutes(app: Express) {
  app.post(
    '/api/user/company',
    validate(createCompanySchema),
    createCompanyHandler
  );
}

export default userRoutes;
