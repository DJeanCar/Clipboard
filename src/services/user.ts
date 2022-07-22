import { User } from '../types/user';
import jwt from 'jsonwebtoken';

export const authenticate = ({ username, password }: User) => {
  return jwt.sign({
    username,
    password,
  }, 'mysecret' as string);
};
