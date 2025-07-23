import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalVaccinationFormComponent } from './animal-vaccination-form.component';

describe('AnimalVaccinationForm', () => {
  let component: AnimalVaccinationFormComponent;
  let fixture: ComponentFixture<AnimalVaccinationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalVaccinationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalVaccinationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
