import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementEditPage } from './announcement-edit.page';

describe('AnnouncementEdit', () => {
  let component: AnnouncementEditPage;
  let fixture: ComponentFixture<AnnouncementEditPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouncementEditPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
