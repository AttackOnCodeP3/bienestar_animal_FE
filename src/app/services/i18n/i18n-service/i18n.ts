import {inject, Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {firstValueFrom} from 'rxjs';

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
  // Dependency injection
  private readonly translateService: TranslateService = inject(TranslateService);


  constructor() {
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
}
