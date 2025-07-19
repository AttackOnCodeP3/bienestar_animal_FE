import {Routes} from '@angular/router';
import {RouteParamPathsEnum, RoutesUrlsEnum} from '@common/enums';

export const SECURITY_ROUTES: Routes = [
  {
    path: '',
    redirectTo: RoutesUrlsEnum.SECURITY_USER_MANAGEMENT,
    pathMatch: 'full',
  },
  {
    path: RoutesUrlsEnum.SECURITY_USER_MANAGEMENT,
    loadComponent: () => import('@pages/security/user-management/user-management.page').then(m => m.UserManagementPage),
  },
  {
    path: RoutesUrlsEnum.SECURITY_CREATE_USER,
    loadComponent: () => import('@pages/security/create-user/create-user.page').then(m => m.CreateUserPage),
  },
  {
    path: RoutesUrlsEnum.SECURITY_EDIT_USER + RouteParamPathsEnum.USER_ID,
    loadComponent: () => import('@pages/security/edit-user/edit-user.page').then(m => m.EditUserPage),
  }
]
