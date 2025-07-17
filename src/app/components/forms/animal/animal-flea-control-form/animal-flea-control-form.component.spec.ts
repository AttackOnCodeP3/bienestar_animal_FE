import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalFleaControlFormComponent } from './animal-flea-control-form.component';

describe('AnimalFleaControlForm', () => {
  let component: AnimalFleaControlFormComponent;
  let fixture: ComponentFixture<AnimalFleaControlFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalFleaControlFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalFleaControlFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
