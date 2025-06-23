import {Routes} from '@angular/router';
import {RoutesUrlsEnum} from '@common/enums/routes-urls.enum';


export const REPORTS_ROUTES: Routes = [
  {
    path: RoutesUrlsEnum.VOID_ROUTE,
    redirectTo: RoutesUrlsEnum.REPORT_1,
    pathMatch: 'full'
  },
  {
    path: RoutesUrlsEnum.REPORT_1,
    loadComponent: () => import('@pages/reports/report-1/report-1').then(m => m.Report1),
  }
] as const;
