import jwt from 'jsonwebtoken';

export function sighJwt(
  object: Object,
  keyName: 'ACCESS_TOKEN_PRIVATE_KEY' | 'REFRESH_TOKEN_PRIVATE_KEY',
  options?: jwt.SignOptions | undefined
) {
  const privateKey = Buffer.from(
    process.env[keyName] as string,
    'base64'
  ).toString('ascii');
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
}

export function verifyJwt(
  token: string,
  keyName: 'ACCESS_TOKEN_PUBLIC_KEY' | 'REFRESH_TOKEN_PUBLIC_KEY'
) {
  const publicKey = Buffer.from(
    process.env[keyName] as string,
    'base64'
  ).toString('ascii');
  try {
    console.log('token', token);
    const decoded = jwt.verify(token, publicKey);

    console.log('decoded jwt', decoded);

    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    console.error('verifyJwt err', error);
    return {
      valid: false,
      expired: error.message === 'jwt expired',
      decoded: null,
    };
  }
}
