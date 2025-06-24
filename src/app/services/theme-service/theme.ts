import {computed, effect, Injectable, signal} from '@angular/core';
import {IAppTheme} from '@common/interfaces';
import {ThemeName} from '@common/types/theme-name.type';


@Injectable({
  providedIn: 'root'
})
export class Theme {

  private appTheme = signal<ThemeName>('system');

  private themes: IAppTheme[] = [
    { name: 'light', icon: 'light_mode' },
    { name: 'dark', icon: 'dark_mode' },
    { name: 'system', icon: 'desktop_windows' },
  ];

  selectedTheme = computed(() =>
    this.themes.find((t) => t.name === this.appTheme())
  );

  getThemes() {
    return this.themes;
  }

  setTheme(theme: ThemeName) {
    this.appTheme.set(theme);
  }

  constructor() {
    effect(() => {
      const theme = this.appTheme();
      //get the body html element
      const body = document.querySelector('body') as HTMLBodyElement;

      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const isDark = theme === 'dark' || (theme === 'system' && prefersDark);
      if (isDark) {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
      } else{
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
      }
    });
  }
}
