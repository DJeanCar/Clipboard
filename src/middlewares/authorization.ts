import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../types/user';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['authorization']?.split(' ')?.[1];

  if (!token) {
    return res.status(403).send('Authorization denied');
  }

  try {
    const { username } = jwt.verify(
      token as string,
      'mysecret' as string
    ) as User;
    req.user = { username };
  } catch (err) {
    return res.status(403).send('Authorization denied');
  }

  next();
};
