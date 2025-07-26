import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationRulesListPage } from './notification-rules-list.page';

describe('NotificationRulesList', () => {
  let component: NotificationRulesListPage;
  let fixture: ComponentFixture<NotificationRulesListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationRulesListPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationRulesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
