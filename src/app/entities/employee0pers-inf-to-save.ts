import { EmployeeToSave } from './employee-to-save';

export interface EmployeePersInfToSave {
  birthDate: string;
  sex: string;
  country: string;
  address: string;
  familyStatus: string;
  englishLevel: number;
  salaryRange: number[];
  languages: String[];
}
