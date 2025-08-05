import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintManagePage } from './complaint-manage.page';

describe('ComplaintManage', () => {
  let component: ComplaintManagePage;
  let fixture: ComponentFixture<ComplaintManagePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplaintManagePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplaintManagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
