import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEmployeeTableComponent } from './all-employee-table.component';

describe('AllEmployeeTableComponent', () => {
  let component: AllEmployeeTableComponent;
  let fixture: ComponentFixture<AllEmployeeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllEmployeeTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllEmployeeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
