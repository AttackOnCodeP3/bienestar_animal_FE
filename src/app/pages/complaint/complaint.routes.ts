import {Routes} from '@angular/router';
import {RouteParamPathsEnum, RoutesUrlsEnum} from '@common/enums';

/**
 * Routes configuration for the complaints module.
 * It defines the paths and components for the complaints list and create pages.
 * @author dgutierrez
 */
export const COMPLAINTS_ROUTES: Routes = [
  {
    path: '',
    redirectTo: RoutesUrlsEnum.COMPLAINTS_LIST,
    pathMatch: 'full',
  },
  {
    path: RoutesUrlsEnum.COMPLAINTS_LIST,
    loadComponent: () => import('./complaint-list/complaint-list.page').then(m => m.ComplaintListPage),
  },
  {
    path: RoutesUrlsEnum.COMPLAINTS_CREATE,
    loadComponent: () => import('./complaint-create/complaint-create.page').then(m => m.ComplaintCreatePage),
  },
  {
    path: RoutesUrlsEnum.COMPLAINT_MANAGE + RouteParamPathsEnum.COMPLAINT_ID,
    loadComponent: () => import('./complaint-manage/complaint-manage.page').then(m => m.ComplaintManagePage),
  }
]
