import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsSystem } from './rewards-system';

describe('RewardsSystem', () => {
  let component: RewardsSystem;
  let fixture: ComponentFixture<RewardsSystem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RewardsSystem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RewardsSystem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
