import { Employee } from './Employee';

export interface EmployeePersInf {
  id: number;
  birthDate: Date;
  sex: string;
  country: string;
  address: string;
  familyStatus: string;
  englishLevel: number;
  salaryRange: number[];
  languages: String[];
  employee: Employee;
}
