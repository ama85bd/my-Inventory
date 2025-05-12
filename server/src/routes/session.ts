import { Express } from 'express';
import validate from '../middleware/validateResource';
import { createSessionSchema } from '../schema/session.schema';
import { createUserSessionHandler } from '../controller/session.controller';

function sessionRoutes(app: Express) {
  app.post(
    '/api/login',
    validate(createSessionSchema),
    createUserSessionHandler
  );

  // app.get('/api/sessions', requireUser, getUserSessionHandler);
  // app.delete('/api/sessions', requireUser, deleteSessionHandler);
}

export default sessionRoutes;
