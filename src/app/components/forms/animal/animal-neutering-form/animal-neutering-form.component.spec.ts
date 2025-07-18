import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalNeuteringFormComponent } from './animal-neutering-form.component';

describe('AnimalSterilizationForm', () => {
  let component: AnimalNeuteringFormComponent;
  let fixture: ComponentFixture<AnimalNeuteringFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalNeuteringFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalNeuteringFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
