import { get } from 'lodash';
import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt.utils';
import { reIssueAccessToken } from '../service/session.service';

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, 'headers.authorization', '').replace(
    /^Bearer\s/,
    ''
  );
  const refreshToken: any = get(req, 'headers.x-refresh');
  console.log('accessToken', accessToken);
  console.log('refreshToken', refreshToken);
  console.log('1');

  if (!accessToken) {
    return next();
  }

  const { decoded, expired } = verifyJwt(
    accessToken,
    'ACCESS_TOKEN_PUBLIC_KEY'
  );

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }
  console.log('2');
  if (expired && refreshToken) {
    const newAccessToken: any = await reIssueAccessToken({ refreshToken });

    if (newAccessToken) {
      res.setHeader('x-access-token', newAccessToken);
    }
    console.log('3');
    const result = verifyJwt(
      newAccessToken as string,
      'ACCESS_TOKEN_PUBLIC_KEY'
    );

    res.locals.user = result.decoded;
    return next();
  }

  return next();
};
