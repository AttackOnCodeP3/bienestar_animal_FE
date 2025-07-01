import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDataUserRegistrationFormComponent } from './personal-data-user-registration-form.component';

describe('UserRegistrationForm', () => {
  let component: PersonalDataUserRegistrationFormComponent;
  let fixture: ComponentFixture<PersonalDataUserRegistrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalDataUserRegistrationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalDataUserRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
