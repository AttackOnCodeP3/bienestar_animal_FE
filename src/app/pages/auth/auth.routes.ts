import {Routes} from '@angular/router';
import {RoutesUrlsEnum} from '@common/enums';

/**
 * Defines the authentication routes for the application.
 *
 * - Redirects the empty path to the `login` route.
 * - Loads the `Login` component asynchronously when navigating to the `login` path.
 *
 * @type {Routes}
 *
 * @author dgutierrez
 */
export const AUTH_ROUTES: Routes = [
  {
    path: '',
    redirectTo: RoutesUrlsEnum.LOGIN,
    pathMatch: 'full',
  },
  {
    path: RoutesUrlsEnum.LOGIN,
    loadComponent: () => import('@pages/auth/login/login').then(m => m.Login),
  },
  {
    path: RoutesUrlsEnum.REGISTER,
    loadComponent: () => import('@pages/auth/register/register').then(m => m.Register),
  },
  {
    path: RoutesUrlsEnum.FORGOT_PASSWORD,
    loadComponent: () => import('@pages/auth/forgot-password/forgot-password').then(m => m.ForgotPassword),
  }
] as const
