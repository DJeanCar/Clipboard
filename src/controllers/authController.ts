import { Request, Response } from 'express';
import { authenticate } from '../services/user';
import { getUserByUsername } from '../utils/user';


export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await getUserByUsername(username);

  if (!user) {
    console.error(`User not found`);
    return res.status(500).json({ error: 'User not found' });
  }

  if (user.password !== password) {
    console.error('Incorrect password');
    return res.status(500).json({ error: 'Incorrect password' });
  }

  const userAuthenticated = authenticate({ username, password });
  return res.json({ token: userAuthenticated, tokenType: 'Bearer' });
};
