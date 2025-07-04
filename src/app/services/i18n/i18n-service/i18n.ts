import {inject, Injectable, signal} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {firstValueFrom} from 'rxjs';
import {Constants} from '@common/constants/constants';
import {LanguagesEnum} from '@common/enums';
import {ISupportedLanguage} from '@common/interfaces';
import {Log} from '@services/general';
import {I18nGeneralKeysEnum} from '@common/enums/i18n';

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
export class I18n {
  private readonly translateService: TranslateService = inject(TranslateService);
  private readonly log = inject(Log);
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

  getPrefenceLenguageByCode(code: string): ISupportedLanguage | null {
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
