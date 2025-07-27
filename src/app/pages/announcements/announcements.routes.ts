import {Routes} from '@angular/router';
import {RoutesUrlsEnum} from '@common/enums';

/**
 * Defines the routes for the announcements feature in the application.
 * @author dgutierrez
 */
export const ANNOUNCEMENTS_ROUTES: Routes = [
  {
    path: '',
    redirectTo: RoutesUrlsEnum.ANNOUNCEMENTS_LIST,
    pathMatch: 'full'
  },
  {
    path: RoutesUrlsEnum.ANNOUNCEMENTS_LIST,
    loadComponent: () => import('@pages/announcements/announcement-list/announcement-list.page').then(m => m.AnnouncementListPage)
  },
  {
    path: RoutesUrlsEnum.ANNOUNCEMENTS_CREATE,
    loadComponent: () => import('@pages/announcements/announcement-create/announcement-create.page').then(m => m.AnnouncementCreatePage)
  },
  {
    path: RoutesUrlsEnum.ANNOUNCEMENTS_EDIT,
    loadComponent: () => import('@pages/announcements/announcement-edit/announcement-edit.page').then(m => m.AnnouncementEditPage)
  }
]
