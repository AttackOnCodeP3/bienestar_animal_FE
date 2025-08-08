
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterCommunityAnimalByCensusPage } from './register-community-animal-by-census.page';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AlertService, FormsService, I18nService } from '@services/general';
import { UserHttpService } from '@services/http';

describe('RegisterCommunityAnimalByCensusPage', () => {
  let component: RegisterCommunityAnimalByCensusPage;
  let fixture: ComponentFixture<RegisterCommunityAnimalByCensusPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [RegisterCommunityAnimalByCensusPage],
      providers: [
        provideHttpClientTesting(),
        {provide: AlertService, useValue: jasmine.createSpyObj('AlertService', ['displayAlert', 'displaySnackBar'])},
        {provide: FormsService, useValue: jasmine.createSpyObj('FormsService', ['markFormTouchedAndDirty'])},
        {provide: I18nService, useValue: {}},
        {
          provide: UserHttpService,
          useValue: jasmine.createSpyObj('UserHttpService', ['getByIdentificationCard', 'adminRegisterUser', 'selectedUserById'])
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterCommunityAnimalByCensusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show error on invalid cedula', () => {
    component.cedulaControl.setValue('');
    component.onSearchByCedula();
    expect(component.alertService.displayAlert).toHaveBeenCalledWith(jasmine.objectContaining({messageKey: 'Ingrese una cédula válida'}));
  });

  it('should call userHttpService.getByIdentificationCard on valid cedula', () => {
    const spy = component.userHttpService.getByIdentificationCard;
    component.cedulaControl.setValue('123456789');
    component.onSearchByCedula();
    expect(spy).toHaveBeenCalledWith('123456789');
  });
})
