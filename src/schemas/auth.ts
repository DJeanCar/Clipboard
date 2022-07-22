import { body } from 'express-validator';

const schema = [
  body('username').isString(),
  body('password').isString(),
];

export { schema as authSchema };
