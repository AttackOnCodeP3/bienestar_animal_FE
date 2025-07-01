import {Routes} from '@angular/router';
import {RoutesUrlsEnum} from '@common/enums/routes-urls.enum';


/**
 * Defines the route configuration for the Reports module.
 *
 * - Redirects the base reports path to the default report (REPORT_1).
 * - Lazily loads the Report1 component when navigating to the REPORT_1 route.
 *
 * @type {Routes}
 *
 * @author dgutierrez
 */
export const REPORTS_ROUTES: Routes = [
  {
    path: RoutesUrlsEnum.VOID_ROUTE,
    redirectTo: RoutesUrlsEnum.REPORT_1,
    pathMatch: 'full'
  },
  {
    path: RoutesUrlsEnum.REPORT_1,
    loadComponent: () => import('@pages/reports/report-1/report-1.page').then(m => m.Report1Page),
  }
] as const;
