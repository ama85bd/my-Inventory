import { Request, Response, NextFunction } from 'express';

export const requireUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;
  if (!user) {
    res.sendStatus(403);
  }

  return next();
};
