import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoBienestarAnimalComponent } from './logo-bienestar-animal.component';

describe('LogoBienestarAnimal', () => {
  let component: LogoBienestarAnimalComponent;
  let fixture: ComponentFixture<LogoBienestarAnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoBienestarAnimalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoBienestarAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
