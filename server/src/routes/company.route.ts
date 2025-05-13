import { Express, Response, Request } from 'express';
import { getCompaniesSchema } from '../schema/company.schema';
import validate from '../middleware/validateResource';
import { requireUser } from '../middleware/requireUser';
import { GetAllActiveOrInactiveCompaniesHandler } from '../controller/company.controller';

function companyRoutes(app: Express) {
  app.get(
    '/api/company/:isActive',
    // validate(getCompaniesSchema),
    [requireUser, validate(getCompaniesSchema)],
    GetAllActiveOrInactiveCompaniesHandler
  );
}

export default companyRoutes;
