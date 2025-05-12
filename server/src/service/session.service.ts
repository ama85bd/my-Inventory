import { db } from '../../prisma/client';
import { sighJwt, verifyJwt } from '../utils/jwt.utils';
import { get } from 'lodash';

export async function createSession(userId: any, userAgent: string) {
  const session = await db.userSession.create({
    data: {
      userId: userId,
      userAgent: userAgent,
      isValid: true,
    },
  });

  return session;
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const { decoded }: any = verifyJwt(refreshToken, 'REFRESH_TOKEN_PUBLIC_KEY');
  console.log('decoded', decoded);

  if (!decoded || !get(decoded, 'session')) return false;

  const session = await db.userSession.findUnique({
    where: { id: decoded.id },
  });

  if (!session || !session.isValid) return false;

  const user = await db.users.findUnique({ where: { id: session.userId } });

  if (!user) return false;

  // create an access token
  const accessToken = sighJwt(
    {
      id: user.id,
      session: session.id,
    },
    'ACCESS_TOKEN_PRIVATE_KEY',
    { expiresIn: '15m' } // 15 minutes
  );

  return accessToken;
}
