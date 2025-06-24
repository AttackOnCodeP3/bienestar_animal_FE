import {Routes} from '@angular/router';

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
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('@pages/auth/login/login').then(m => m.Login),
  }
] as const
