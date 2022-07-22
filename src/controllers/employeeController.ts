import { Request, Response } from "express";
import * as employeeService from '../services/employee';

export const addEmployee = async (req: Request, res: Response) => {
  try {
    const employee = await employeeService.addEmployee(req.body);
    return res.json(employee);
  } catch (err) {
    return res.status(500).json({ error: 'Fail to create salary', reason: (err as Error).message });
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const employee = await employeeService.deleteEmployee(req.body);
    return res.json(employee);
  } catch (err) {
    return res.status(500).json({ error: 'Fail to delete salary', reason: (err as Error).message });
  }
};

export const getSalaryStatistics = async (_: Request, res: Response) => {
  const statistics = await employeeService.getSalaryStatistics();
  return res.json(statistics);
};

export const getContractedSalaryStatistics = async (_: Request, res: Response) => {
  const statistics = await employeeService.getContractedSalaryStatistics();
  return res.json(statistics);
};

export const getSalaryStatisticsByDepartment = async (_: Request, res: Response) => {
  const statistics = await employeeService.getSalaryStatisticsByDepartments();
  return res.json(statistics);
};

export const getSalaryStatisticsBySubDepartment = async (_: Request, res: Response) => {
  const statistics = await employeeService.getSalaryStatisticsBySubDepartments();
  return res.json(statistics);
};
