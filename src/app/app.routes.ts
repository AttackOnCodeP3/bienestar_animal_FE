import {Routes} from '@angular/router';
import {RoutesUrlsEnum} from '@common/enums';
import {authGuard, profileCompletedGuard} from '@core/guards';
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
        loadComponent: () => import('@pages/home/home.page').then(m => m.HomePage),
      },
      {
        path: RoutesUrlsEnum.GAMIFICATION,
        loadChildren: () => import('@pages/gamification/gamification.routes').then(m => m.GAMIFICATION_ROUTES),
      },
      {
        path: RoutesUrlsEnum.REPORTS,
        loadChildren: () => import('@pages/reports/reports.routes').then(m => m.REPORTS_ROUTES),
      }
    ]
  }
];
