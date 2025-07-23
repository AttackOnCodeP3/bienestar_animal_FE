import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';

/**
 * Handler that manages cases where labels are not found by key
 * @author dgutierrez
 */
export class MissingI18nService implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {
    return "¿¿¿" + params.key + "???";
  }
}
