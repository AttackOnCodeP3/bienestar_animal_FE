import {Routes} from '@angular/router';
import {RoutesUrlsEnum} from '@common/enums/routes-urls.enum';
import { AbandonadosReportComponent } from '@pages/abandonados-report/report.component/report.component';


/**
 * Defines the route configuration for the Reports module.
 *
 * - Redirects the base reports path to the default report (REPORT_1).
 * - Lazily loads the Report1 component when navigating to the REPORT_1 route.
 *
 * @type {Routes}
 *
 * @author dgutierrez
 * modify by @author nav
 */
export const REPORTS_ROUTES: Routes = [
  {
    path: RoutesUrlsEnum.VOID_ROUTE,
    redirectTo: RoutesUrlsEnum.REPORT_1,
    pathMatch: 'full'
  },
  {
    path: RoutesUrlsEnum.REPORT_1,
    loadComponent: () => import('@pages/abandonados-report/report.component/report.component').then(m => m.AbandonadosReportComponent),
  }
] as const;
