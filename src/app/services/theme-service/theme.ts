import {computed, inject, Injectable, signal} from '@angular/core';
import {IAppTheme} from '@common/interfaces';
import {ThemeName} from '@common/types';
import {Constants} from '@common/constants/constants';
import {Log} from '@services/general';
import {I18nGeneralKeysEnum} from '@common/enums/i18n';

/**
 * Service for managing application themes (light, dark, system).
 * @author dgutierrez
 */
@Injectable({
  providedIn: 'root'
})
export class Theme {
  private readonly log = inject(Log);
  readonly appTheme = signal<ThemeName>('system');

  themes: IAppTheme[] = [
    {name: 'light', icon: 'light_mode', label: I18nGeneralKeysEnum.LIGHT},
    {name: 'dark', icon: 'dark_mode', label: I18nGeneralKeysEnum.DARK},
    {name: 'system', icon: 'desktop_windows', label: I18nGeneralKeysEnum.SYSTEM},
  ];

  /**
   * Computed property that returns the currently selected theme object
   * @author dgutierrez
   */
  readonly selectedTheme = computed(() =>
    this.themes.find((t) => t.name === this.appTheme())
  );

  /**
   * Returns all available themes
   * @returns Array of theme objects
   * @author dgutierrez
   */
  getThemes() {
    return this.themes;
  }

  /**
   * Sets the application theme and saves the preference to localStorage
   * @param theme The theme to set ('light', 'dark', or 'system')
   * @author dgutierrez
   */
  setTheme(theme: ThemeName) {
    this.appTheme.set(theme);
    this.saveThemePreference(theme);
  }

  /**
   * Applies the appropriate CSS classes to the body element based on the current theme.
   * @param theme The theme to apply ('light', 'dark', or 'system')
   * @returns boolean indicating if dark mode is active
   * @author dgutierrez
   */
  applyTheme(theme: ThemeName): boolean {
    this.log.debug({
      message: 'Applying theme',
      data: {theme},
    })

    // Get the body html element
    const body = document.querySelector('body') as HTMLBodyElement;

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = theme === 'dark' || (theme === 'system' && prefersDark);

    if (isDark) {
      body.classList.add('dark-mode');
      body.classList.remove('light-mode');
    } else {
      body.classList.add('light-mode');
      body.classList.remove('dark-mode');
    }

    return isDark;
  }

  /**
   * Saves the theme preference to localStorage
   * @param theme The theme preference to save
   * @author dgutierrez
   */
  private saveThemePreference(theme: ThemeName): void {
    localStorage.setItem(Constants.LS_APP_PREFERENCE_SCHEME, theme);
  }

  /**
   * Loads the theme preference from localStorage
   * @returns The saved theme preference or null if not found
   * @author dgutierrez
   */
  private loadThemePreference(): ThemeName | null {
    return localStorage.getItem(Constants.LS_APP_PREFERENCE_SCHEME) as ThemeName | null;
  }

  constructor() {
    // Load saved theme preference from localStorage
    const savedTheme = this.loadThemePreference();
    if (savedTheme) {
      this.appTheme.set(savedTheme);
    }

    this.log.debug({
      message: 'Theme service initialized',
      data: {theme: this.appTheme()},
    })
  }
}
