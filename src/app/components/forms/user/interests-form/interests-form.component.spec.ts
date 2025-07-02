import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestsFormComponent } from './interests-form.component';

describe('Interests', () => {
  let component: InterestsFormComponent;
  let fixture: ComponentFixture<InterestsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterestsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterestsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
