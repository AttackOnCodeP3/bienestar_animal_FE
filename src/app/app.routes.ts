import { Routes } from '@angular/router';
import {DashboardLayout} from '@components/dashboard-layout/dashboard-layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('@pages/auth/auth.routes').then(m => m.AUTH_ROUTES),
  },
  {
    path: '',
    component: DashboardLayout,
    children: [
      {
        path: 'gamification',
        loadChildren: () => import('@pages/gamification/gamification.routes').then(m => m.GEMIFICATION_ROUTES),
      },
      {
        path: 'reports',
        loadChildren: () => import('@pages/reports/reports.routes').then(m => m.REPORTS_ROUTES),
      }
    ]
  }
];
