import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerOptionFormComponent } from './volunteer-option-form.component';

describe('VolunteerOptionForm', () => {
  let component: VolunteerOptionFormComponent;
  let fixture: ComponentFixture<VolunteerOptionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolunteerOptionFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolunteerOptionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
