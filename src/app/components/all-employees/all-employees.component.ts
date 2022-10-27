import { Component, OnInit } from '@angular/core';
import { ConnectableObservable, count } from 'rxjs';
import { Employee } from 'src/app/entities/Employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-all-employees',
  templateUrl: './all-employees.component.html',
  styleUrls: ['./all-employees.component.css'],
})
export class AllEmployeesComponent implements OnInit {
  employees: Employee[] = [];
  employeeListStart: number;
  employeeListEnd: number;
  pageCounter: number = 0;
  maxPageIndex: number = 0;
  warningModal: boolean;
  idForDelete: number;
  nrOfEmployee: number;
  spinner: boolean = true;
  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeListStart = 0;
    this.employeeListEnd = 4;
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe((data: Employee[]) => {
      this.employees = data;
      this.nrOfEmployee = this.employees.length;
      this.maxPageIndex =
        (this.employees.length - (this.employees.length % 4)) / 4;
      console.log('max page index' + this.maxPageIndex);
      this.employees = this.employees.slice(
        this.employeeListStart,
        this.employeeListEnd
      );
    });
    this.disableSpinner();
  }

  deleteEmployee(id: any) {
    // if (window.confirm('Are you sure, you want to delete?')) {
    //   this.employeeService.deleteEmployees(id).subscribe((data) => {
    //     this.loadEmployees();
    //   });
    // }
    this.idForDelete = id;
    this.warningModal = true;
  }
  confirmDelete(): void {
    this.employeeService.deleteEmployees(this.idForDelete).subscribe((data) => {
      this.loadEmployees();
    });
    this.warningModal = false;
  }

  closeDeleteModal(): void {
    this.warningModal = false;
  }

  goToNextPage(): void {
    if (this.pageCounter + 1 <= this.maxPageIndex) {
      this.employeeListStart += 4;
      this.employeeListEnd += 4;
      this.pageCounter++;
      console.log(this.pageCounter);
      this.loadEmployees();
    }
  }

  goToPreviousPage(): void {
    if (this.pageCounter - 1 >= 0) {
      this.employeeListStart -= 4;
      this.employeeListEnd -= 4;
      this.pageCounter--;
      console.log(this.pageCounter);
      this.loadEmployees();
    }
  }

  closeWarningModal(): void {
    this.warningModal = false;
  }

  disableSpinner(): void {
    console.log(this.spinner);
    setTimeout(() => {
      this.spinner = false;
    }, 3000);
  }
}
