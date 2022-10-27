import { Component, OnInit } from '@angular/core';
import { NotFoundError } from 'rxjs';
import { Employee } from 'src/app/entities/Employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-all-employee-table',
  templateUrl: './all-employee-table.component.html',
  styleUrls: ['./all-employee-table.component.css'],
})
export class AllEmployeeTableComponent implements OnInit {
  employees: any[];
  warningModal: boolean;
  idForDelete: number;

  nrOfEmployee: number;
  nrOfPages: number;
  selectedPage: number;
  pagesArray: number[];
  nrOfRecords: number = 10;
  constructor(private service: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(s: number = 0): void {
    this.selectedPage = s;
    if (s > 0) {
      s *= this.nrOfRecords;
    }
    this.service.getEmployees().subscribe((data: Employee[]) => {
      this.employees = data;
      this.nrOfEmployee = this.employees.length;
      this.nrOfPages =
        (this.nrOfEmployee - (this.nrOfEmployee % this.nrOfRecords)) /
        this.nrOfRecords;
      if (this.nrOfEmployee % this.nrOfRecords != 0) {
        this.nrOfPages += 1;
      }
      this.pagesArray = Array(this.nrOfPages).fill(1);
      this.employees = this.employees.slice(s, s + +this.nrOfRecords);
    });
  }

  confirmDelete(): void {
    this.service.deleteEmployees(this.idForDelete).subscribe((data) => {
      this.loadEmployees();
    });
    this.warningModal = false;
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
  // confirmDelete(): void {
  //   this.employeeService.deleteEmployees(this.idForDelete).subscribe((data) => {
  //     this.loadEmployees();
  //   });
  //   this.warningModal = false;
  // }

  closeWarningModal(): void {
    this.warningModal = false;
  }

  closeDeleteModal(): void {
    this.warningModal = false;
  }

  // generatePaginationButtons(): void {
  //   if (this.nrOfEmployee < 10) {
  //     this.paginationButtondsList = [[0, 10]];
  //   } else {
  //     var i: number = 0;

  //     while (i < this.nrOfEmployee) {
  //       this.paginationButtondsList.push([i, i + 10]);
  //       i + 10;
  //     }
  //   }
  // }
}
