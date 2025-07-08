import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralContainerComponent } from './general-container-component';

describe('ContainerBoxComponent', () => {
  let component: GeneralContainerComponent;
  let fixture: ComponentFixture<GeneralContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
