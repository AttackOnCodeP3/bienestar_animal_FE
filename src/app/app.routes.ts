import { Routes } from '@angular/router';
import {DashboardLayout} from '@components/dashboard-layout/dashboard-layout';
import {RoutesUrlsEnum} from '@common/enums/routes-urls.enum';

export const routes: Routes = [
  {
    path: '',
    redirectTo: RoutesUrlsEnum.AUTH,
    pathMatch: 'full',
  },
  {
    path: RoutesUrlsEnum.AUTH,
    loadChildren: () => import('@pages/auth/auth.routes').then(m => m.AUTH_ROUTES),
  },
  {
    path: RoutesUrlsEnum.DASHBOARD,
    component: DashboardLayout,
    children: [
      {
        path: '',
        redirectTo: RoutesUrlsEnum.HOME,
        pathMatch: 'full'
      },
      {
        path: RoutesUrlsEnum.HOME,
        loadComponent: () => import('@pages/home/home').then(m => m.Home),
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
