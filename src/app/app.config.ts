import {
  ApplicationConfig,
  LOCALE_ID,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import { provideRouter } from '@angular/router';
import localeEn from '@angular/common/locales/en'

import { routes } from './app.routes';
import {HttpClient, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {MissingTranslationHandler, provideTranslateService, TranslateLoader} from '@ngx-translate/core';
import {MissingI18n} from './services/i18n';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {LanguagesEnum} from '@common/enums';

registerLocaleData(localeEn)

// AoT requires an exported function for factories
const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, './i18n/', '.json');


export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes),
    provideZonelessChangeDetection(),
    provideTranslateService({
      defaultLanguage: LanguagesEnum.ENGLISH,
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: MissingI18n,
      },
    }),
    { provide: LOCALE_ID, useValue: 'en' },
  ]
};
