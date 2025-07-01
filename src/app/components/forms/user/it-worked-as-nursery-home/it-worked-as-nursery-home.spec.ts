import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItWorkedAsNurseryHome } from './it-worked-as-nursery-home';

describe('ItWorkedAsNurseryHome', () => {
  let component: ItWorkedAsNurseryHome;
  let fixture: ComponentFixture<ItWorkedAsNurseryHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItWorkedAsNurseryHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItWorkedAsNurseryHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
