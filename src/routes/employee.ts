import { Router } from 'express';
import {
  addEmployee,
  deleteEmployee,
  getSalaryStatistics,
  getContractedSalaryStatistics,
  getSalaryStatisticsByDepartment,
  getSalaryStatisticsBySubDepartment,
} from '../controllers';
import { createEmployeeSchema, deleteEmployeeSchema } from '../schemas/employee';
import { validateRequestSchema } from '../middlewares/validateRequestSchema';
import { authMiddleware } from '../middlewares/authorization';

const router = Router();

router.post('/salary', authMiddleware, createEmployeeSchema, validateRequestSchema, addEmployee);
router.delete('/salary', authMiddleware, deleteEmployeeSchema, validateRequestSchema, deleteEmployee);

router.get('/statistics', authMiddleware, getSalaryStatistics);
router.get('/statistics/contracted', authMiddleware, getContractedSalaryStatistics);
router.get('/statistics/department', authMiddleware, getSalaryStatisticsByDepartment);
router.get('/statistics/subdepartment', authMiddleware, getSalaryStatisticsBySubDepartment);

export default router;
