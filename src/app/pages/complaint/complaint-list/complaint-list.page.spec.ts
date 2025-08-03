import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintListPage } from './complaint-list.page';

describe('ComplaintList', () => {
  let component: ComplaintListPage;
  let fixture: ComponentFixture<ComplaintListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplaintListPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplaintListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
