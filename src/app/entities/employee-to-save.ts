import { EmployeePersInfToSave } from './employee0pers-inf-to-save';

export interface EmployeeToSave {
  name: string;
  email: string;
  jobTitle: string;
  phone: string;
  imageURL: string;
  personalInformation: EmployeePersInfToSave;
}
