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
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

registerLocaleData(localeEs)

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    { provide: LOCALE_ID, useValue: 'es' },
    provideHttpClient(withInterceptorsFromDi())
  ]
};
