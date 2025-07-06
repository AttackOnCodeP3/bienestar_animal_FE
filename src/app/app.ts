import {Component, effect, inject} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {RouterOutlet} from '@angular/router';
import {ThemeService, LogService, I18nService} from '@services/general';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {LanguagesEnum, SvgIconsEnum} from '@common/enums';
import {Constants} from '@common/constants/constants';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class App {
  private readonly i18nService = inject(I18nService);
  private readonly logService = inject(LogService);
  private readonly matIconReg = inject(MatIconRegistry);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly translateService = inject(TranslateService);
  readonly themeService = inject(ThemeService);

  constructor() {
    this.setDefaultLanguage();
    this.setDefaultFontSetClass();
    this.configureSvgsIconRegistry();
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
    this.logService.debug({
      message: 'Theme effect triggered',
      data: {theme: this.themeService.appTheme()},
    });
    const theme = this.themeService.appTheme();
    this.themeService.applyTheme(theme);
  });

  /**
   * Sets the default font set class for Material Icons.
   * @author dgutierrez
   */
  private setDefaultFontSetClass(): void {
    this.matIconReg.setDefaultFontSetClass('material-symbols-outlined');
  }

  /**
   * Sets the default language for the application based on the browser's language.
   * If the browser language is not supported, it defaults to Spanish.
   * Supported languages: Spanish (es), English (en)
   * @author dgutierrez
   */
  private setDefaultLanguage(): void {
    const preferredLanguage: string = this.i18nService.getPreferenceLanguage();
    this.logService.debug({
      message: `Preferred language: ${preferredLanguage}`,
    });

    const supportedLanguages = this.i18nService.supportedLanguages();
    const matchedLanguage = supportedLanguages.find(lang =>
      preferredLanguage.startsWith(lang.code)
    );

    const languageCode = matchedLanguage ? matchedLanguage.code : LanguagesEnum.SPANISH;

    this.translateService.use(languageCode).subscribe(() => {
      this.i18nService.setPreferenceLanguage(this.i18nService.getPreferenceLanguageByCode(languageCode) || null);
      this.logService.debug({
        message: `Default language set to: ${languageCode.toUpperCase()}`,
      });
    })
  }

  /**
   * Configures the custom SVG icons for the application.
   * This method registers the Google Sign-In icon using the MatIconRegistry.
   * It uses the DomSanitizer to bypass security for the SVG content.
   * @author dgutierrez
   */
  private configureSvgsIconRegistry(): void {
    this.matIconReg.addSvgIconLiteral('google-sign-in', this.sanitizer.bypassSecurityTrustHtml(SvgIconsEnum.GOOGLE_SIGN_IN))
  }
}
