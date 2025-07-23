import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialCallbackPage } from './social-callback.page';

describe('SocialCallback', () => {
  let component: SocialCallbackPage;
  let fixture: ComponentFixture<SocialCallbackPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialCallbackPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialCallbackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
