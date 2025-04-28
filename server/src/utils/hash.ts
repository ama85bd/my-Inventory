import { compare } from 'bcryptjs';
import { hash } from 'bcryptjs';

export const hashPassword = (password: string) => hash(password, 10);
export const comparePasswords = (plain: string, hashed: string) =>
  compare(plain, hashed);
