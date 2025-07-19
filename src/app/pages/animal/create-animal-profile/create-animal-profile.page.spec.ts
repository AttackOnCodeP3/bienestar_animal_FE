import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAnimalProfilePage } from './create-animal-profile.page';

describe('CreateAnimalProfile', () => {
  let component: CreateAnimalProfilePage;
  let fixture: ComponentFixture<CreateAnimalProfilePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAnimalProfilePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAnimalProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
