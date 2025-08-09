import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementDetailPage } from './announcement-detail.page';

describe('AnnouncementDetail', () => {
  let component: AnnouncementDetailPage;
  let fixture: ComponentFixture<AnnouncementDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouncementDetailPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
