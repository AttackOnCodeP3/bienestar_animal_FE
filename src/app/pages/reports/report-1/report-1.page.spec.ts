import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Report1Page } from './report-1.page';

describe('Report1', () => {
  let component: Report1Page;
  let fixture: ComponentFixture<Report1Page>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Report1Page]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Report1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
