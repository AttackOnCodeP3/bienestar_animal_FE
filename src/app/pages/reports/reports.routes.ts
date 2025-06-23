import {Routes} from '@angular/router';


export const REPORTS_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'report-1',
    pathMatch: 'full'
  },
  {
    path: 'report-1',
    loadComponent: () => import('@pages/reports/report-1/report-1').then(m => m.Report1),
  }
] as const;
