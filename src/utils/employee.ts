import { client as redis } from '../config/redis';
import { Employee, Statistic } from '../types/employee';
import { EMPLOYEES_KEY } from '../constants/redisKeys';

export const getEmployeeByName = async (name: string): Promise<Employee> => {
  const employees = JSON.parse(await redis.get(EMPLOYEES_KEY) || '');

  return employees?.find((employee: Employee) => employee.name === name);
};

export const getSummaryStatistics = (salaries: number[]): Statistic => {
  const total = salaries.reduce((sum: number, salary: number) => sum + salary, 0);

  return {
    min: Math.min(...salaries),
    max: Math.max(...salaries),
    mean: Math.round((total / salaries.length) * 100) / 100, 
  };
};
