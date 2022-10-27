import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllEmployeesComponent } from './components/all-employees/all-employees.component';
import { SaveEditEmployeeComponent } from './components/save-edit-employee/save-edit-employee.component';
import { SaveEditEmployeePrsInfComponent } from './components/save-edit-employee-prs-inf/save-edit-employee-prs-inf.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from './services/employee.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { SuccessComponent } from './components/modals/success/success.component';
import { ErrorComponent } from './components/modals/error/error.component';
import { AllEmployeeTableComponent } from './components/all-employee-table/all-employee-table.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const appRoutes: Routes = [
  { path: '', component: AllEmployeesComponent },
  { path: 'employees-table', component: AllEmployeeTableComponent },
  { path: 'employee/:id', component: SaveEditEmployeeComponent },
  { path: 'employee', component: SaveEditEmployeeComponent },
  { path: 'employee-pers-inf/:id', component: SaveEditEmployeePrsInfComponent },
  //{ path: 'employee-pers-inf', component: SaveEditEmployeePrsInfComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    AllEmployeesComponent,
    SaveEditEmployeeComponent,
    SaveEditEmployeePrsInfComponent,
    SuccessComponent,
    ErrorComponent,
    AllEmployeeTableComponent,
    NavbarComponent,
    FooterComponent,
    LoginPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSliderModule,
    FormsModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
