import { TestBed } from '@angular/core/testing';
import { Theme } from './theme';
import { ThemeName } from '@common/types/theme-name.type';

describe('Theme', () => {
  let service: Theme;
  let localStorageSpy: jasmine.SpyObj<Storage>;
  let documentSpy: jasmine.SpyObj<Document>;
  let bodyElement: HTMLBodyElement;

  beforeEach(() => {
    // Create a mock body element
    bodyElement = document.createElement('body');

    // Spy on localStorage methods
    localStorageSpy = jasmine.createSpyObj('localStorage', ['getItem', 'setItem']);
    spyOn(window, 'localStorage').and.returnValue(localStorageSpy);

    // Spy on document.querySelector to return our mock body
    documentSpy = jasmine.createSpyObj('Document', ['querySelector']);
    documentSpy.querySelector.and.returnValue(bodyElement);
    spyOn(document, 'querySelector').and.callFake(documentSpy.querySelector);

    TestBed.configureTestingModule({});
    service = TestBed.inject(Theme);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should apply light theme correctly', () => {
    // Mock window.matchMedia to return false for dark mode
    spyOn(window, 'matchMedia').and.returnValue({
      matches: false
    } as MediaQueryList);

    const isDark = service.applyTheme('light');

    expect(isDark).toBeFalse();
    expect(bodyElement.classList.contains('light-mode')).toBeTrue();
    expect(bodyElement.classList.contains('dark-mode')).toBeFalse();
  });

  it('should apply dark theme correctly', () => {
    const isDark = service.applyTheme('dark');

    expect(isDark).toBeTrue();
    expect(bodyElement.classList.contains('dark-mode')).toBeTrue();
    expect(bodyElement.classList.contains('light-mode')).toBeFalse();
  });

  it('should follow system preference for system theme', () => {
    // Mock window.matchMedia to return true for dark mode
    spyOn(window, 'matchMedia').and.returnValue({
      matches: true
    } as MediaQueryList);

    const isDark = service.applyTheme('system');

    expect(isDark).toBeTrue();
    expect(bodyElement.classList.contains('dark-mode')).toBeTrue();
    expect(bodyElement.classList.contains('light-mode')).toBeFalse();
  });

  it('should save theme preference to localStorage when setting theme', () => {
    service.setTheme('dark');

    expect(localStorageSpy.setItem).toHaveBeenCalledWith('app-theme-preference', 'dark');
  });

  it('should load theme preference from localStorage on initialization', () => {
    // Reset the service to test initialization
    localStorageSpy.getItem.and.returnValue('dark');

    // Re-create the service to trigger constructor
    service = TestBed.inject(Theme);

    expect(localStorageSpy.getItem).toHaveBeenCalledWith('app-theme-preference');
    expect(service.selectedTheme()?.name).toBe('dark');
  });
});
