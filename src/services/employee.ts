import { client as redis } from '../config/redis';
import { Employee, Statistic } from '../types/employee';
import { getEmployeeByName, getSummaryStatistics } from '../utils/employee';
import { EMPLOYEES_KEY } from '../constants/redisKeys';

export const addEmployee = async (data: Employee): Promise<Employee> => {
  const employee = await getEmployeeByName(data.name);
  if (employee) {
    throw new Error('Employee already exist');
  }

  const employees = JSON.parse(await redis.get(EMPLOYEES_KEY) || '');
  redis.set(EMPLOYEES_KEY, JSON.stringify([ ...employees, data ]));
  return data;
};

export const deleteEmployee = async ({ name }: { name: string }): Promise<Employee> => {
  const employee = await getEmployeeByName(name);
  if (!employee) {
    throw new Error('Employee not found');
  }

  const employees = JSON.parse(await redis.get(EMPLOYEES_KEY) || '');

  const newEmployees = employees.filter((employee: Employee) => employee.name !== name);
  redis.set(EMPLOYEES_KEY, JSON.stringify(newEmployees));
  return employee;
};

export const getSalaryStatistics = async (): Promise<Statistic> => {
  const employees = JSON.parse(await redis.get(EMPLOYEES_KEY) || '');
  const salaries = employees.map((employee: Employee) => employee.salary);

  return getSummaryStatistics(salaries);
};

export const getContractedSalaryStatistics = async (): Promise<Statistic> => {
  const employees = JSON.parse(await redis.get(EMPLOYEES_KEY) || '');
  const salaries = employees.filter((employee: Employee) => employee.on_contract).map((employee: Employee) => employee.salary);

  return getSummaryStatistics(salaries);
};

export const getSalaryStatisticsByDepartments = async () => {
  const employees = JSON.parse(await redis.get(EMPLOYEES_KEY) || '');

  const salariesByDepartment = employees.reduce((acc, employee: Employee) => {
    const { department, ...rest } = employee;
    if (!acc[department]) {
      acc[department] = [rest.salary];
      return acc;
    }

    acc[department].push(rest.salary);
    return acc;
  }, {});

  Object.keys(salariesByDepartment).forEach(department => {
    salariesByDepartment[department] = getSummaryStatistics(salariesByDepartment[department]);
  });

  return salariesByDepartment;
};

export const getSalaryStatisticsBySubDepartments = async () => {
  const employees = JSON.parse(await redis.get(EMPLOYEES_KEY) || '');

  const salariesBySubDepartment = employees.reduce((acc, employee: Employee) => {
    const { department, sub_department, ...rest } = employee;

    if (!acc[department]) {
      acc[department] = {
        [sub_department]: [rest.salary]
      };
      return acc;
    }

    if (!acc[department][sub_department]) {
      acc[department][sub_department] = [rest.salary];
      return acc;
    }

    acc[department][sub_department].push(rest.salary);
    return acc;
  }, {});

  Object.keys(salariesBySubDepartment).forEach(department => {
    Object.keys(salariesBySubDepartment[department]).forEach(subDepartment => {
      salariesBySubDepartment[department][subDepartment] = getSummaryStatistics(salariesBySubDepartment[department][subDepartment]);
    });
  });

  return salariesBySubDepartment;
};
