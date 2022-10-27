import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Employee } from '../entities/Employee';
import { EmployeeToSave } from '../entities/employee-to-save';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  url: string = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  public getEmployees(): Observable<Employee[]> {
    return this.http
      .get<Employee[]>(this.url + '/employee/all')
      .pipe(retry(1), catchError(this.handleError));
  }

  public getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(this.url + '/employee/find/' + id);
  }

  public addEmployees(employee: EmployeeToSave) {
    return this.http.post(
      this.url + '/employee/add',
      JSON.stringify(employee),
      this.httpOptions
    );
  }

  public updateEmployees(employee: Employee) {
    this.http
      .put(this.url + '/employee/update', employee)
      .subscribe((response) => console.log(response));
  }

  public deleteEmployees(employeeId: number) {
    return this.http
      .delete<Employee>(
        this.url + '/employee/delete/' + employeeId,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
