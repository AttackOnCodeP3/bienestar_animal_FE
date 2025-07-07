import {Routes} from '@angular/router';
import {RolesEnum, RoutesUrlsEnum} from '@common/enums';
import {authGuard, profileCompletedGuard, roleGuard} from '@core/guards';
import {DashboardLayoutComponent} from '@components/general';

export const routes: Routes = [
  {
    path: '',
    redirectTo: RoutesUrlsEnum.AUTH,
    pathMatch: 'full',
  },
  {
    path: RoutesUrlsEnum.AUTH,
    loadChildren: () => import('@pages/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: RoutesUrlsEnum.DASHBOARD,
    component: DashboardLayoutComponent,
    canActivate: [authGuard, profileCompletedGuard],
    children: [
      {
        path: '',
        redirectTo: RoutesUrlsEnum.HOME,
        pathMatch: 'full'
      },
      {
        path: RoutesUrlsEnum.HOME,
        canActivate: [roleGuard([RolesEnum.SUPER_ADMIN, RolesEnum.MUNICIPAL_ADMIN, RolesEnum.VOLUNTEER_USER, RolesEnum.COMMUNITY_USER])],
        loadComponent: () => import('@pages/home/home.page').then(m => m.HomePage),
      },
      {
        path: RoutesUrlsEnum.GAMIFICATION,
        canActivate: [roleGuard([RolesEnum.SUPER_ADMIN, RolesEnum.VOLUNTEER_USER])],
        loadChildren: () => import('@pages/gamification/gamification.routes').then(m => m.GAMIFICATION_ROUTES),
      },
      {
        path: RoutesUrlsEnum.REPORTS,
        canActivate: [roleGuard([RolesEnum.SUPER_ADMIN, RolesEnum.MUNICIPAL_ADMIN])],
        loadChildren: () => import('@pages/reports/reports.routes').then(m => m.REPORTS_ROUTES),
      },
      {
        path: RoutesUrlsEnum.SECURITY,
        loadChildren: () => import('@pages/security/security.routes').then(m => m.SECURITY_ROUTES),
        canActivate: [roleGuard([RolesEnum.SUPER_ADMIN])]
      }
    ]
  }
];
