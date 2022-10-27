import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeePersInf } from '../entities/Employee-Pers-Inf';

@Injectable({ providedIn: 'root' })
export class EmployeePersonalInformationService {
  constructor(private http: HttpClient) {}

  url: string = 'http://localhost:8080/employee-personal-information';
  employeePI: EmployeePersInf;

  getEmployeePersInf(id: number): Observable<EmployeePersInf> {
    return this.http.get<EmployeePersInf>(this.url + '/find/' + id);
  }

  addEmployeePersInf(information: EmployeePersInf) {
    console.log(information);

    this.http
      .post(this.url + '/add', information)
      .subscribe((responseData) => console.log(responseData));
  }

  updateEmployeePersInf(information: EmployeePersInf) {
    this.http
      .put(this.url + '/update', information)
      .subscribe((responseData) => console.log('Update inf' + responseData));
  }

  deleteEmployeePersInf(id: number) {
    this.http
      .delete(this.url + '/delete/' + id)
      .subscribe((responseData) => console.log('Update inf' + responseData));
  }
}
