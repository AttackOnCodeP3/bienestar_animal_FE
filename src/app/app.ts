import {Component, effect, inject} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {RouterOutlet} from '@angular/router';
import {Theme, Log, I18n} from '@services/general';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {LanguagesEnum, SvgIconsEnum} from '@common/enums';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly log = inject(Log);
  private readonly translate = inject(TranslateService);
  private readonly i18n = inject(I18n);
  private readonly matIconReg = inject(MatIconRegistry);
  private readonly sanitizer = inject(DomSanitizer);
  readonly theme = inject(Theme);

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
    this.log.debug({
      message: 'Theme effect triggered',
      data: {theme: this.theme.appTheme()},
    });
    const theme = this.theme.appTheme();
    this.theme.applyTheme(theme);
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
    const preferredLanguage: string = this.i18n.getPreferenceLanguage();
    this.log.debug({
      message: `Preferred language: ${preferredLanguage}`,
    });

    const supportedLanguages = this.i18n.supportedLanguages();
    const matchedLanguage = supportedLanguages.find(lang =>
      preferredLanguage.startsWith(lang.code)
    );

    const languageCode = matchedLanguage ? matchedLanguage.code : LanguagesEnum.SPANISH;

    this.translate.setDefaultLang(languageCode);
    this.i18n.setPreferenceLanguage(this.i18n.getPrefenceLenguageByCode(languageCode) || null);
    this.log.debug({
      message: `Default language set to: ${languageCode.toUpperCase()}`,
    });
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
