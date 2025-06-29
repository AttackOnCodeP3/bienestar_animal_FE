import {Component, effect, inject} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { RouterOutlet } from '@angular/router';
import {Theme, Log} from '@services/general';
import {LanguagesEnum} from '@common/enums';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly log = inject(Log);
  private readonly translate = inject(TranslateService);
  readonly theme = inject(Theme);

  constructor() {
    this.setDefaultLanguage();
  }

  /**
   * Effect that watches for theme changes and applies the appropriate CSS classes to the body element.
   * It handles three theme modes:
   * - light: Forces light theme
   * - dark: Forces dark theme
   * - system: Uses the system preference (dark or light)
   * @author dgutierrez
   */
  readonly themeEffect = effect(() => {
    this.log.debug({
      message: 'Theme effect triggered',
      data: { theme: this.theme.appTheme() },
    });
    const theme = this.theme.appTheme();
    this.theme.applyTheme(theme);
  });

  /**
   * Sets the default language for the application based on the browser's language.
   * If the browser language is not supported, it defaults to Spanish.
   * Supported languages: Spanish (es), English (en)
   * @author dgutierrez
   */
  private setDefaultLanguage(): void {
    let browserLanguage: string = navigator.language;
    this.log.debug({
      message: 'Browser language: ' + browserLanguage,
    });

    let defaultLanguage: string;

    defaultLanguage = LanguagesEnum.SPANISH;
    if (browserLanguage.startsWith(LanguagesEnum.SPANISH)) {
      defaultLanguage = LanguagesEnum.SPANISH;
    } else if (browserLanguage.startsWith(LanguagesEnum.ENGLISH)) {
      defaultLanguage = LanguagesEnum.ENGLISH;
    } else {
      this.log.debug({
        message: 'Unsupported language: ' + browserLanguage,
      });
      defaultLanguage = LanguagesEnum.SPANISH;
    }

    this.translate.setDefaultLang(defaultLanguage);
    this.log.debug({
      message: 'Default language set to: ' + defaultLanguage.toUpperCase(),
    });
  }
}
