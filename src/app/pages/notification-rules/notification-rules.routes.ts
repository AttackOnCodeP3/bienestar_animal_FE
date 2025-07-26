import {  Routes  } from '@angular/router';
import {RoutesUrlsEnum} from '@common/enums';

export const NOTIFICATION_RULES_ROUTES: Routes = [
  {
    path: '',
    redirectTo: RoutesUrlsEnum.NOTIFICATION_RULES_EDIT,
    pathMatch: 'full'
  },
  {
    path: RoutesUrlsEnum.NOTIFICATION_RULES_EDIT,
    loadComponent: () => import('@pages/notification-rules/notification-rules-edit/notification-rules-edit.page').then(m => m.NotificationRulesEditPage)
  },
  {
    path: RoutesUrlsEnum.NOTIFICATION_RULES_LIST,
    loadComponent: () => import('@pages/notification-rules/notification-rules-list/notification-rules-list.page').then(m => m.NotificationRulesListPage)
  }
];
