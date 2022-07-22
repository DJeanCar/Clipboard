export type Employee = {
  name: string;
  salary: string;
  currency: string;
  department: string;
  sub_department: string;
  on_contract?: string;
};

export type Statistic = {
  min: number;
  max: number;
  mean: number;
};
