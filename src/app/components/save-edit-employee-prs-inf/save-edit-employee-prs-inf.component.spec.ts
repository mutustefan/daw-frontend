import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveEditEmployeePrsInfComponent } from './save-edit-employee-prs-inf.component';

describe('SaveEditEmployeePrsInfComponent', () => {
  let component: SaveEditEmployeePrsInfComponent;
  let fixture: ComponentFixture<SaveEditEmployeePrsInfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveEditEmployeePrsInfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveEditEmployeePrsInfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
