import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViewerPictureViewerComponent } from './modal-viewer-picture-viewer.component';

describe('ModalViewerPictureViewer', () => {
  let component: ModalViewerPictureViewerComponent;
  let fixture: ComponentFixture<ModalViewerPictureViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalViewerPictureViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalViewerPictureViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
