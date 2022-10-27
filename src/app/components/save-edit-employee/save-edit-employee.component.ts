import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/entities/Employee';
import { EmployeePersInf } from 'src/app/entities/Employee-Pers-Inf';
import { EmployeeToSave } from 'src/app/entities/employee-to-save';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-save-edit-employee',
  templateUrl: './save-edit-employee.component.html',
  styleUrls: ['./save-edit-employee.component.css'],
})
export class SaveEditEmployeeComponent implements OnInit {
  employeeForm: FormGroup;

  employees: Employee[];
  public editEmployee: Employee;
  public saveEmployee: EmployeeToSave;
  personalInformation: EmployeePersInf;
  public deletedEmployee: Employee;

  succesfulModal: boolean;
  errorModal: boolean;
  errorMessage: String;

  id: number;
  personalInformationId: number;
  updateMode: boolean;
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      id: new FormControl({ value: '', disabled: true }),
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      jobTitle: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      imageURL: new FormControl(null, Validators.required),
    });

    this.route.params.subscribe((params) => {
      this.id = +params['id'];
    });

    console.log(this.id > 0);

    if (this.id > 0) {
      this.updateMode = true;
      this.employeeService.getEmployeeById(this.id).subscribe(
        (responseData) => {
          this.employeeForm.patchValue({
            id: responseData.id,
            name: responseData.name,
            email: responseData.email,
            jobTitle: responseData.jobTitle,
            phone: responseData.phone,
            imageURL: responseData.imageURL,
          });

          this.personalInformation = responseData.personalInformation;
          this.personalInformationId = responseData.personalInformation.id;
        },
        (error) => {
          window.alert(error.message);
          this.router.navigate(['/']);
        }
      );
    }
  }

  save() {
    this.saveEmployee = {
      name: this.employeeForm.get('name').value,
      email: this.employeeForm.get('email').value,
      jobTitle: this.employeeForm.get('jobTitle').value,
      phone: this.employeeForm.get('phone').value,
      imageURL: this.employeeForm.get('imageURL').value,
      personalInformation: {
        sex: 'm',
        birthDate: '2020-10-10',
        country: 'none',
        address: 'none',
        familyStatus: 'single',
        englishLevel: 1,
        languages: [],
        salaryRange: [],
      },
    };

    this.employeeService.addEmployees(this.saveEmployee).subscribe(
      (responseData) => {
        // window.alert('Employee added successfully.');
        this.succesfulModal = true;
        this.employeeForm.reset();
      },
      (error) => {
        // window.alert(error.message);
        this.errorModal = true;
        this.errorMessage = error.message;
      }
    );
    console.log(this.saveEmployee);
    //this.employeeForm.reset();
  }

  update() {
    this.editEmployee = {
      id: this.id,
      name: this.employeeForm.get('name').value,
      email: this.employeeForm.get('email').value,
      jobTitle: this.employeeForm.get('jobTitle').value,
      phone: this.employeeForm.get('phone').value,
      imageURL: this.employeeForm.get('imageURL').value,
      personalInformation: this.personalInformation,
    };
    this.succesfulModal = true;
    console.log('update employee' + this.editEmployee);
    this.employeeService.updateEmployees(this.editEmployee);
    this.employeeForm.reset();
  }

  backToEmployeeList() {
    this.router.navigate(['/']);
  }

  goToEmployeePersInf() {
    this.router.navigate(['employee-pers-inf', this.personalInformationId]);
  }

  closeSuccesfullyModal(): void {
    this.succesfulModal = false;
  }

  closeErrorModal(): void {
    this.errorModal = false;
  }
}
