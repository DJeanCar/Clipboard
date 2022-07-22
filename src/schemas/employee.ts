import { body } from 'express-validator';

const createEmployeeSchema = [
  body('name').isString(),
  body('salary').isNumeric(),
  body('currency').isString(),
  body('department').isString(),
  body('sub_department').isString(),
  body('on_contract').optional().isBoolean(),
];

const deleteEmployeeSchema = [
  body('name').isString()
];

export { createEmployeeSchema, deleteEmployeeSchema };
