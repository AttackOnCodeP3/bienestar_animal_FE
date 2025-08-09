import {
  ApplicationConfig,
  LOCALE_ID,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  MissingTranslationHandler,
  provideTranslateService,
  TranslateLoader,
} from '@ngx-translate/core';
import {
  MatPaginatorCustomService,
  MissingI18nService,
} from '@services/general';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  accessTokenInterceptor,
  baseUrlInterceptor,
  handleErrorsInterceptor,
} from '@core/interceptors';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { provideLottieOptions } from 'ngx-lottie';

import localeEs from '@angular/common/locales/es';
 import localeEn from '@angular/common/locales/en';
import {MAT_DATE_LOCALE} from '@angular/material/core';

registerLocaleData(localeEs);
 registerLocaleData(localeEn); // opcional

// AoT requires an exported function for factories
const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, './i18n/', '.json');

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([baseUrlInterceptor, accessTokenInterceptor, handleErrorsInterceptor]),
    ),
    provideRouter(routes),
    provideZonelessChangeDetection(),
    provideLottieOptions({
      player: () => import('lottie-web'),
    }),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: MissingI18nService,
      },
    }),

    // 👇 Esto es lo importante para que el date pipe salga en español
    { provide: LOCALE_ID, useValue: 'es' },

    { provide: MAT_DATE_LOCALE, useValue: 'es-CR' },
    { provide: MatPaginatorIntl, useClass: MatPaginatorCustomService },
  ],
};
