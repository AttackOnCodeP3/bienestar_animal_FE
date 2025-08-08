import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementCreatePage } from './announcement-create.page';

describe('AnnouncementCreate', () => {
  let component: AnnouncementCreatePage;
  let fixture: ComponentFixture<AnnouncementCreatePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouncementCreatePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
