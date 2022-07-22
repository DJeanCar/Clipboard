import { client as redis } from '../config/redis';
import { User } from '../types/user';
import { USERS_KEY } from '../constants/redisKeys';

export const getUserByUsername = async (username: string) => {
  const users = JSON.parse(await redis.get(USERS_KEY) || '');
  return users.find((user: User) => user.username === username);
}
