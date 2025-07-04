import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessDeniedPage } from './access-denied.page';

describe('AccessDenied', () => {
  let component: AccessDeniedPage;
  let fixture: ComponentFixture<AccessDeniedPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessDeniedPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessDeniedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
