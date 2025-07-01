import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItWorkedAsNurseryHomeComponent } from './it-worked-as-nursery-home.component';

describe('ItWorkedAsNurseryHome', () => {
  let component: ItWorkedAsNurseryHomeComponent;
  let fixture: ComponentFixture<ItWorkedAsNurseryHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItWorkedAsNurseryHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItWorkedAsNurseryHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
