import {inject, Injectable, signal} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {firstValueFrom} from 'rxjs';
import {Constants} from '@common/constants/constants';
import {LanguagesEnum} from '@common/enums';
import {ISupportedLanguage} from '@common/interfaces';
import {LogService} from '@services/general';
import {
  I18nButtonsEnum,
  I18nComponentsEnum,
  I18nFormsEnum,
  I18nGeneralKeysEnum,
  I18nMessagesEnum,
  I18nPagesEnum,
  I18nTablesEnum,
} from '@common/enums/i18n';

/**
 * Interface that defines the literal object for label parameters.
 * @author dgutierrez
 */
interface ILabelParameters {
  value?: string | undefined;
}

/**
 * Service to query labels from the internationalization file in a simplified way.
 * @author dgutierrez
 */
@Injectable({
  providedIn: 'root',
})
export class I18nService {
  private readonly translateService: TranslateService = inject(TranslateService);
  private readonly log = inject(LogService);

  readonly supportedLanguages = signal<ISupportedLanguage[]>([
    {
      code: LanguagesEnum.SPANISH,
      icon: "language_spanish",
      label: I18nGeneralKeysEnum.SPANISH,
    },
    {
      code: LanguagesEnum.ENGLISH,
      icon: "language_us",
      label: I18nGeneralKeysEnum.ENGLISH,
    }
  ]);

  readonly currentLanguage = signal<ISupportedLanguage | null>(null);

  get i18nPagesEnum() {
    return I18nPagesEnum;
  }

  get i18nGeneralEnum() {
    return I18nGeneralKeysEnum;
  }

  get i18nFormsEnum() {
    return I18nFormsEnum
  }

  get i18nButtonsEnum() {
    return I18nButtonsEnum;
  }

  get i18nComponentsEnum() {
    return I18nComponentsEnum;
  }

  get i18nMessagesEnum() {
    return I18nMessagesEnum;
  }

  get i18nTablesEnum() {
    return I18nTablesEnum;
  }

  /**
   * Gets the translated value of a label from the internationalization file.
   * @param key Key of the label to search for.
   * @param parameter Parameter to pass to the label (optional).
   * @returns Translated value of the label if it exists, or the original key surrounded by `¿¿¿` if it doesn't exist.
   * @author dgutierrez
   */
  async get(key: string, parameter?: string): Promise<string> {
    const parameters: ILabelParameters = parameter ? {value: parameter} : {};
    try {
      return await firstValueFrom(this.translateService.get(key, parameters));
    } catch {
      return `¿¿¿${key}???`;
    }
  }

  /**
   * Checks if a translation exists for a given key using dot notation.
   *
   * @param key The i18n key (e.g., 'httpErrors.unauthorized')
   * @returns True if the translation exists, false otherwise
   * @author dgutierrez
   */
  has(key: string): boolean {
    const currentLang = this.translateService.currentLang || this.getBrowserLanguage();
    const translations = this.translateService.translations[currentLang];

    if (!translations) {
      return false;
    }

    const segments = key.split('.');
    let current: any = translations;

    for (const segment of segments) {
      if (current && Object.prototype.hasOwnProperty.call(current, segment)) {
        current = current[segment];
      } else {
        return false;
      }
    }

    return typeof current === 'string';
  }

  /**
   * Returns a translation instantly from the internal state of the loaded translation. All rules related to the current language, preferred language, and even alternative languages will be used, except for promise management.
   * @param key {string} Key of the label to search for.
   * @param parameter {string} Parameter to pass to the label (optional).
   * @returns {string} Translated value of the label if it exists, or the original key surrounded by `¿¿¿` if it doesn't exist.
   * @author dgutierrez
   */
  instant(key: string, parameter?: string): string {
    const parameters: ILabelParameters = parameter ? {value: parameter} : {};
    return this.translateService.instant(key, parameters);
  }

  /**
   * Returns the list of supported languages.
   * @param code
   */
  getPreferenceLanguageByCode(code: string): ISupportedLanguage | null {
    const languages: ISupportedLanguage[] = this.supportedLanguages();
    const language: ISupportedLanguage | undefined = languages.find(lang => lang.code === code.toLowerCase());
    if (language) {
      this.currentLanguage.set(language);
      return language;
    }
    return null;
  }

  /**
   * Returns the browser's language in lowercase.
   * This method is used to determine the default language of the application based on the user's browser settings.
   * @returns {string} The browser's language code in lowercase, or 'es' (Spanish) if the language is not available.
   * @author dgutierrez
   */
  getBrowserLanguage(): string {
    return this.translateService.getBrowserLang() || LanguagesEnum.SPANISH;
  }

  /**
   * Sets the preferred language for the application.
   * If the language is null, it removes the preference from localStorage.
   * @param {ISupportedLanguage | null} language The language to set as preference.
   * @author dgutierrez
   */
  setPreferenceLanguage(language: ISupportedLanguage | null): void {
    const currentLanguage = this.currentLanguage();
    this.log.debug({
      message: 'Setting preference language',
      data: {language, currentLanguage},
    })
    if (language) {
      if (currentLanguage?.code === language.code) {
        return;
      }
      localStorage.setItem(Constants.LS_APP_PREFERENCE_LANGUAGE, language.code);
      this.currentLanguage.set(language);
      this.translateService.use(language.code);
    } else {
      if (currentLanguage) {
        this.currentLanguage.set(null);
      }
      localStorage.removeItem(Constants.LS_APP_PREFERENCE_LANGUAGE);
    }
  }

  /**
   * Returns the preferred language of the application from localStorage.
   * If no preference is set, it defaults to the browser's language or 'es' (Spanish).
   * @returns {string} The preferred language code in lowercase.
   * @author dgutierrez
   */
  getPreferenceLanguage(): string {
    const language: string | null = localStorage.getItem(Constants.LS_APP_PREFERENCE_LANGUAGE);
    if (language) return language;
    return this.getBrowserLanguage() || LanguagesEnum.SPANISH;
  }
}
