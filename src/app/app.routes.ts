import { Routes } from '@angular/router';
import {DashboardLayoutComponent} from '@components/dashboard-layout/dashboard-layout.component';
import {RoutesUrlsEnum} from '@common/enums/routes-urls.enum';
import {authGuard} from '@core/guards';

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
    canActivate: [authGuard],
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
        loadChildren: () => import('@pages/gamification/gamification.routes').then(m => m.GEMIFICATION_ROUTES),
      },
      {
        path: RoutesUrlsEnum.REPORTS,
        loadChildren: () => import('@pages/reports/reports.routes').then(m => m.REPORTS_ROUTES),
      }
    ]
  }
];
