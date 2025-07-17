import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalBasicInfoFormComponent } from './animal-basic-info-form.component';

describe('AnimalBasicInfoForm', () => {
  let component: AnimalBasicInfoFormComponent;
  let fixture: ComponentFixture<AnimalBasicInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalBasicInfoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalBasicInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
