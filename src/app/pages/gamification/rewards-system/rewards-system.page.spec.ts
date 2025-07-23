import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsSystemPage } from './rewards-system.page';

describe('RewardsSystem', () => {
  let component: RewardsSystemPage;
  let fixture: ComponentFixture<RewardsSystemPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RewardsSystemPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RewardsSystemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
