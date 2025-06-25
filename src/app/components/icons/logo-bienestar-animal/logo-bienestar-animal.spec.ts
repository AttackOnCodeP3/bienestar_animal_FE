import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoBienestarAnimal } from './logo-bienestar-animal';

describe('LogoBienestarAnimal', () => {
  let component: LogoBienestarAnimal;
  let fixture: ComponentFixture<LogoBienestarAnimal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoBienestarAnimal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoBienestarAnimal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
