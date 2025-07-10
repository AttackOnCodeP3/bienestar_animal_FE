import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleSelectorFormComponent } from '@components/forms/user';

describe('RoleSelector', () => {
  let component: RoleSelectorFormComponent;
  let fixture: ComponentFixture<RoleSelectorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleSelectorFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleSelectorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
