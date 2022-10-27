import { Options } from '@angular-slider/ngx-slider';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeePersInf } from 'src/app/entities/Employee-Pers-Inf';
import { EmployeePersonalInformationService } from 'src/app/services/employee-pers-inf.service';

@Component({
  selector: 'app-save-edit-employee-prs-inf',
  templateUrl: './save-edit-employee-prs-inf.component.html',
  styleUrls: ['./save-edit-employee-prs-inf.component.css'],
})
export class SaveEditEmployeePrsInfComponent implements OnInit {
  employeePersInfForm: FormGroup;
  id: number;
  minSalaryValue: number;
  maxSalaryValue: number;
  options: Options = {
    floor: 0,
    ceil: 10000,
  };
  private updateEmployeePersInf: EmployeePersInf;
  succesfulModal: boolean;
  addressModal: boolean;
  englishLevels: String[] = ['A1', 'A2', 'B1', 'B2', 'C'];
  addressArray: String[] = [];
  address: String;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: EmployeePersonalInformationService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.employeePersInfForm = new FormGroup({
      id: new FormControl({ value: '', disabled: true }),
      birthDate: new FormControl(null, Validators.required),
      sex: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      familyStatus: new FormControl(null, Validators.required),
      englishLevel: new FormControl(null),
      salaryRange: new FormControl(null),
      language_1: new FormControl(null),
      language_2: new FormControl(null),
      language_3: new FormControl(null),
    });

    this.route.params.subscribe((params) => {
      this.id = +params['id'];
    });

    this.service.getEmployeePersInf(this.id).subscribe(
      (response) => {
        console.log(response);
        this.employeePersInfForm.patchValue({
          id: this.id,
          birthDate: response.birthDate,
          sex: response.sex,
          country: response.country,
          address: response.address,
          familyStatus: response.familyStatus,
          englishLevel: response.englishLevel,
        });

        this.minSalaryValue = response.salaryRange[0];
        this.maxSalaryValue = response.salaryRange[1];

        console.log('Min salary' + response.salaryRange[0]);
        console.log('Max salary' + response.salaryRange[1]);

        this.addressArray = response.address.split(',');

        console.log(response.salaryRange[0], response.salaryRange[1]);

        if (response.languages[0] == 'true') {
          this.employeePersInfForm.patchValue({
            language_1: response.languages[0],
          });
        }
        if (response.languages[1] == 'true') {
          this.employeePersInfForm.patchValue({
            language_1: response.languages[1],
          });
        }
        if (response.languages[2] == 'true') {
          this.employeePersInfForm.patchValue({
            language_1: response.languages[2],
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  update() {
    this.saveAddress();
    console.log('Adres: +++++ ' + this.address);

    this.updateEmployeePersInf = {
      id: this.id,
      birthDate: this.employeePersInfForm.get('birthDate').value,
      sex: this.employeePersInfForm.get('sex').value,
      country: this.employeePersInfForm.get('country').value,
      // address: this.employeePersInfForm.get('address').value,

      address: <string>this.address,
      familyStatus: this.employeePersInfForm.get('familyStatus').value,
      englishLevel: this.employeePersInfForm.get('englishLevel').value,
      salaryRange: [this.minSalaryValue, this.maxSalaryValue],
      languages: [],
      employee: null,
    };
    if (this.employeePersInfForm.get('language_1').value) {
      this.updateEmployeePersInf.languages[0] = 'true';
    } else {
      this.updateEmployeePersInf.languages[0] = 'false';
    }
    if (this.employeePersInfForm.get('language_2').value) {
      this.updateEmployeePersInf.languages[1] = 'true';
    } else {
      this.updateEmployeePersInf.languages[1] = 'false';
    }
    if (this.employeePersInfForm.get('language_3').value) {
      this.updateEmployeePersInf.languages[2] = 'true';
    } else {
      this.updateEmployeePersInf.languages[2] = 'false';
    }

    this.service.updateEmployeePersInf(this.updateEmployeePersInf);
    this.succesfulModal = true;

    console.log(this.updateEmployeePersInf);
  }

  backToEmployee() {
    this.location.back();
  }

  goToHomePage() {
    this.router.navigate(['/']);
  }
  closeSuccesfullyModal(): void {
    this.succesfulModal = false;
  }

  saveAddress(): void {
    this.addressModal = false;
    this.address = this.addressArray.toString();
  }
  openAddressModal(): void {
    this.addressModal = true;
  }
}
