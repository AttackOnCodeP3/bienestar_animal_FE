import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalDewormingFormComponent } from './animal-deworming-form.component';

describe('AnimalDewormingForm', () => {
  let component: AnimalDewormingFormComponent;
  let fixture: ComponentFixture<AnimalDewormingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalDewormingFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalDewormingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
