import {Routes} from '@angular/router';
import {RolesEnum, RouteParamPathsEnum, RoutesUrlsEnum} from '@common/enums';
import {roleGuard} from '@core/guards';

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
    canActivate: [roleGuard([RolesEnum.MUNICIPAL_ADMIN])],
    loadComponent: () => import('@pages/announcements/announcement-list/announcement-list.page').then(m => m.AnnouncementListPage)
  },
  {
    path: RoutesUrlsEnum.ANNOUNCEMENTS_CREATE,
    canActivate: [roleGuard([RolesEnum.MUNICIPAL_ADMIN])],
    loadComponent: () => import('@pages/announcements/announcement-create/announcement-create.page').then(m => m.AnnouncementCreatePage)
  },
  {
    path: RoutesUrlsEnum.ANNOUNCEMENTS_EDIT + RouteParamPathsEnum.ANNOUNCEMENT_ID,
    canActivate: [roleGuard([RolesEnum.MUNICIPAL_ADMIN])],
    loadComponent: () => import('@pages/announcements/announcement-edit/announcement-edit.page').then(m => m.AnnouncementEditPage)
  },
  {
    path: RoutesUrlsEnum.ANNOUNCEMENT_DETAIL + RouteParamPathsEnum.ANNOUNCEMENT_ID,
    canActivate: [roleGuard([RolesEnum.MUNICIPAL_ADMIN, RolesEnum.COMMUNITY_USER])],
    loadComponent: () => import('@pages/announcements/announcement-detail/announcement-detail.page').then(m => m.AnnouncementDetailPage)
  }
]
