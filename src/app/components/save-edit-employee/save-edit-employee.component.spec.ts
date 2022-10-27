import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveEditEmployeeComponent } from './save-edit-employee.component';

describe('SaveEditEmployeeComponent', () => {
  let component: SaveEditEmployeeComponent;
  let fixture: ComponentFixture<SaveEditEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveEditEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveEditEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
