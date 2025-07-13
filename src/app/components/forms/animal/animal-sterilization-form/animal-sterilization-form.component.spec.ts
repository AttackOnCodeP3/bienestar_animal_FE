import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalSterilizationFormComponent } from './animal-sterilization-form.component';

describe('AnimalSterilizationForm', () => {
  let component: AnimalSterilizationFormComponent;
  let fixture: ComponentFixture<AnimalSterilizationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalSterilizationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalSterilizationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
