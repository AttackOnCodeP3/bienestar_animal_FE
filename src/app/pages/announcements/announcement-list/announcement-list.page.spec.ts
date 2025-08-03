import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementListPage } from './announcement-list.page';

describe('AnnouncementList', () => {
  let component: AnnouncementListPage;
  let fixture: ComponentFixture<AnnouncementListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouncementListPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
