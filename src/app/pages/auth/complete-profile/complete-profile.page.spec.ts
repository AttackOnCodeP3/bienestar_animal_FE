import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteProfilePage } from './complete-profile.page';

describe('CompleteProfile', () => {
  let component: CompleteProfilePage;
  let fixture: ComponentFixture<CompleteProfilePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompleteProfilePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompleteProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
