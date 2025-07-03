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
    loadComponent: () => import('@pages/auth/login/login.page').then(m => m.LoginPage),
  },
  {
    path: RoutesUrlsEnum.REGISTER,
    loadComponent: () => import('@pages/auth/register/register.page').then(m => m.RegisterPage),
  },
  {
    path: RoutesUrlsEnum.FORGOT_PASSWORD,
    loadComponent: () => import('@pages/auth/forgot-password/forgot-password.page').then(m => m.ForgotPasswordPage),
  }
] as const
