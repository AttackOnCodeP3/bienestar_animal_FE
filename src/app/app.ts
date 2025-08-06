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
    this.loadGoogleMapsScript(); 

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

    //The default language is hardcoded to Spanish as per the request to remove the requirement.
    //const languageCode = matchedLanguage ? matchedLanguage.code : LanguagesEnum.SPANISH;
    const languageCode = LanguagesEnum.SPANISH; // Default to Spanish
    this.translateService.use(languageCode).subscribe(() => {
      this.i18nService.setPreferenceLanguage(this.i18nService.getPreferenceLanguageByCode(languageCode) || null);
      this.logService.debug({
        message: `Default language set to: ${languageCode.toUpperCase()}`,
      });
    })
  }
  /**
   * Dynamically loads the Google Maps JavaScript API script into the document if it has not already been loaded.
   * This method checks for an existing script tag with the Google Maps API source and, if not found,
   * creates and appends a new script element to the document head using the API key from the environment configuration.
   *
   * @author @aBlancoC
   */
  private loadGoogleMapsScript(): void {
    if (!document.querySelector('script[src^="https://maps.googleapis.com/maps/api/js"]')) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.NG_APP_API_KEY_GOOGLE_MAPS2}`;
      script.defer = true;
      document.head.appendChild(script);
    }
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
