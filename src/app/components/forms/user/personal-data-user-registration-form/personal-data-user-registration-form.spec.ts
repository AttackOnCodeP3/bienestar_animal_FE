import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDataUserRegistrationForm } from './personal-data-user-registration-form';

describe('UserRegistrationForm', () => {
  let component: PersonalDataUserRegistrationForm;
  let fixture: ComponentFixture<PersonalDataUserRegistrationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalDataUserRegistrationForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalDataUserRegistrationForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
