import { client as redis } from './redis';
import users from './users.json';
import employees from './employees.json';
import { EMPLOYEES_KEY, USERS_KEY } from '../constants/redisKeys';

const setupInitialData = () => {
  redis.set(USERS_KEY, JSON.stringify(users.items));
  redis.set(EMPLOYEES_KEY, JSON.stringify(employees.items));
};

export default setupInitialData;
