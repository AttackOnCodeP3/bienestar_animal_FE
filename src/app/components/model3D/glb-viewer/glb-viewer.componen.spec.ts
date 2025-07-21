import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { GlbViewerComponent } from './glb-viewer.component';

describe('GlbViewerComponent', () => {
  let component: GlbViewerComponent;
  let fixture: ComponentFixture<GlbViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlbViewerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GlbViewerComponent);
    component = fixture.componentInstance;

    const mockCanvas = document.createElement('canvas');
    mockCanvas.width = 800;
    mockCanvas.height = 600;

    Object.defineProperty(component, 'canvas', {
      value: () => ({ nativeElement: mockCanvas }),
      writable: true,
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.isLoading).toBe(true);
    expect(component.errorMessage).toBeNull();
  });

  it('should have default width and height values', () => {
    expect(component.width()).toBe('100%');
    expect(component.height()).toBe('400px');
  });

  it('should have default autoRotate value', () => {
    expect(component.autoRotate()).toBe(true);
  });

  it('should accept custom width and height', () => {
    fixture.componentRef.setInput('width', '500px');
    fixture.componentRef.setInput('height', '300px');

    expect(component.width()).toBe('500px');
    expect(component.height()).toBe('300px');
  });

  it('should accept custom autoRotate value', () => {
    fixture.componentRef.setInput('autoRotate', false);
    expect(component.autoRotate()).toBe(false);
  });

  it('should display loading state initially', () => {
    const compiled = fixture.nativeElement;
    const loadingElement = compiled.querySelector('.loading-overlay');
    expect(loadingElement).toBeTruthy();
  });

  it('should display error message when errorMessage is set', () => {
    component.errorMessage = 'Test error message';
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const errorElement = compiled.querySelector('.error-overlay');
    expect(errorElement).toBeTruthy();
    expect(errorElement.textContent).toContain('Test error message');
  });

  it('should hide loading when isLoading is false', () => {
    component.isLoading = false;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const loadingElement = compiled.querySelector('.loading-overlay');
    expect(loadingElement).toBeFalsy();
  });

  it('should have canvas element', () => {
    const compiled = fixture.nativeElement;
    const canvasElement = compiled.querySelector('.three-canvas');
    expect(canvasElement).toBeTruthy();
    expect(canvasElement.tagName).toBe('CANVAS');
  });

  it('should apply custom width and height styles', () => {
    fixture.componentRef.setInput('width', '600px');
    fixture.componentRef.setInput('height', '500px');
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const containerElement = compiled.querySelector('.glb-viewer-container');

    expect(containerElement.style.width).toBe('600px');
    expect(containerElement.style.height).toBe('500px');
  });
});
