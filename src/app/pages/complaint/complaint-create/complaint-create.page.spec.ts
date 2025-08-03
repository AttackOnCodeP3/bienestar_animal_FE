import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintCreatePage } from './complaint-create.page';

describe('ComplaintCreate', () => {
  let component: ComplaintCreatePage;
  let fixture: ComponentFixture<ComplaintCreatePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplaintCreatePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplaintCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
