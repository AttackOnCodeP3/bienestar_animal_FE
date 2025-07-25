import {Routes} from '@angular/router';
import {RoutesUrlsEnum} from '@common/enums';
import {guestGuard} from '@core/guards';

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
    path: RoutesUrlsEnum.ACCESS_DENIED,
    loadComponent: () => import('@pages/auth/access-denied/access-denied.page').then(m => m.AccessDeniedPage),
  },
  {
    path: RoutesUrlsEnum.COMPLETE_PROFILE,
    loadComponent: () => import('@pages/auth/complete-profile/complete-profile.page').then(m => m.CompleteProfilePage),
  },
  {
    path: RoutesUrlsEnum.LOGIN,
    loadComponent: () => import('@pages/auth/login/login.page').then(m => m.LoginPage),
    canActivate: [guestGuard]
  },
  {
    path: RoutesUrlsEnum.REGISTER,
    loadComponent: () => import('@pages/auth/register/register.page').then(m => m.RegisterPage),
    canActivate: [guestGuard]
  },
  {
    path: RoutesUrlsEnum.FORGOT_PASSWORD,
    loadComponent: () => import('@pages/auth/forgot-password/forgot-password.page').then(m => m.ForgotPasswordPage),
  },
  {
    path: RoutesUrlsEnum.CHANGE_PASSWORD,
    loadComponent: () => import('@pages/auth/change-password/change-password.page').then(m => m.ChangePasswordPage),
  },
  {
    path: RoutesUrlsEnum.SOCIAL_CALLBACK,
    loadComponent: () => import('@pages/auth/social-callback/social-callback.page').then(m => m.SocialCallbackPage),
  }
] as const
