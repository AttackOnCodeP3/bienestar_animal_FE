import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationRulesEditPage } from './notification-rules-edit.page';

describe('NotificationRulesEdit', () => {
  let component: NotificationRulesEditPage;
  let fixture: ComponentFixture<NotificationRulesEditPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationRulesEditPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationRulesEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
