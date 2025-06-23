import {Routes} from '@angular/router';


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
