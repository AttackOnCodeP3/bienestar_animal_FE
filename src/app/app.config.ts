import {
  ApplicationConfig,
  LOCALE_ID,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import { provideRouter } from '@angular/router';
import localeEs from '@angular/common/locales/es'

import { routes } from './app.routes';
import {HttpClient, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {MissingTranslationHandler, provideTranslateService, TranslateLoader} from '@ngx-translate/core';
import {MissingI18n} from './services/i18n';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

registerLocaleData(localeEs)

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http)
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes),
    provideZonelessChangeDetection(),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: MissingI18n,
      },
    }),
    { provide: LOCALE_ID, useValue: 'es' },
  ]
};
