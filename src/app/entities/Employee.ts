import { EmployeePersInf } from "./Employee-Pers-Inf";

export interface Employee {
	id: number;
	name: string;
	email: string;
	jobTitle: string;
	phone: string;
	imageURL: string;
	personalInformation:EmployeePersInf;
}