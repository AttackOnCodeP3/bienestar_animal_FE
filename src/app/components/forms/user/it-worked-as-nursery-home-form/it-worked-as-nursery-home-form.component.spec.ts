import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItWorkedAsNurseryHomeFormComponent } from './it-worked-as-nursery-home-form.component';

describe('ItWorkedAsNurseryHome', () => {
  let component: ItWorkedAsNurseryHomeFormComponent;
  let fixture: ComponentFixture<ItWorkedAsNurseryHomeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItWorkedAsNurseryHomeFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItWorkedAsNurseryHomeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
