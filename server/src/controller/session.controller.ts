import { Request, Response } from 'express';
import { validatePassword } from '../service/user.service';
import { db } from '../../prisma/client';
import { createSession } from '../service/session.service';
import { sighJwt } from '../utils/jwt.utils';

export async function createUserSessionHandler(
  req: Request,
  res: Response
): Promise<void> {
  // Validate the user's password
  const user: any = await validatePassword(req.body);

  if (!user) {
    res.status(401).json({ message: 'Invalid email or password' });
  }

  const isCompanyActive = await db.companies.findUnique({
    where: { id: user.companyId },
  });

  if (!isCompanyActive?.isActive) {
    res.status(400).json({ message: 'You are not allowed to login.' });
  }

  // create a session
  const session = await createSession(user.id, req.get('user-agent') || '');

  // create an access token
  const accessToken = sighJwt(
    {
      id: user._id,
      session: session.id,
    },
    'ACCESS_TOKEN_PRIVATE_KEY',
    { expiresIn: '15m' } // 15 minutes
  );
  // create a refresh token
  const refreshToken = sighJwt(
    {
      id: user._id,
      session: session.id,
    },
    'REFRESH_TOKEN_PRIVATE_KEY',
    { expiresIn: '1y' } // one year
  );
  // return access and refresh tokens
  res.status(201).json({
    accessToken,
    refreshToken,
    name: user.name,
    userId: user._id,
    email: user.email,
    userType: [
      { active: user.isActive },
      { admin: user.isAdmin },
      { member: user.isMember },
      { lifeMember: user.isLifeMember },
    ],
  });
}
